import { Module } from '@nestjs/common';
import { ConsigmentStatusService } from './consigment-status.service';
import { ConsigmentStatusController } from './consigment-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsigmentStatus } from './entities/consigment-status.entity';
import { Consigment } from 'src/consigment/entities/consigment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Consigment,ConsigmentStatus])],
  controllers: [ConsigmentStatusController],
  providers: [ConsigmentStatusService],
})
export class ConsigmentStatusModule { }
