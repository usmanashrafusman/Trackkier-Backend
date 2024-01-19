import { PartialType } from '@nestjs/mapped-types';
import { CreateConsigmentStatusDto } from './create-consigment-status.dto';

export class UpdateConsigmentStatusDto extends PartialType(CreateConsigmentStatusDto) {}
