import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique order IDs

export type OrderDocument = Order & Document;

export enum OrderStatus {
    Pending = 'Pending',
    Preparing = 'Preparing',
    OnTheWay = 'OnTheWay',
    Delivered = 'Delivered',
  }

@Schema({ timestamps: true })
export class Order {
    @Prop({ required: true })
    userId: string;

    @Prop({ default: () => uuidv4() })
    orderId: string;

    @Prop({ type: [Object], default: [] })
    items: any[];

    @Prop({ required: true })
    total: number;

    @Prop({ enum: OrderStatus, default: OrderStatus.Pending })
    status: OrderStatus;
}

export const OrderSchema = SchemaFactory.createForClass(Order);