import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique order IDs

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
    @Prop({ required: true })
    userId: string;

    @Prop({ default: () => uuidv4() })
    orderId: string;

    @Prop({ type: [Object], default: [] })
    items: any[]; // you can type this more strictly if needed

    @Prop({ required: true })
    total: number;

    @Prop({ default: 'pending' }) // or use enum
    status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);