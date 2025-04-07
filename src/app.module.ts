import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [CartModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
