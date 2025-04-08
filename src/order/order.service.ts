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

    async getOrderById(orderId: string): Promise<Order | null> {
        return this.orderModel.findOne({ orderId }).exec(); // Find the order by its ID
    }

    async getOrdersByUserId(userId: string): Promise<Order[]> {
        return this.orderModel.find({ userId }).exec(); // Find all orders for the given user
    }

    async getAllOrders(): Promise<Order[]> {
        return this.orderModel.find().exec(); // Find all orders in the database
    }

    async updateOrderStatus(orderId: string, status: string): Promise<Order | null> {
        return this.orderModel.findOneAndUpdate(
            { orderId },
            { status },
            { new: true }
        ).exec();
    }
}
