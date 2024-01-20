import { NotFoundException } from "@nestjs/common";

export class LoginUserFound extends NotFoundException {
    constructor() {
        super("Login user exist");
    }
}