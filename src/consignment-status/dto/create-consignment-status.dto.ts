import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, ValidateIf } from 'class-validator';
import { ConsignmentStatuses } from 'src/database/types';

export class CreateConsignmentStatusDto {
    @ApiProperty({ example: '46ae68e6-35fa-4502-9ab9-ef7d1651c6f7' })
    @IsNotEmpty()
    @IsString()
    consignmentId: string

    @IsNotEmpty()
    @ApiProperty({ enum: ConsignmentStatuses })
    @IsEnum(ConsignmentStatuses)
    status: ConsignmentStatuses

    @ApiProperty({ example: 'Other' })
    @ValidateIf((obj) => obj.status === ConsignmentStatuses.OTHER)
    @IsNotEmpty()
    @IsString()
    message?: string
}
