import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../schema/user.schema";
import { Model } from "mongoose";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectModel(User.name)
        private userModel:Model<User>
    ) {
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoredExpiration:false,
            // secretOrkey: process.env.JWT_SECRET
            secretOrKey:"mysecretekey"
        });
        
    }
    async validate(payload:any) {

        const {id} = payload;
        console.log("got to jwt strategy",process.env.JWT_SECRET);

        const user =await this.userModel.findById(id);
        if(!user) {
            throw new UnauthorizedException("You need to login to access this resource")
        }
        return user;

    }
}