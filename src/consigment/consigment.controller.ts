import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsigmentService } from './consigment.service';
import { CreateConsigmentDto } from './dto/create-consigment.dto';
import { UpdateConsigmentDto } from './dto/update-consigment.dto';
import { Consigment } from './entities/consigment.entity';
import { IResponse } from 'src/common/config';

@Controller('consigment')
export class ConsigmentController {
  constructor(private readonly consigmentService: ConsigmentService) { }

  @Post()
  async create(@Body("data") createConsigmentDto: CreateConsigmentDto): Promise<IResponse<Consigment>> {
    const res = await this.consigmentService.create(createConsigmentDto);
    return res
  }

  @Get()
  async findAll(): Promise<IResponse<Consigment[]>> {
    const res = await this.consigmentService.findAll()
    return res
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponse<Consigment>> {
    const res = await this.consigmentService.findOne(id)
    return res
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsigmentDto: UpdateConsigmentDto) {
    return this.consigmentService.update(id, updateConsigmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consigmentService.remove(id);
  }
}
