import { Controller, Post, Body, Param, Delete, Get } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './Dto/add-to-cart-dto';
import { RemoveFromCartDto } from './Dto/remove-from-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/add')
  addItem(@Body() dto: AddToCartDto) {
    return this.cartService.addToCart(dto);
  }

  @Delete('/remove')
  removeItem(@Body() dto: RemoveFromCartDto) {
    return this.cartService.removeFromCart(dto);
  }

  @Get(':cartId')
  getCart(@Param('cartId') userId: string) {
    return this.cartService.getCart(userId);
    }

  @Delete(':userId/clear')
  clearCart(@Param('userId') userId: string) {
      return this.cartService.clearCart(userId);
  }
}
