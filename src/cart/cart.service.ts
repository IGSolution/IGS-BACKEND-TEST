import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { Cart, CartDocument, CartSchema } from './cart.schema'; // Import Cart and CartDocument types
import { Db, ObjectId } from 'mongodb';
import { AddToCartDto } from './Dto/add-to-cart-dto';
import { RemoveFromCartDto } from './Dto/remove-from-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @Inject('MONGO_DB') private readonly db: Db, // Inject the database connection
  ) {}

  async addToCart(dto: AddToCartDto): Promise<any> {
    // Lookup item in the menu collection
    const menuItem = await this.db.collection('menu').findOne({ _id: new ObjectId(dto.itemId) });

    // Check if the item exists in the menu collection
    if (!menuItem) {
      throw new NotFoundException('Item not found');
    }

    // Create cart item using menu item details
    const cartItem = {
      userId: dto.userId,
      itemId: dto.itemId,
      name: menuItem.name,
      price: menuItem.price,
      quantity: dto.quantity,
    };

    // Insert the cart item into the 'cart' collection
    const result = await this.db.collection('cart').insertOne(cartItem);

    // Retrieve the inserted document using the insertedId
    const insertedCartItem = await this.db.collection('cart').findOne({ _id: result.insertedId });

    return insertedCartItem; // Return the inserted document
  }

  async removeFromCart(dto: RemoveFromCartDto): Promise<any> {
    // Find the cart item by userId and itemId
    const cartItem = await this.db.collection('cart').findOneAndDelete({
      userId: dto.userId,
      itemId: dto.itemId,
    });

    // Check if the cart item was found and deleted
    if (!cartItem || !cartItem.value) {
      throw new NotFoundException('Cart item not found');
    }

    return cartItem.value; // Return the deleted cart item
  }

  async getCart(userId: string): Promise<any[]> {
    // Find all cart items for the given userId
      const cartItems = await this.db.collection('cart').find({ userId }).toArray();

      // Check if the cart is empty
    if (cartItems.length === 0) {
        throw new NotFoundException('Cart is empty'); // Throw an exception if the cart is empty
    }
      return cartItems; // Return the cart items
    }

  async clearCart(userId: string): Promise<any> {
    // Delete all cart items for the given userId
    const result = await this.db.collection('cart').deleteMany({ userId });

    // Check if any items were deleted
    if (result.deletedCount === 0) {
      throw new NotFoundException('No items to clear in the cart'); // Throw an exception if no items were deleted
    }

    return { message: 'Cart cleared successfully' }; // Return a success message
  }
}