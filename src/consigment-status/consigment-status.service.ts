import { Injectable } from '@nestjs/common';
import { CreateConsigmentStatusDto } from './dto/create-consigment-status.dto';
import { UpdateConsigmentStatusDto } from './dto/update-consigment-status.dto';
import { ConsigmentStatus } from './entities/consigment-status.entity';
import { EntityManager, Repository } from 'typeorm';
import { SuccessfulResponse } from 'src/common/http-response';
import { InjectRepository } from '@nestjs/typeorm';
import { Consigment } from 'src/consigment/entities/consigment.entity';

@Injectable()
export class ConsigmentStatusService {
  constructor(@InjectRepository(ConsigmentStatus) private readonly consigmentStatusRepository: Repository<ConsigmentStatus>, private readonly entityManager: EntityManager) { }

  async create({ consigmentId, ...consigmentStatus }: CreateConsigmentStatusDto) {
    const consigment = this.entityManager.create(Consigment, { id: consigmentId });
    const status = new ConsigmentStatus({ ...consigmentStatus, consigment });
    const entity = await this.entityManager.save(status);
    return new SuccessfulResponse({ entity })
  }

  async findAll(consigmentId?: string) {
    const entities = await this.consigmentStatusRepository.find({
      where: {
        consigment: {
          id: consigmentId
        }
      },
      relations: {
        consigment: true
      },
      order: {
        createdAt: "DESC"
      }
    });
    return new SuccessfulResponse({ entities })
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
