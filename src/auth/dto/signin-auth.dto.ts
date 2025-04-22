
import { ApiProperty } from "@nestjs/swagger";
import {IsNotEmpty, IsString ,MinLength} from "class-validator";

export class SignInDto {
  @ApiProperty({ description: 'username used during registration', example:"testusername" })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @ApiProperty({ description: 'password used during registration', example:"test123" })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
}

