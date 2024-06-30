import { Module } from '@nestjs/common';
import { ConsignmentService } from './consignment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsignmentController } from './consignment.controller';
import { Address } from './entities/address.entity';
import { Consignment } from './entities/consignment.entity';
import { ConsignmentStatus } from 'src/consignment-status/entities/consignment-status.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Address, Consignment, ConsignmentStatus])],
  controllers: [ConsignmentController],
  providers: [ConsignmentService],
})
export class ConsignmentModule { }
