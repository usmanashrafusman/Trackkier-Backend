
import { IsString, IsNotEmpty, IsEnum, ValidateIf } from 'class-validator';
import { ConsigmentStatuses } from 'src/database/types';

export class CreateConsigmentStatusDto {
    @IsNotEmpty()
    @IsString()
    consigmentId: string

    @IsNotEmpty()
    @IsEnum(ConsigmentStatuses)
    status: ConsigmentStatuses

    @ValidateIf((obj) => obj.status === ConsigmentStatuses.OTHER)
    @IsNotEmpty()
    @IsString()
    message?: string
}
