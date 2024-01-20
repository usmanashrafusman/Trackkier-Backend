import { Injectable } from '@nestjs/common';
import { CreateConsigmentDto } from './dto/create-consigment.dto';
import { UpdateConsigmentDto } from './dto/update-consigment.dto';
import { Address } from './entities/address.entity';
import { EntityManager, Repository } from 'typeorm';
import { Consigment } from './entities/consigment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import SuccessfulResponse from 'src/common/http-response/SuccessfulResponse';
import NotFoundException from 'src/common/exceptions/NotFoundException';

@Injectable()
export class ConsigmentService {
  constructor(@InjectRepository(Consigment) private readonly consigmentRepository: Repository<Consigment>, private readonly entityManager: EntityManager) { }

  async create({ weight, ...consigmentDto }: CreateConsigmentDto) {
    const consignee = new Address(consigmentDto.consignee);
    const consignor = new Address(consigmentDto.consignor);
    const consigment = new Consigment({
      consignee,
      consignor,
      weight
    });
    const entity = await this.entityManager.save(consigment)
    return new SuccessfulResponse<Consigment>({ entity })
  };

  async findAll() {
    const entities = await this.consigmentRepository.find();
    return new SuccessfulResponse<Consigment[]>({ entities })
  };

  async findOne(id: string) {
    const entity = await this.consigmentRepository.findOne({
      where: { id }
    });
    if (!entity) {
      throw new NotFoundException()
    }
    return new SuccessfulResponse<Consigment>({ entity })
  };

  update(id: string, updateConsigmentDto: UpdateConsigmentDto) {
    return `This action updates a #${id} consigment`;
  }

  remove(id: string) {
    return `This action removes a #${id} consigment`;
  }
}
