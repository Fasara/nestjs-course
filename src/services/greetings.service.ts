import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class GreetingService {
  constructor(@Inject('GREETING_OPTIONS') private options: any) {}

  greet() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return this.options.language === 'fr' ? 'Bonjour!' : 'Hello!';
  }
}
