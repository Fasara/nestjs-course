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
    {
      provide: COFFEE_BRANDS,
      useValue: ['buddy brew', 'nescafe', 'starbucks'],
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
