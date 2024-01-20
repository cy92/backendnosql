import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Login, loginSchema } from './login.model';
import { Crypto } from 'src/util/crypto.util';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Login.name, schema: loginSchema }
    ])
  ],
  controllers: [LoginController],
  providers: [LoginService, Crypto, JwtService],
})
export class LoginModule { }
