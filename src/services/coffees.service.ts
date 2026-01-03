/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coffee } from 'src/entities/coffee.entity';
import { Flavor } from 'src/entities/flavor.entity';
import { Event } from 'src/entities/event.entity';
import { CreateCoffeeDto, UpdateCoffeeDto } from 'src/dtos/create-coffee.dto';
import { PaginationQuery } from 'src/dtos/pagination-query-dto';
import { DataSource } from 'typeorm';
import { COFFEE_BRANDS } from 'src/common/constants';
import * as config from '@nestjs/config';
import coffeesConfig from 'src/config/coffees.config';
import { ConfigType } from '@nestjs/config';

/**
 * Setting the scope to REQUEST means that a new instance of CoffeesService
 * will be created for each incoming request. This is useful when you want to
 * maintain state or context specific to a single request, such as user-specific
 * data or request-specific configurations.
 * It can inject the Request object to access request-specific information.
 * However, be cautious when using REQUEST scope, as it can lead to increased
 * memory consumption and potential performance issues due to the creation of
 * multiple instances. Use it only when necessary.
 */
@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly dataSource: DataSource,
    private readonly configService: config.ConfigService,
    @Inject(COFFEE_BRANDS) coffeeBrands: string[],

    /**
     * Injecting configuration using the configuration namespace
     * defined in coffees.config.ts
     * Each namespace configuration exposes a KEY property that can be used
     * to inject the configuration object anywhere in the application.
     *
     * ConfigType is a utility type provided by NestJS to infer
     * the type of the configuration object based on the configuration
     * factory function.
     */
    @Inject(coffeesConfig.KEY)
    coffeesConfiguration: config.ConfigType<typeof coffeesConfig>,
  ) {}

  findAll(paginationQuery: PaginationQuery) {
    const { limit, offset } = paginationQuery;
    return this.coffeeRepository.find({
      relations: {
        flavors: true,
      },
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne({
      where: {
        id: +id,
      },
      relations: {
        flavors: true,
      },
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee with ID ${id} not found`);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors =
      updateCoffeeDto.flavors &&
      updateCoffeeDto.flavors.map((name) => ({ name }));

    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      coffee.recommendations++;

      const recommendEvent = new Event();
      recommendEvent.name = 'recommend_coffee';
      recommendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }
}
