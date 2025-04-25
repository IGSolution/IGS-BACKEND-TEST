import { IsString, IsInt, Min } from 'class-validator';

export class AddToCartDto {
  @IsString()
  userId: string;

  @IsString()
  itemId: string; // This refers to the menu or product ID

  @IsInt()
  @Min(1)
  quantity: number;
}