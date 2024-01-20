import { NotFoundException as NestFoundFoundException } from "@nestjs/common";
import { ERROR_MESSAGES } from "../response";


export default class NotFoundException extends NestFoundFoundException {
    constructor(error: string = ERROR_MESSAGES.RESOURCE_NOT_FOUND) {
        super(error)
    }
}