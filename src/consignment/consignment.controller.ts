import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { ConsignmentService } from './consignment.service';
import { CreateConsignmentDto } from './dto/create-consignment.dto';
import { Consignment } from './entities/consignment.entity';
import { IResponse } from 'src/common/config';
import { PaginationResponse } from 'src/common/http-response';
import { ApiTags } from '@nestjs/swagger';
import { GetConsignmentDto } from './dto/get-consigment-dto';

@Controller('consignment')
@ApiTags("Consignment")
export class ConsignmentController {
  constructor(private readonly consignmentService: ConsignmentService) { }

  @Post()
  async create(@Body() createConsignmentDto: CreateConsignmentDto): Promise<IResponse<Consignment>> {
    const res = await this.consignmentService.create(createConsignmentDto);
    return res
  }

  @Get()
  async findAll(@Query() dto: GetConsignmentDto): Promise<IResponse<PaginationResponse<Consignment>>> {
    const res = await this.consignmentService.findAll(dto)
    return res
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponse<Consignment>> {
    const res = await this.consignmentService.findOne(id)
    return res
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consignmentService.remove(id);
  }
}
