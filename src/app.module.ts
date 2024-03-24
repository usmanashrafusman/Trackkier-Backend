import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';

import { AppService } from 'src/app.service';
import { AppController } from 'src/app.controller';

import { DatabaseModule } from 'src/database/database.module';
import { ConsigmentModule } from 'src/consigment/consigment.module';
import { ConsigmentStatusModule } from 'src/consigment-status/consigment-status.module';

import { AllExceptionsFilter } from 'src/common/exceptions';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
    DatabaseModule,
    ConsigmentModule,
    ConsigmentStatusModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    AppService,
  ],
})
export class AppModule {}
