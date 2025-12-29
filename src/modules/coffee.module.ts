import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from 'src/entities/coffee.entity';
import { Flavor } from 'src/entities/flavor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor])],
  controllers: [],
  providers: [],
})
export class CoffeesModule {}
