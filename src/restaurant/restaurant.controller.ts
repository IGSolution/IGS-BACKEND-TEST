/* eslint-disable prettier/prettier */
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
import { RestaurantsService } from '../restaurant/restaurant.service'; // Corrected path
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard'; // Corrected path
import { RolesGuard } from 'src/auth/guard/role.guard';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { JwtStrategy } from '../auth/strategy/jwt.strategy'; // No need to import the Strategy class
// import { JwtPayload } from '../auth/strategy/jwt.strategy'; // Import the interface
// Define the JwtPayload interface here
interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  userId: string; // Assuming your user identifier is 'userId'
}
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createRestaurant(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @Request() req: { user: JwtPayload }, // Use the JwtPayload interface
  ) {
    return this.restaurantsService.createRestaurant(
      createRestaurantDto,
      req.user,
    );
  }

  @Get()
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findAllRestaurants() {
    return this.restaurantsService.findAllRestaurants();
  }

  @Get(':id')
  @Roles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async findRestaurantById(@Param('id') id: string) {
    return this.restaurantsService.findRestaurantById(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateRestaurant(
    @Param('id') id: string,
    @Body() updateRestaurantDto: UpdateRestaurantDto,
    @Request() req: { user: JwtPayload }, // Use the JwtPayload interface
  ) {
    return this.restaurantsService.updateRestaurant(
      id,
      updateRestaurantDto,
      req.user,
    );
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteRestaurant(
    @Param('id') id: string,
    @Request() req: { user: JwtPayload }, // Use the JwtPayload interface
  ) {
    return this.restaurantsService.deleteRestaurant(id, req.user);
  }

  @Post(':restaurantId/menu')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addMenuItem(
    @Param('restaurantId') restaurantId: string,
    @Body() createMenuItemDto: CreateMenuItemDto,
    @Request() req: { user: JwtPayload }, // Use the JwtPayload interface
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
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateMenuItem(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
    @Request() req: { user: JwtPayload }, // Use the JwtPayload interface
  ) {
    return this.restaurantsService.updateMenuItem(
      id,
      updateMenuItemDto,
      req.user,
    );
  }

  @Delete('menu/:id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteMenuItem(
    @Param('id') id: string,
    @Request() req: { user: JwtPayload }, // Use the JwtPayload interface
  ) {
    return this.restaurantsService.deleteMenuItem(id, req.user);
  }
}
