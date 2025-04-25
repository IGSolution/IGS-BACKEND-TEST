import { IsEnum } from 'class-validator';

export enum OrderStatus {
  Pending = 'Pending',
  Preparing = 'Preparing',
  OnTheWay = 'OnTheWay',
  Delivered = 'Delivered',
}

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}