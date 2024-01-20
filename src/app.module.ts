import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './app/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { LoginModule } from './app/login/login.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    JwtModule.register({ secret: process.env.JWT_SECRET}),
    UsersModule,
    LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
