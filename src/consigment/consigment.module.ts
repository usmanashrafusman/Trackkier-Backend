import { Module } from '@nestjs/common';
import { ConsigmentService } from './consigment.service';
import { ConsigmentController } from './consigment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Consigment } from './entities/consigment.entity';
import { ConsigmentStatus } from 'src/consigment-status/entities/consigment-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address , Consigment, ConsigmentStatus])],
  controllers: [ConsigmentController],
  providers: [ConsigmentService],
})
export class ConsigmentModule { }
