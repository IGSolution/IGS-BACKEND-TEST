/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { SignInDto } from "../dto/signin-auth.dto";
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    validate(...args: any[]): unknown {
        throw new Error("Method not implemented.");
    }
    /**
     *
     */
    constructor(
        private authService:AuthService
    ) {
        super();     
    }
    localStrategyValidate(signInDto:SignInDto) {
        const user = this.authService.signIn(signInDto)  
        if(!user) throw new UnauthorizedException()
            return user
    }
}