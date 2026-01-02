import { Module, DynamicModule } from '@nestjs/common';
import { GreetingService } from '../services/greetings.service';

@Module({})
export class GreetingModule {
  static register(options: { language: string }): DynamicModule {
    return {
      module: GreetingModule,
      providers: [
        {
          provide: 'GREETING_OPTIONS',
          useValue: options,
        },
        GreetingService,
      ],
      exports: [GreetingService],
    };
  }
}
