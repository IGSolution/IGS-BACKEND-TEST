import { IsString } from 'class-validator';

export class RemoveFromCartDto {
  @IsString()
  userId: string;

  @IsString()
  itemId: string;
}