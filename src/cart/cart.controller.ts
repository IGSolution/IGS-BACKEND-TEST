import { Controller, Post, Body, Param, Delete, Get } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(':userId/add')
  addItem(@Param('userId') userId: string, @Body() item: any) {
    return this.cartService.addToCart(userId, item);
  }

  @Delete(':userId/remove/:itemId')
  removeItem(@Param('userId') userId: string, @Param('itemId') itemId: string) {
    return this.cartService.removeFromCart(userId, itemId);
  }

  @Get(':userId')
  getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(userId);
    }

    @Delete(':userId/clear')
    clearCart(@Param('userId') userId: string) {
        return this.cartService.clearCart(userId);
    }
}
