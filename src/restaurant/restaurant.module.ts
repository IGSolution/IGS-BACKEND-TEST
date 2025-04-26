/* eslint-disable prettier/prettier */
// src/restaurant/restaurant.module.ts
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurant.service'; // Corrected path
import { RestaurantsController } from './restaurant.controller'; // Corrected path
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurant, RestaurantSchema } from './schemas/restaurant.schema';
import { MenuItem, MenuItemSchema } from './schemas/menu-item.schema';
// import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard'; // Assuming you're using the guard from 'src/auth/guard/jwt.guard'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
      { name: MenuItem.name, schema: MenuItemSchema },
    ]),
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
  exports: [RestaurantsService],
})
export class RestaurantsModule {}
