import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  ExceptionFilter,
  Logger,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

export const getErrorMessage = <T>(exception: T): string => {
  return exception instanceof HttpException
    ? exception.message
    : String(exception);
};

@Catch()
export class AllExceptionsFilter<T> implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logger: Logger,
  ) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let message = exception['response']?.message
      ? exception['response']['message']
      : getErrorMessage<T>(exception);
    message = typeof message == 'string' ? [message] : message;
    const responseBody = {
      status: httpStatus,
      success: false,
      error: message,
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      timestamp: new Date().toISOString(),
    };
    this.logger.error(responseBody.path, message);
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
