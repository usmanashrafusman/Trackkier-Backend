import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CreateConsignmentStatusDto } from './dto/create-consignment-status.dto';
import { IResponse } from 'src/common/config';
import { ConsignmentStatus } from './entities/consignment-status.entity';
import { ConsignmentStatusService } from './consignment-status.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("Consignment Status")
@Controller('consignment-status')
export class ConsignmentStatusController {
  constructor(private readonly consignmentStatusService: ConsignmentStatusService) { }

  @Post()
  async create(@Body() createConsignmentStatusDto: CreateConsignmentStatusDto): Promise<IResponse<ConsignmentStatus>> {
    const res: IResponse<ConsignmentStatus> = await this.consignmentStatusService.create(createConsignmentStatusDto);
    return res;
  }

  @Get()
  async findAll(@Query("consignmentId") consignmentId?: string): Promise<IResponse<ConsignmentStatus[]>> {
    const res: IResponse<ConsignmentStatus[]> = await this.consignmentStatusService.findAll(consignmentId);
    return res;
  }

}
