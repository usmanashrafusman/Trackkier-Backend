import { Module } from '@nestjs/common';
import { ConsigmentStatusService } from './consigment-status.service';
import { ConsigmentStatusController } from './consigment-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsigmentStatus } from './entities/consigment-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConsigmentStatus])],
  controllers: [ConsigmentStatusController],
  providers: [ConsigmentStatusService],
})
export class ConsigmentStatusModule { }
