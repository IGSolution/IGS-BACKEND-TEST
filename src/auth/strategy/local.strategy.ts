import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { SignInDto } from "../dto/signin-auth.dto";
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
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