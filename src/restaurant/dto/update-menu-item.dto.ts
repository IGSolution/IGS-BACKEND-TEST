/* eslint-disable prettier/prettier */
// /src/restaurants/dto/update-menu-item.dto.ts
import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class UpdateMenuItemDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;
}
// This DTO defines the structure of the data required to update an existing menu item.
// It includes optional fields, allowing partial updates to the menu item.  