import { Injectable } from '@nestjs/common';
import { RESPONSE_MESSAGES } from './common/response';

@Injectable()
export class AppService {
  getHello(): string {
    return RESPONSE_MESSAGES.WELCOME;
  }
}
