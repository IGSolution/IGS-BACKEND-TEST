import { Body, Controller, Get, Param, Post  } from '@nestjs/common';
import { OrderService } from './order.service'; // Import the OrderService
import { Model } from 'mongoose';
import { create } from 'domain';
import { UpdateOrderStatusDto } from './Dto/update-order-status-dto';

@Controller('order')
export class OrderController {
    constructor(private readonly OrderService: OrderService) { } // Constructor for the OrderController, currently empty

    @Post('/create')
    CreateOrder(@Body() createOrderDto: any) {
        return this.OrderService.createOrder(createOrderDto); 
    }

    @Get(':orderId')
    getOrderById(@Param('orderId') orderId: string) {
        return this.OrderService.getOrderById(orderId);
    }

    @Get('user/:userId')
    getOrdersByUserId(@Param('userId') userId: string) {
        return this.OrderService.getOrdersByUserId(userId);
    }

    @Get('/all')
    getAllOrders() {
        return this.OrderService.getAllOrders();
    }

    @Post('/update/:orderId')
    updateOrderStatus(@Param('orderId') orderId: string, @Body() updateOrderStatusDto: UpdateOrderStatusDto) {
        return this.OrderService.updateOrderStatus(orderId, updateOrderStatusDto);
    }
}
