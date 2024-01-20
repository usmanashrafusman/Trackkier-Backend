import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConsigmentModule } from './consigment/consigment.module';
import { ConsigmentStatusModule } from './consigment-status/consigment-status.module';

import { AllExceptionsFilter } from 'src/common/exceptions';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, ConsigmentModule, ConsigmentStatusModule],
  controllers: [AppController],
  providers: [{
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  }, AppService],
})
export class AppModule { }
