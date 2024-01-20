import { Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ERROR_MESSAGES } from 'src/common/response';
import { IResponse } from 'src/common/config';

@Catch()
export default class AllExceptionsFilter extends BaseExceptionFilter {
    private readonly logger = new Logger("Exception", { timestamp: true, })
    catch(exception: unknown, host: ArgumentsHost) {
        this.logger.error(JSON.stringify(exception));

        const isHttpException = exception instanceof HttpException;
        const status = isHttpException ? exception?.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        let messages = [];
        if (isHttpException) {
            const exceptionResponse = exception.getResponse() as { message: string[] | string };
            const exceptionMessage = exceptionResponse?.message;
            if (Array.isArray(exceptionMessage) && exceptionMessage.length) {
                messages = exceptionMessage
            } else if (exceptionMessage && typeof exceptionMessage === "string") {
                messages.push(exceptionMessage)
            }
        }

        if (!messages.length) {
            messages.push(ERROR_MESSAGES.AN_UNKNOWN_ERROR_OCCURED)
        }

        const ctx = host.switchToHttp();
        const { httpAdapter } = this.httpAdapterHost;
        const response: IResponse<null> = { status, messages, success: false, data: null }
        httpAdapter.reply(ctx.getResponse(), response, status);
    }
}