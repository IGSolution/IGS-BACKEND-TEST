/* eslint-disable prettier/prettier */
// /src/restaurants/restaurants.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RestaurantsService } from '../restaurant/restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtPayload } from '../auth/strategies/jwt.strategy';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createRestaurant(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @Request() req: { user: JwtPayload },
  ) {
    return this.restaurantsService.createRestaurant(
      createRestaurantDto,
      req.user,
    );
  }

  @Get()
  async findAllRestaurants() {
    return this.restaurantsService.findAllRestaurants();
  }

  @Get(':id')
  async findRestaurantById(@Param('id') id: string) {
    return this.restaurantsService.findRestaurantById(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateRestaurant(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
    @Request() req: { user: JwtPayload },
  ) {
    return this.restaurantsService.updateRestaurant(
      id,
      updateRestaurantDto,
      req.user,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteRestaurant(
    @Param('id') id: string,
    @Request() req: { user: JwtPayload },
  ) {
    return this.restaurantsService.deleteRestaurant(id, req.user);
  }

  @Post(':restaurantId/menu')
  @UseGuards(JwtAuthGuard)
  async addMenuItem(
    @Param('restaurantId') restaurantId: string,
    @Body() createMenuItemDto: CreateMenuItemDto,
    @Request() req: { user: JwtPayload },
  ) {
    return this.restaurantsService.addMenuItem(
      restaurantId,
      createMenuItemDto,
      req.user,
    );
  }

  @Get(':restaurantId/menu')
  async getMenuItemsByRestaurant(@Param('restaurantId') restaurantId: string) {
    return this.restaurantsService.getMenuItemsByRestaurant(restaurantId);
  }

  @Get('menu/:id')
  async findMenuItemById(@Param('id') id: string) {
    return this.restaurantsService.findMenuItemById(id);
  }

  @Patch('menu/:id')
  @UseGuards(JwtAuthGuard)
  async updateMenuItem(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
    @Request() req: { user: JwtPayload },
  ) {
    return this.restaurantsService.updateMenuItem(
      id,
      updateMenuItemDto,
      req.user,
    );
  }

  @Delete('menu/:id')
  @UseGuards(JwtAuthGuard)
  async deleteMenuItem(
    @Param('id') id: string,
    @Request() req: { user: JwtPayload },
  ) {
    return this.restaurantsService.deleteMenuItem(id, req.user);
  }
}
