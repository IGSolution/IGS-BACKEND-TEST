/* eslint-disable prettier/prettier */
// /src/restaurants/schemas/restaurant.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MenuItem } from './menu-item.schema';

export type RestaurantDocument = Restaurant & Document;

@Schema()
export class Restaurant {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'MenuItem' }], default: [] })
  menu: MenuItem[];

  //  Add this line to your restaurant schema
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
