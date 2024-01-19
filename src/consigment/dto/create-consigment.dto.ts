import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, ValidateNested, IsOptional, IsEnum, IsObject, IsEmail, IsNumber } from 'class-validator';
import { City, ConsigmentDelivery, ConsigmentType } from 'src/database/types';
import { TransformToNumber } from 'src/common/decorators';

class Address {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    place: string

    @IsNotEmpty()
    @IsString()
    address: string

    @IsNotEmpty()
    @IsString()
    phone: string

    @IsOptional()
    @IsEmail()
    email: string

    @IsOptional()
    @IsEnum(City)
    city: City
}

export class CreateConsigmentDto {
    @IsObject({ message: "Invalid consignor details" })
    @ValidateNested()
    @Type(() => Address)
    consignor: Address

    @IsObject({ message: "Invalid consignee details" })
    @ValidateNested()
    @Type(() => Address)
    consignee: Address

    @IsNotEmpty()
    @TransformToNumber()
    @IsNumber({ allowNaN: false }, { message: "Invalid Weight" })
    weight: number

    @IsOptional()
    @IsEnum(ConsigmentDelivery)
    deliveryType: ConsigmentDelivery

    @IsOptional()
    @IsEnum(ConsigmentType)
    type: ConsigmentType
}