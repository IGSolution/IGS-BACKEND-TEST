/* eslint-disable prettier/prettier */
// /src/restaurants/dto/create-menu-item.dto.ts
import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateMenuItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;
}
// This DTO defines the structure of the data required to create a new menu item.
// It includes validation rules to ensure that the data is in the correct format.