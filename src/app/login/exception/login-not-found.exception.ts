import { NotFoundException } from "@nestjs/common";

export class LoginNotFound extends NotFoundException {
    constructor() {
        super("Login user not found");
    }
}