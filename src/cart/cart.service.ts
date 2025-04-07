import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './cart.schema';

@Injectable()
export class CartService {
    constructor(
        @InjectModel(Cart.name) // Inject the Cart model into the service
        private cartModel: Model<CartDocument> // Mongoose model for Cart
    ) { }

    async addToCart(userId: string, item: any): Promise<Cart> {
        const newItem = new this.cartModel({ ...item, userId });
        return newItem.save(); // Save the new item to the database
    }

    async removeFromCart(userId: string, itemId: string): Promise<Cart | null> {
        return this.cartModel.findOneAndDelete({ userId, itemId }); // Find and delete the item from the cart
    }

    async getCart(userId: string): Promise<Cart[]> {
        return this.cartModel.find({ userId }).exec(); // Find all items in the cart for the given user
    }

    async clearCart(userId: string): Promise<void> {
        await this.cartModel.deleteMany({ userId }); // Delete all items in the cart for the given user
    }

}
