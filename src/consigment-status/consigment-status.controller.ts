import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ConsigmentStatusService } from './consigment-status.service';
import { CreateConsigmentStatusDto } from './dto/create-consigment-status.dto';
import { IResponse } from 'src/common/config';
import { ConsigmentStatus } from './entities/consigment-status.entity';

@Controller('consigment-status')
export class ConsigmentStatusController {
  constructor(private readonly consigmentStatusService: ConsigmentStatusService) { }

  @Post()
  async create(@Body("data") createConsigmentStatusDto: CreateConsigmentStatusDto): Promise<IResponse<ConsigmentStatus>> {
    const res: IResponse<ConsigmentStatus> = await this.consigmentStatusService.create(createConsigmentStatusDto);
    return res;
  }

  @Get()
  async findAll(@Query("consigmentId") consigmentId?: string): Promise<IResponse<ConsigmentStatus[]>> {
    const res: IResponse<ConsigmentStatus[]> = await this.consigmentStatusService.findAll(consigmentId);
    return res;
  }

}
