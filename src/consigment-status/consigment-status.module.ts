import { Module } from '@nestjs/common';
import { ConsigmentStatusService } from './consigment-status.service';
import { ConsigmentStatusController } from './consigment-status.controller';

@Module({
  controllers: [ConsigmentStatusController],
  providers: [ConsigmentStatusService],
})
export class ConsigmentStatusModule {}
