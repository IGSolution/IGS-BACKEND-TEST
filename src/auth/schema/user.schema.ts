import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "../enum/role.enum";
import { Document } from "mongoose";

@Schema({
    timestamps: true
})
export class User extends Document{
    @Prop({unique: [true, "duplicate username"]})
    username: string;

    @Prop()
    password: string;

    @Prop({
        type: [{type:String, enum:Role}],
        default:[Role.User]
    })
    role:Role[];
}

export const UserSchema = SchemaFactory.createForClass(User)