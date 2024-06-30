import { Module } from '@nestjs/common';
import { ConsignmentStatusService } from './consignment-status.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsignmentStatus } from './entities/consignment-status.entity';
import { Consignment } from 'src/consignment/entities/consignment.entity';
import { ConsignmentStatusController } from './consignment-status.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Consignment, ConsignmentStatus])],
  controllers: [ConsignmentStatusController],
  providers: [ConsignmentStatusService],
})
export class ConsignmentStatusModule { }
