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
    let message = exception.message || 'Internal server error';
    
    if (exception instanceof HttpException) {
      const responseObj = exception.getResponse();
      if (responseObj && typeof responseObj === 'object' && (responseObj as any).message) {
        const responseMessage = (responseObj as any).message;
        message = Array.isArray(responseMessage) ? responseMessage.join(', ') : responseMessage;
      }
    }
    
    const erro = exception instanceof HttpException ? exception.cause : String(exception);

    return sendHttpResponse(res, status, message, null, req.path, erro, null);
  }
}
