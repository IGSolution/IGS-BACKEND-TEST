/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signup-auth.dto';
import { SignInDto } from './dto/signin-auth.dto';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from "bcryptjs"
import { JwtService } from '@nestjs/jwt';
// import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) 
    private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async signUp(signUpDto: SignUpDto):Promise<{user:object,token:string}> {
    const {username, password, role} = signUpDto
    const checkUser = await this.userModel.find({username})
    if (checkUser.length === 0) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.userModel.create({
        username,
        password: hashedPassword,
        role,
      });
      const token = this.jwtService.sign({ id: user._id });
      return { token, user };
    } else {
      throw new BadRequestException({ message: 'username is aleady in use' });
    }
    
  }

  async signIn(signInDto: SignInDto):Promise<{user:object,token:string}> {
    const {username,password} = signInDto;
    const user = await this.userModel.findOne({username})
    if(!user) {
      throw new UnauthorizedException('Invalid email or password')
    }
    const isPasswordMatched = await bcrypt.compare(password,user.password)
    if(!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password')
    }
    const token = this.jwtService.sign({id:user._id})
    return {token,user};
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
