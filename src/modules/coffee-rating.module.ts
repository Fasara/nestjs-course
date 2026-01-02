import { Module } from '@nestjs/common';
import { CoffeeRatingService } from '../services/coffee-rating.service';
import { CoffeesModule } from './coffee.module';

@Module({
  imports: [CoffeesModule],
  controllers: [],
  providers: [CoffeeRatingService],
  exports: [CoffeeRatingService],
})
export class CoffeeRatingModule {}
