import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ConsigmentModule } from './consigment/consigment.module';
import { ConsigmentStatusModule } from './consigment-status/consigment-status.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/exceptions/AllExceptionsFilter';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, ConsigmentModule, ConsigmentStatusModule],
  controllers: [AppController],
  providers: [{
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  }, AppService],
})
export class AppModule { }
