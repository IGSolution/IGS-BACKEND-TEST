import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
    @Prop({ required: true })
    userId: string;

    @Prop({ default: () => uuidv4() })
    itemId: string;

    @Prop()
    name: string;

    @Prop()
    price: number;

    @Prop()
    quantity: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);