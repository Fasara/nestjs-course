/* CreateCoffeeDto */
export class CreateCoffeeDto {
  readonly name: string;
  readonly brand: string;
  readonly flavors: string[];
}

/* UpdateCoffeeDto */
export class UpdateCoffeeDto {
  readonly name?: string;
  readonly brand?: string;
  readonly flavors?: string[];
}
