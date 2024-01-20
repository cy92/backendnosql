import { UnauthorizedException } from "@nestjs/common";

export class InvalidToken extends UnauthorizedException {
    constructor(msg: string = '') {
        super(msg);
    }
}