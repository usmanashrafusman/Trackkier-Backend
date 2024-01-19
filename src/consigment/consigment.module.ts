import { Module } from '@nestjs/common';
import { ConsigmentService } from './consigment.service';
import { ConsigmentController } from './consigment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Consigment } from './entities/consigment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address , Consigment])],
  controllers: [ConsigmentController],
  providers: [ConsigmentService],
})
export class ConsigmentModule { }
