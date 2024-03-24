import { Injectable } from '@nestjs/common';
import { CreateConsigmentStatusDto } from './dto/create-consigment-status.dto';
import { ConsigmentStatus } from './entities/consigment-status.entity';
import { Repository } from 'typeorm';
import { SuccessfulResponse } from 'src/common/http-response';
import { InjectRepository } from '@nestjs/typeorm';
import { Consigment } from 'src/consigment/entities/consigment.entity';

@Injectable()
export class ConsigmentStatusService {
  constructor(
    @InjectRepository(ConsigmentStatus)
    private readonly consigmentStatusRepository: Repository<ConsigmentStatus>,
    @InjectRepository(Consigment)
    private readonly consigmentRepository: Repository<Consigment>,
  ) {}

  async create({
    consigmentId,
    ...consigmentStatus
  }: CreateConsigmentStatusDto) {
    const consigment = this.consigmentRepository.create({
      id: consigmentId,
    });
    const status = new ConsigmentStatus({ ...consigmentStatus, consigment });
    const entity = await this.consigmentStatusRepository.save(status);
    return SuccessfulResponse.send<ConsigmentStatus>({ entity });
  }

  async findAll(consigmentId?: string) {
    const entities = await this.consigmentStatusRepository.find({
      where: {
        consigment: {
          id: consigmentId,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
    return SuccessfulResponse.send<ConsigmentStatus[]>({ entities });
  }
}
