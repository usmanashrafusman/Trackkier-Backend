import { Injectable } from '@nestjs/common';
import { CreateConsigmentStatusDto } from './dto/create-consigment-status.dto';
import { UpdateConsigmentStatusDto } from './dto/update-consigment-status.dto';

@Injectable()
export class ConsigmentStatusService {
  create(createConsigmentStatusDto: CreateConsigmentStatusDto) {
    return 'This action adds a new consigmentStatus';
  }

  findAll() {
    return `This action returns all consigmentStatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consigmentStatus`;
  }

  update(id: number, updateConsigmentStatusDto: UpdateConsigmentStatusDto) {
    return `This action updates a #${id} consigmentStatus`;
  }

  remove(id: number) {
    return `This action removes a #${id} consigmentStatus`;
  }
}
