import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { LoginPorfileDto } from './dto/login-profile.dto';
import mongoose, { Model, Mongoose, Types } from 'mongoose';
import { Login, LoginDocument } from './login.model';
import { LoginNotFound } from './exception/login-not-found.exception';
import { LoginRole } from './enum/login-role.enum';
import { InjectModel } from '@nestjs/mongoose';
import { Crypto } from 'src/util/crypto.util';
import { JwtService } from '@nestjs/jwt';
import { AddLoginDto } from './dto/add-login.dto';
import { LoginUserFound } from './exception/login-user-found.exception';

@Injectable()
export class LoginService {
    constructor(
        @InjectModel(Login.name)
        private readonly loginModel: Model<LoginDocument>,
        private readonly jwtService: JwtService,
    ) { }

    async validateLogin(req: LoginDto): Promise<LoginPorfileDto> {

        const login = await this.loginModel.findOne({
            username: req.username
        });

        if (!login) throw new LoginNotFound;

        try {
            const covtPass = this.convertPass(login.password);

            if (covtPass !== req.password) throw new Error;

            const userData = {
                id: login.id,
                username: login.username,
                role: login.role
            }

            const jwt = this.jwtService.sign(JSON.stringify(userData), {
                secret: process.env.JWT_SECRET
            });

            const resp: LoginPorfileDto = {
                ...userData,
                token: jwt
            }
            return resp;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async addLogin(req: AddLoginDto): Promise<LoginPorfileDto> {
        const login = await this.loginModel.findOne({ username: req.username });

        if (login) throw new LoginUserFound;
        try {
            const rawPass = Crypto.aesDec(req.password);
            const dbPass = this.encryptPassToDb(rawPass);
            const insertData = await this.loginModel.create({
                name: req.name,
                username: req.username,
                role: req.role,
                password: dbPass
            });

            return {
                id: insertData._id.toString(),
                username: insertData.username,
                role: insertData.role
            }
        } catch (error) {
            console.log(error);
        }

    }

    encPass(pass: string): void {
        const enc = Crypto.aesEnc(pass);
        console.log(enc);
    }

    encryptPassToDb(pass: string): string {
        return Crypto.aesDBEnc(pass);
    }

    convertPass(pass: string): string {
        let encPass = '';
        try {
            let decDb = Crypto.aesDBDec(pass);

            encPass = Crypto.aesEnc(decDb);
        } catch (error) {
            console.log(error);
        }

        return encPass;
    }
}
