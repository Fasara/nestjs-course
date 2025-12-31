import { PartialType } from '@nestjs/mapped-types';

/* CreateCoffeeDto */
export class CreateCoffeeDto {
  readonly name: string;

  readonly brand: string;

  readonly flavors: string[];
}

/* UpdateCoffeeDto */
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
