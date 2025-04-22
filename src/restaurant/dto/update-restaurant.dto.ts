/* eslint-disable prettier/prettier */
// /src/restaurants/dto/update-restaurant.dto.ts
import { IsString, IsOptional } from 'class-validator';

export class UpdateRestaurantDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
