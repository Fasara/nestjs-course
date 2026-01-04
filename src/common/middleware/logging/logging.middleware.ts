import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('Request-response time:');
    console.time('Request-response time');

    res.on('finish', () => console.timeEnd('Request-response time'));
    // Always call the next function otherwise the call will be left hanging and the request will not reach the route handler
    next();
  }
}

/**
 * Middleware is a function that is called before the request reaches the route handler, and any other building blocks are processed like guards, interceptors, etc.
 * It has access to the request and response objects, and the next function in the request-response cycle.
 * It is not specifically tied to any method but rather to the route itself.
 * Middleware is typically used for tasks such as logging, authentication, request modification, etc.
 * In NestJS, middleware is implemented as a class or a function.
 * Function middleware is stateless, it cannot inject dependencies, and does not have access to the NestJS container.
 * Class middleware can inject dependencies and has access to the NestJS container.
 */
