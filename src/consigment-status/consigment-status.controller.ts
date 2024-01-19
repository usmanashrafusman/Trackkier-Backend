import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsigmentStatusService } from './consigment-status.service';
import { CreateConsigmentStatusDto } from './dto/create-consigment-status.dto';
import { UpdateConsigmentStatusDto } from './dto/update-consigment-status.dto';

@Controller('consigment-status')
export class ConsigmentStatusController {
  constructor(private readonly consigmentStatusService: ConsigmentStatusService) {}

  @Post()
  create(@Body() createConsigmentStatusDto: CreateConsigmentStatusDto) {
    return this.consigmentStatusService.create(createConsigmentStatusDto);
  }

  @Get()
  findAll() {
    return this.consigmentStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consigmentStatusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConsigmentStatusDto: UpdateConsigmentStatusDto) {
    return this.consigmentStatusService.update(+id, updateConsigmentStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consigmentStatusService.remove(+id);
  }
}
