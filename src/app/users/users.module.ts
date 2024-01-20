import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, userSchema } from './users.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: Users.name, schema: userSchema }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
})
export class UsersModule {}
