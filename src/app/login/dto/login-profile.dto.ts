import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { LoginRole } from "../enum/login-role.enum";

export class LoginPorfileDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(LoginRole)
    role: LoginRole;

    @ApiProperty()
    @IsString()
    token?: string;
}