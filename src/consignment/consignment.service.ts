import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DeleteResponse, PaginationResponse, SuccessfulResponse } from 'src/common/http-response';
import { NotFoundException } from 'src/common/exceptions';

import { CreateConsignmentDto } from './dto/create-consignment.dto';

import { Address } from './entities/address.entity';
import { Consignment } from './entities/consignment.entity';
import { ConsignmentStatus } from 'src/consignment-status/entities/consignment-status.entity';

@Injectable()
export class ConsignmentService {
  constructor(
    @InjectRepository(Consignment)
    private readonly consignmentRepository: Repository<Consignment>,
    @InjectRepository(ConsignmentStatus)
    private readonly consignmentStatusRepository: Repository<ConsignmentStatus>,
  ) { }

  async create({ weight, ...consignmentDto }: CreateConsignmentDto) {
    const consignee = new Address(consignmentDto.consignee);
    const consignor = new Address(consignmentDto.consignor);
    const consignment = new Consignment({
      consignee,
      consignor,
      weight,
    });
    const status = new ConsignmentStatus({
      consignment,
    });
    const entity = (await this.consignmentStatusRepository.save(status)).consignment;
    return SuccessfulResponse.send<Consignment>({ entity });
  }

  async findAll() {
    const result = await this.consignmentRepository.find();
    const total = await this.consignmentRepository.count();
    return SuccessfulResponse.send<PaginationResponse<Consignment>>({ entities: { result, total } });
  }

  async findOne(id: string) {
    const entity = await this.consignmentRepository.findOne({
      where: { id },
    });
    if (!entity) {
      throw new NotFoundException();
    }
    return SuccessfulResponse.send<Consignment>({ entity });
  }

  async remove(id: string) {
    const isExist = await this.consignmentRepository.exists({
      where: { id },
    });
    if (!isExist) {
      throw new NotFoundException();
    }
    const entity = await this.consignmentRepository.softDelete(id);
    const isDeleted = entity.affected === 1;
    const msg = `Consignment with ${id} is deleted`
    return SuccessfulResponse.send<DeleteResponse>({ entity: { isDeleted } }, msg);
  }
}
