import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from 'src/controllers/coffees.controller';
import { Coffee } from 'src/entities/coffee.entity';
import { Flavor } from 'src/entities/flavor.entity';
import { Event } from 'src/entities/event.entity';
import { CoffeesService } from 'src/services/coffees.service';
import { COFFEE_BRANDS } from 'src/common/constants';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    /**
     * Providing coffee brands using a constant value injection token
     */
    // {
    //   provide: COFFEE_BRANDS,
    //   useValue: ['buddy brew', 'nescafe', 'starbucks'],
    // },
    /**
     * useFactory example (commented out)
     * Allows us to provide dynamic values or perform complex logic
     * before supplying the value to the dependency injection system.
     * The value return form the factory function is what will be used by the provider.
     * In this case, it returns an array of coffee brand names.
     */
    {
      provide: COFFEE_BRANDS,
      useFactory: () => {
        return ['buddy brew', 'nescafe', 'starbucks'];
      },
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
