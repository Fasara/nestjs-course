import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from 'src/controllers/coffees.controller';
import { Coffee } from 'src/entities/coffee.entity';
import { Flavor } from 'src/entities/flavor.entity';
import { CoffeesService } from 'src/services/coffeesService';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor])],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
