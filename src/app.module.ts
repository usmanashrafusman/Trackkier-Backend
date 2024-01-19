import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ConsigmentModule } from './consigment/consigment.module';
import { ConsigmentStatusModule } from './consigment-status/consigment-status.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, ConsigmentModule, ConsigmentStatusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
