/* eslint-disable prettier/prettier */

import { Controller, Post, Body, Patch, UseGuards, Request, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtPayload } from '../auth/strategies/jwt.strategy';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('address')
  async addAddress(@Request() req: { user: JwtPayload }, @Body() { address }: { address: string }) {
    return this.usersService.addAddress(req.user.userId, address);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('address/remove')  // Changed to a more RESTful path
  async removeAddress(@Request() req: { user: JwtPayload }, @Body() { address }: { address: string }) {
    return this.usersService.removeAddress(req.user.userId, address);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Request() req: { user: JwtPayload }, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.userId, updateUserDto);
  }
}