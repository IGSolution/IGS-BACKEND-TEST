import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './order.schema';
import { CartModule } from '../cart/cart.module';
import { MongoDBModule } from 'src/database/database.module';

@Module({
  imports: [
    MongoDBModule,
    CartModule // Import the CartModule to use its services
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
