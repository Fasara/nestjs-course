import { registerAs } from '@nestjs/config';

/**
 * Register a configuration namespace for coffees
 */
export default registerAs('coffees', () => ({
  defaultCoffeeFlavor: 'vanilla',
}));
