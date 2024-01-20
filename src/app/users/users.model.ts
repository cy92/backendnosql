import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, ObjectId, SchemaTypes } from "mongoose";

export type UsersDocument = Users & Document;

@Schema({ timestamps: true, collection: 'users' })
export class Users {

    @Prop({ type: SchemaTypes.ObjectId })
    _id: ObjectId;

    @Prop({ type: String })
    name: string;

    @Prop({ type: String })
    role: string;

    @Prop({ type: String })
    contact: string;

    @Prop({ type: String })
    address: string;

    @Prop({ type: Date })
    createdAt: Date;

    @Prop({ type: String })
    createdBy: string;

    @Prop({ type: Date })
    updatedAt: Date;

    @Prop({ type: String })
    updatedBy: string;
}

export const userSchema = SchemaFactory.createForClass(Users);