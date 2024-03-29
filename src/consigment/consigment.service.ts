import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DeleteResponse, SuccessfulResponse } from 'src/common/http-response';
import { NotFoundException } from 'src/common/exceptions';

import { CreateConsigmentDto } from './dto/create-consigment.dto';

import { Address } from './entities/address.entity';
import { Consigment } from './entities/consigment.entity';
import { ConsigmentStatus } from 'src/consigment-status/entities/consigment-status.entity';

@Injectable()
export class ConsigmentService {
  constructor(
    @InjectRepository(Consigment)
    private readonly consigmentRepository: Repository<Consigment>,
    @InjectRepository(ConsigmentStatus)
    private readonly consigmentStatusRepository: Repository<ConsigmentStatus>,
  ) {}

  async create({ weight, ...consigmentDto }: CreateConsigmentDto) {
    const consignee = new Address(consigmentDto.consignee);
    const consignor = new Address(consigmentDto.consignor);
    const consigment = new Consigment({
      consignee,
      consignor,
      weight,
    });
    console.log(consigment , "WEIGHT")
    const status = new ConsigmentStatus({
      consigment,
    });
    const entity = (await this.consigmentStatusRepository.save(status)).consigment;
    return SuccessfulResponse.send<Consigment>({ entity });
  }

  async findAll() {
    const entities = await this.consigmentRepository.find();
    return SuccessfulResponse.send<Consigment[]>({ entities });
  }

  async findOne(id: string) {
    const entity = await this.consigmentRepository.findOne({
      where: { id },
    });
    if (!entity) {
      throw new NotFoundException();
    }
    return SuccessfulResponse.send<Consigment>({ entity });
  }

  async remove(id: string) {
    const isExist = await this.consigmentRepository.exists({
      where: { id },
    });
    if (!isExist) {
      throw new NotFoundException();
    }

    const entity = await this.consigmentRepository.softDelete(id);
    const isDeleted = entity.affected === 1;
    return SuccessfulResponse.send<DeleteResponse>({ entity :{isDeleted}});
  }
}
