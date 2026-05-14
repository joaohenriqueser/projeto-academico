import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { sendHttpResponse } from '../../mensagem/send.response';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    const status = exception instanceof HttpException ? exception.getStatus() : 500;
    const message = exception.message || 'Internal server error';
    const erro = exception instanceof HttpException ? exception.cause : String(exception);

    return sendHttpResponse(res, status, message, null, req.path, erro, null);
  }
}
