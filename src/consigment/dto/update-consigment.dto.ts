import { PartialType } from '@nestjs/mapped-types';
import { CreateConsigmentDto } from './create-consigment.dto';

export class UpdateConsigmentDto extends PartialType(CreateConsigmentDto) {}
