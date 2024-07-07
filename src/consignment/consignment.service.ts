import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { DeleteResponse, PaginationResponse, SuccessfulResponse } from 'src/common/http-response';
import { NotFoundException } from 'src/common/exceptions';

import { CreateConsignmentDto } from './dto/create-consignment.dto';

import { Address } from './entities/address.entity';
import { Consignment } from './entities/consignment.entity';
import { ConsignmentStatus } from 'src/consignment-status/entities/consignment-status.entity';
import { ConfigService } from '@nestjs/config';
import { ConsignmentStatuses } from 'src/database/types';
import { GetConsignmentDto } from './dto/get-consigment-dto';

@Injectable()
export class ConsignmentService {
  constructor(
    @InjectRepository(Consignment)
    private readonly consignmentRepository: Repository<Consignment>,
    @InjectRepository(ConsignmentStatus)
    private readonly consignmentStatusRepository: Repository<ConsignmentStatus>,
    private readonly configService: ConfigService
  ) { }

  async create({ weight, ...consignmentDto }: CreateConsignmentDto) {
    const consignee = new Address(consignmentDto.consignee);
    const consignor = new Address(consignmentDto.consignor);
    const perKgPrice = Number(this.configService.getOrThrow('PRICE_PER_KG'));
    if (!isNaN(perKgPrice) && perKgPrice > 1) {
      if (0 > weight) {
        throw new BadRequestException("Invalid Weight");
      }
      const price = perKgPrice * Math.floor(weight);
      const consignment = new Consignment({
        consignee,
        consignor,
        weight,
        price,
        COD: consignmentDto?.COD || null,
        status: ConsignmentStatuses.RECEIVED_FOR_DELIVERY
      });
      const entity = await this.consignmentRepository.save(consignment);
      await this.consignmentStatusRepository.save({ consignment: { id: entity.id } });
      return SuccessfulResponse.send<Consignment>({ entity: entity });
    } else {
      throw new BadRequestException("An Error occurred while creating");
    }
  }

  async findAll(query: GetConsignmentDto) {
    const where: FindOptionsWhere<Consignment> = {}
    if (query.status) {
      where.status = query.status;
    }
    const result = await this.consignmentRepository.find({ where });
    const total = await this.consignmentRepository.count({ where });
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
