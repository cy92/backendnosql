import { Body, Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { LoginPorfileDto } from './dto/login-profile.dto';
import { AddLoginDto } from './dto/add-login.dto';
import { JwtValidatorInterceptor } from 'src/util/jwt-validator.interceptor';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post()
  async login(@Body() req: LoginDto): Promise<LoginPorfileDto> {
    const login = await this.loginService.validateLogin(req);

    return login;
  }

  @Post('add')
  @UseInterceptors(JwtValidatorInterceptor)
  async addLogin(@Body() req: AddLoginDto): Promise<LoginPorfileDto> {
    const login = await this.loginService.addLogin(req);

    return login;
  }

  @Get('enc/:pass')
  async genPass(@Param() req): Promise<void> {
    this.loginService.encPass(req.pass);
  }
}
