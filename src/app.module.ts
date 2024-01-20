import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConsigmentModule } from './consigment/consigment.module';
import { ConsigmentStatusModule } from './consigment-status/consigment-status.module';

import { AllExceptionsFilter } from 'src/common/exceptions';
import { TransactionInterceptor } from 'src/common/interceptors/TransactionInterceptor';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, ConsigmentModule, ConsigmentStatusModule],
  controllers: [AppController],
  providers: [{
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  }, {
    provide: APP_INTERCEPTOR,
    useClass: TransactionInterceptor,
  }, AppService],

})
export class AppModule { }
