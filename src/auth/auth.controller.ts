/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup-auth.dto';
import { SignInDto } from './dto/signin-auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  signUp(@Body() signUpDto: SignUpDto):Promise<{user:object,token:string}> {
    return this.authService.signUp(signUpDto);
  }

  @Post("/login")
  signIn(@Body() signInDto: SignInDto):Promise<{user:object,token:string}> {
    return this.authService.signIn(signInDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}


