/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-irregular-whitespace */
// /* eslint-disable prettier/prettier */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable prettier/prettier */
// // /src/restaurants/restaurants.service.ts
// import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model, Types } from 'mongoose';
// import { Restaurant, RestaurantDocument } from './schemas/restaurant.schema';
// import { MenuItem, MenuItemDocument } from './schemas/menu-item.schema';
// import { CreateRestaurantDto } from './dto/create-restaurant.dto';
// import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
// import { CreateMenuItemDto } from './dto/create-menu-item.dto';
// import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
// import { JwtStrategy } from '../auth/strategy/jwt.strategy'; // Import the JwtPayload

// @Injectable()
// export class RestaurantsService {
//   constructor(
//     @InjectModel(Restaurant.name)
//     private restaurantModel: Model<RestaurantDocument>,
//     @InjectModel(MenuItem.name) private menuItemModel: Model<MenuItemDocument>,
//   ) {}

//   async createRestaurant(
//     createRestaurantDto: CreateRestaurantDto,
//     user: JwtStrategy,
//   ): Promise<Restaurant> {
//     const createdRestaurant = new this.restaurantModel({
//       ...createRestaurantDto,
//       user,
//     });
//     return createdRestaurant.save();
//   }

//   async findAllRestaurants(): Promise<Restaurant[]> {
//     return this.restaurantModel
//       .find()
//       .populate('menu', '_id name description price')
//       .exec();
//   }

//   async findRestaurantById(id: string): Promise<Restaurant> {
//     if (!Types.ObjectId.isValid(id)) {
//       throw new NotFoundException(`Invalid restaurant ID: ${id}`);
//     }
//     const restaurant = await this.restaurantModel
//       .findById(id)
//       .populate('menu', '_id name description price')
//       .exec();
//     if (!restaurant) {
//       throw new NotFoundException(`Restaurant with ID "${id}" not found`);
//     }
//     return restaurant;
//   }

//   async updateRestaurant(
//     id: string,
//     updateRestaurantDto: UpdateRestaurantDto,
//     user: JwtStrategy,
//   ): Promise<Restaurant | null> {
//     if (!Types.ObjectId.isValid(id)) {
//       throw new NotFoundException(`Invalid restaurant ID: ${id}`);
//     }
//     const restaurant = await this.restaurantModel.findById(id);
//     if (!restaurant) {
//       throw new NotFoundException(`Restaurant with ID "${id}" not found`);
//     }

//     // if (restaurant.userId.toString() !== user.userId && user.role !== 'admin') {
//     //   throw new UnauthorizedException(
//     //     'You are not authorized to update this restaurant.',
//     //   );
//     // }

//     return this.restaurantModel
//       .findByIdAndUpdate(id, updateRestaurantDto, { new: true })
//       .exec();
//   }

//   async deleteRestaurant(
//     id: string,
//     user: JwtStrategy,
//   ): Promise<Restaurant | null> {
//     if (!Types.ObjectId.isValid(id)) {
//       throw new NotFoundException(`Invalid restaurant ID: ${id}`);
//     }
//     const restaurant = await this.restaurantModel.findById(id);
//     if (!restaurant) {
//       throw new NotFoundException(`Restaurant with ID "${id}" not found`);
//     }
//     // if (restaurant.userId.toString() !== user.userId && user.role !== 'admin') {
//     //   throw new UnauthorizedException(
//     //     'You are not authorized to delete this restaurant.',
//     //   );
//     // }
//     await this.menuItemModel.deleteMany({ restaurant: id }).exec();
//     return this.restaurantModel.findByIdAndDelete(id).exec();
//   }

//   async addMenuItem(
//     restaurantId: string,
//     createMenuItemDto: CreateMenuItemDto,
//     user: JwtStrategy,
//   ): Promise<Restaurant> {
//     if (!Types.ObjectId.isValid(restaurantId)) {
//       throw new NotFoundException(`Invalid restaurant ID: ${restaurantId}`);
//     }
//     const restaurant = await this.findRestaurantById(restaurantId);
//     if (!restaurant) {
//       throw new NotFoundException(
//         `Restaurant with ID "${restaurantId}" not found`,
//       );
//     }
//     //  Only admin and restaurant owner can add menu item
//     // if (restaurant.userId.toString() !== user.userId && user.role !== 'admin') {
//     //   throw new UnauthorizedException(
//     //     'You are not authorized to add menu items to this restaurant',
//     //   );
//     // }

//     const createdMenuItem = new this.menuItemModel({
//       ...createMenuItemDto,
//       restaurant: restaurantId,
//     });
//     const savedMenuItem = await createdMenuItem.save();
//     restaurant.menu.push(savedMenuItem._id);
//     await restaurant.save();
//     return this.findRestaurantById(restaurantId);
//   }

//   async getMenuItemsByRestaurant(restaurantId: string): Promise<MenuItem[]> {
//     if (!Types.ObjectId.isValid(restaurantId)) {
//       throw new NotFoundException(`Invalid restaurant ID: ${restaurantId}`);
//     }
//     return this.menuItemModel.find({ restaurant: restaurantId }).exec();
//   }

//   async findMenuItemById(id: string): Promise<MenuItem> {
//     if (!Types.ObjectId.isValid(id)) {
//       throw new NotFoundException(`Invalid menu item ID: ${id}`);
//     }
//     const menuItem = await this.menuItemModel.findById(id).exec();
//     if (!menuItem) {
//       throw new NotFoundException(`Menu item with ID "${id}" not found`);
//     }
//     return menuItem;
//   }

//   async updateMenuItem(
//     id: string,
//     updateMenuItemDto: UpdateMenuItemDto,
//     user: JwtStrategy,
//   ): Promise<MenuItem | null> {
//     if (!Types.ObjectId.isValid(id)) {
//       throw new NotFoundException(`Invalid menu item ID: ${id}`);
//     }
//     const menuItem = await this.findMenuItemById(id);
//     if (!menuItem) {
//       throw new NotFoundException(`Menu item with ID "${id}" not found`);
//     }
//     const restaurant = await this.restaurantModel.findById(menuItem.restaurant);

//     // if (restaurant.userId.toString() !== user.userId && user.role !== 'admin') {
//     //   throw new UnauthorizedException(
//     //     'You are not authorized to update this menu item.',
//     //   );
//     // }
//     return this.menuItemModel
//       .findByIdAndUpdate(id, updateMenuItemDto, { new: true })
//       .exec();
//   }

//   async deleteMenuItem(
//     id: string,
//     user: JwtStrategy,
//   ): Promise<MenuItem | null> {
//     if (!Types.ObjectId.isValid(id)) {
//       throw new NotFoundException(`Invalid menu item ID: ${id}`);
//     }
//     const menuItem = await this.findMenuItemById(id);
//     if (!menuItem) {
//       throw new NotFoundException(`Menu item with ID "${id}" not found`);
//     }
//     const restaurant = await this.restaurantModel.findById(menuItem.restaurant);
//     // if (restaurant.userId.toString() !== user.userId && user.role !== 'admin') {
//     //   throw new UnauthorizedException(
//     //     'You are not authorized to delete this menu item.',
//     //   );
//     // }
//     return this.menuItemModel.findByIdAndDelete(id).exec();
//   }
// }


/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
 
/* eslint-disable prettier/prettier */
// /src/restaurants/restaurants.service.ts
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Types, Connection } from 'mongoose';
import { Restaurant, RestaurantDocument } from './schemas/restaurant.schema';
import { MenuItem, MenuItemDocument } from './schemas/menu-item.schema';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

// Define the JwtPayload interface here
interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  userId: string; // Assuming your user identifier is 'userId'
}

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<RestaurantDocument>,
    @InjectModel(MenuItem.name) private menuItemModel: Model<MenuItemDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  async createRestaurant(
    createRestaurantDto: CreateRestaurantDto,
    user: JwtPayload,
  ): Promise<RestaurantDocument> {
    const createdRestaurant = new this.restaurantModel({
      ...createRestaurantDto,
      user: user.userId, // Store the userId
      menu: [],
    });
    return createdRestaurant.save();
  }

  async findAllRestaurants(): Promise<RestaurantDocument[]> {
    return this.restaurantModel
      .find()
      .populate('menu', '_id name description price')
      .exec();
  }

  async findRestaurantById(id: string): Promise<RestaurantDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid restaurant ID: ${id}`);
    }
    const restaurant = await this.restaurantModel
      .findById(id)
      .populate('menu', '_id name description price')
      .exec();
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID "${id}" not found`);
    }
    return restaurant;
  }

  async updateRestaurant(
    id: string,
    updateRestaurantDto: UpdateRestaurantDto,
    user: JwtPayload,
  ): Promise<RestaurantDocument | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid restaurant ID: ${id}`);
    }
    const restaurant = await this.restaurantModel.findById(id);
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID "${id}" not found`);
    }

    // if (restaurant.userId.toString() !== user.userId && user.role !== 'admin') {
    //   throw new UnauthorizedException(
    //     'You are not authorized to update this restaurant.',
    //   );
    // }

    return this.restaurantModel
      .findByIdAndUpdate(id, updateRestaurantDto, { new: true })
      .exec();
  }

  async deleteRestaurant(
    id: string,
    user: JwtPayload,
  ): Promise<RestaurantDocument | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid restaurant ID: ${id}`);
    }
    const restaurant = await this.restaurantModel.findById(id);
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID "${id}" not found`);
    }
    // if (restaurant.userId.toString() !== user.userId && user.role !== 'admin') {
    //   throw new UnauthorizedException(
    //     'You are not authorized to delete this restaurant.',
    //   );
    // }
    await this.menuItemModel.deleteMany({ restaurant: id }).exec();
    return this.restaurantModel.findByIdAndDelete(id).exec();
  }

  async addMenuItem(
    restaurantId: string,
    createMenuItemDto: CreateMenuItemDto,
    user: JwtPayload,
  ): Promise<RestaurantDocument> {
    if (!Types.ObjectId.isValid(restaurantId)) {
      throw new NotFoundException(`Invalid restaurant ID: ${restaurantId}`);
    }
    const restaurant = await this.findRestaurantById(restaurantId);
    if (!restaurant) {
      throw new NotFoundException(
        `Restaurant with ID "${restaurantId}" not found`,
      );
    }
    //  Only admin and restaurant owner can add menu item
    // if (restaurant.userId.toString() !== user.userId && user.role !== 'admin') {
    //   throw new UnauthorizedException(
    //     'You are not authorized to add menu items to this restaurant',
    //   );
    // }

    const createdMenuItem = new this.menuItemModel({
      ...createMenuItemDto,
      restaurant: restaurantId,
    });
    const savedMenuItem = await createdMenuItem.save();

    // Ensure restaurant.menu is an array before pushing
    if (!Array.isArray(restaurant.menu)) {
      restaurant.menu = [];
    }
    restaurant.menu.push(savedMenuItem._id as any); // Explicitly cast to any
    return restaurant.save(); // 'save()' should exist on RestaurantDocument
  }

  async getMenuItemsByRestaurant(restaurantId: string): Promise<MenuItemDocument[]> {
    if (!Types.ObjectId.isValid(restaurantId)) {
      throw new NotFoundException(`Invalid restaurant ID: ${restaurantId}`);
    }
    return this.menuItemModel.find({ restaurant: restaurantId }).exec();
  }

  async findMenuItemById(id: string): Promise<MenuItemDocument> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid menu item ID: ${id}`);
    }
    const menuItem = await this.menuItemModel.findById(id).exec();
    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID "${id}" not found`);
    }
    return menuItem;
  }

  async updateMenuItem(
    id: string,
    updateMenuItemDto: UpdateMenuItemDto,
    user: JwtPayload,
  ): Promise<MenuItemDocument | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid menu item ID: ${id}`);
    }
    const menuItem = await this.findMenuItemById(id);
    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID "${id}" not found`);
    }
    const restaurant = await this.restaurantModel.findById(menuItem.restaurant);

    // if (restaurant.userId.toString() !== user.userId && user.role !== 'admin') {
    //   throw new UnauthorizedException(
    //     'You are not authorized to update this menu item.',
    //   );
    // }
    return this.menuItemModel
      .findByIdAndUpdate(id, updateMenuItemDto, { new: true })
      .exec();
  }

  async deleteMenuItem(
    id: string,
    user: JwtPayload,
  ): Promise<MenuItemDocument | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid menu item ID: ${id}`);
    }
    const menuItem = await this.findMenuItemById(id);
    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID "${id}" not found`);
    }
    const restaurant = await this.restaurantModel.findById(menuItem.restaurant);
    // if (restaurant.userId.toString() !== user.userId && user.role !== 'admin') {
    //   throw new UnauthorizedException(
    //     'You are not authorized to delete this menu item.',
    //   );
    // }
    return this.menuItemModel.findByIdAndDelete(id).exec();
  }
}