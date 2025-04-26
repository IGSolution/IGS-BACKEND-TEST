import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
// import { OrderStatus } from './order-status.enum';
import { CreateOrderDto } from './Dto/create-order-dto';
import { UpdateOrderStatusDto } from './Dto/update-order-status-dto';
import { OrderStatus } from './order.schema';

@Injectable()
export class OrderService {
  constructor(
    @Inject('MONGO_DB') private readonly db: Db, // Inject the MongoDB database connection
  ) {}

  // Create a new order
  async createOrder(createOrderDto: CreateOrderDto): Promise<any> {
    const { userId, items } = createOrderDto;

    // Calculate total cost
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const newOrder = {
        userId,
        orderId: uuidv4(),
        items,
        total,
        status: OrderStatus.Pending,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

      const result = await this.db.collection('orders').insertOne(newOrder);
      const insertedOrder = await this.db.collection('orders').findOne({ _id: result.insertedId });

      return insertedOrder; // Return the inserted order
  }

  // Retrieve an order by its ID
  async getOrderById(orderId: string): Promise<any> {
    const order = await this.db.collection('orders').findOne({ orderId });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  // Retrieve all orders for a specific user
  async getOrdersByUserId(userId: string): Promise<any[]> {
    return this.db.collection('orders').find({ userId }).toArray();
  }

  // Retrieve all orders
  async getAllOrders(): Promise<any[]> {
    return this.db.collection('orders').find().toArray();
  }

  // Update the status of an order
  async updateOrderStatus(orderId: string, updateOrderStatusDto: UpdateOrderStatusDto): Promise<any> {
    const { status } = updateOrderStatusDto;

    const result = await this.db.collection('orders').findOneAndUpdate(
      { orderId },
      { $set: { status, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );

    console.log(result);
    if (!result) {
      throw new NotFoundException('Order not found');
    }

    return result;
  }
}