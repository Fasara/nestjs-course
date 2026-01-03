import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => ({ data })));
  }
}

/**
 * Interceptors allow us to bind extra logic before / after method execution.
 * They can transform the result returned from a function or the exception.
 * Extend basic behavior or override it entirely.
 *
 * Common use cases for interceptors include:
 * - Logging: Interceptors can log information about incoming requests and
 *   outgoing responses.
 * - Caching: Interceptors can cache responses to improve performance.
 * - Transformation: Interceptors can modify the response data before sending
 *   it to the client.
 * - Error handling: Interceptors can catch and handle errors that occur during
 *   method execution.
 */
