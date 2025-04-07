import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './order.schema';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) // Inject the Order model into the service
        private orderModel: Model<OrderDocument> // Mongoose model for Order
    ) { }

    async createOrder(userId: string, items: any[], total: number): Promise<Order> {
        const newOrder = new this.orderModel({ userId, items, total });
        return newOrder.save(); // Save the new order to the database
    }
}
