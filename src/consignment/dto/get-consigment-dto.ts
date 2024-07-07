import { IsOptional, IsEnum } from 'class-validator';
import { ConsignmentStatuses } from 'src/database/types';

import { ApiProperty } from '@nestjs/swagger';

export class GetConsignmentDto {
    @ApiProperty({ enum: ConsignmentStatuses })
    @IsOptional()
    @IsEnum(ConsignmentStatuses)
    status: string
}