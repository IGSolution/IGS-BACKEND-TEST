import { Body, Controller, Get, Param, Post  } from '@nestjs/common';
import { OrderService } from './order.service'; // Import the OrderService
import { Model } from 'mongoose';

@Controller('order')
export class OrderController {
    constructor(private readonly OrderService: OrderService) { } // Constructor for the OrderController, currently empty

    @Post(':userId/create')
    CreateOrder(@Param('userId') userId: string, @Body() items: any, @Body('total') total: number) {
        return this.OrderService.createOrder(userId, items, total); // Call the createOrder method from OrderService
    }

    @Get(':orderId')
    getOrderById(@Param('orderId') orderId: string) {
        return this.OrderService.getOrderById(orderId); // Call the getOrderById method from OrderService
    }

    @Get('user/:userId')
    getOrdersByUserId(@Param('userId') userId: string) {
        return this.OrderService.getOrdersByUserId(userId); // Call the getOrdersByUserId method from OrderService
    }

    @Get('all')
    getAllOrders() {
        return this.OrderService.getAllOrders(); // Call the getAllOrders method from OrderService
    }
}
