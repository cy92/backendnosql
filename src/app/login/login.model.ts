import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { LoginRole } from "./enum/login-role.enum"

export type LoginDocument = Login & Document;

@Schema({ timestamps: true, collection: 'login' })
export class Login {
    @Prop({ type: String })
    name: string;

    @Prop({ type: String })
    username: string;

    @Prop({ type: String })
    password: string;

    @Prop({ example: LoginRole.admin, type: String })
    role: LoginRole;
}

export const loginSchema = SchemaFactory.createForClass(Login);