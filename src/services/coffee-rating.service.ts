import { Injectable } from '@nestjs/common';
import { CoffeesService } from './coffees.service';

@Injectable()
export class CoffeeRatingService {
  constructor(private readonly coffeesService: CoffeesService) {}
}
