import { BadRequestException, Injectable } from '@nestjs/common';
import { ConsignmentStatus } from './entities/consignment-status.entity';
import { Repository } from 'typeorm';
import { SuccessfulResponse } from 'src/common/http-response';
import { InjectRepository } from '@nestjs/typeorm';
import { Consignment } from 'src/consignment/entities/consignment.entity';
import { CreateConsignmentStatusDto } from './dto/create-consignment-status.dto';
@Injectable()
export class ConsignmentStatusService {
  constructor(
    @InjectRepository(ConsignmentStatus)
    private readonly consignmentStatusRepository: Repository<ConsignmentStatus>,
    @InjectRepository(Consignment)
    private readonly consignmentRepository: Repository<Consignment>,
  ) { }

  async create({
    consignmentId,
    ...consignmentStatus
  }: CreateConsignmentStatusDto) {
    const consignment = this.consignmentRepository.create({
      id: consignmentId,
    });
    if (!consignment) throw new BadRequestException("Consignment not found");
    const entity = await this.consignmentStatusRepository.save({
      consignment: { id: consignment.id },
      status: consignmentStatus.status,
      message: consignmentStatus.message,
    });
    await this.consignmentRepository.update(consignment.id, { status: entity.status })
    return SuccessfulResponse.send<ConsignmentStatus>({ entity });
  }

  async findAll(consignmentId?: string) {
    const entities = await this.consignmentStatusRepository.find({
      where: {
        consignment: {
          id: consignmentId,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
    return SuccessfulResponse.send<ConsignmentStatus[]>({ entities });
  }
}
