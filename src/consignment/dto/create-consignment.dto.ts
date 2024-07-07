import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, ValidateNested, IsOptional, IsEnum, IsObject, IsEmail, IsNumber, Min } from 'class-validator';
import { City, ConsignmentDelivery, ConsignmentType } from 'src/database/types';
import { TransformToNumber } from 'src/common/decorators';
import { ApiProperty } from '@nestjs/swagger';

class Address {
    @ApiProperty({ example: 'John' })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({ example: 'New York' })
    @IsNotEmpty()
    @IsString()
    place: string

    @ApiProperty({ example: 'Greenwich Village' })
    @IsNotEmpty()
    @IsString()
    address: string

    @ApiProperty({ example: '123456789' })
    @IsNotEmpty()
    @IsString()
    phone: string

    @ApiProperty({ example: 'john@wick.com' })
    @IsOptional()
    @IsEmail()
    email: string

    @ApiProperty({ example: City.KARACHI })
    @IsOptional()
    @IsEnum(City)
    city: City
}

export class CreateConsignmentDto {
    @ApiProperty({ type: Address })
    @IsObject({ message: "Invalid consignor details" })
    @ValidateNested()
    @Type(() => Address)
    consignor: Address

    @ApiProperty({ type: Address })
    @IsObject({ message: "Invalid consignee details" })
    @ValidateNested()
    @Type(() => Address)
    consignee: Address

    @ApiProperty({ example: 1 })
    @IsNotEmpty()
    @TransformToNumber()
    @IsNumber({ allowNaN: false }, { message: "Invalid Weight" })
    weight: number

    @ApiProperty({ example: 1 })
    @IsOptional()
    @TransformToNumber()
    @IsNumber({ allowNaN: false }, { message: "Invalid COD" })
    @Min(1)
    COD: number

    @ApiProperty({ example: ConsignmentDelivery.SAME_DAY })
    @IsOptional()
    @IsEnum(ConsignmentDelivery)
    deliveryType: ConsignmentDelivery

    @ApiProperty({ example: ConsignmentType.LOCAL })
    @IsOptional()
    @IsEnum(ConsignmentType)
    type: ConsignmentType
}