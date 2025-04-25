import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
    @Prop({ required: true })
    userId: string;

    @Prop({ default: () => uuidv4() })
    cartId: string;

    @Prop({ required: true })
    itemId: string;

    @Prop()
    name: string;

    @Prop()
    price: number;

    @Prop()
    quantity: number;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const CartSchema = SchemaFactory.createForClass(Cart);