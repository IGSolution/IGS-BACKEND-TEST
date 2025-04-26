/* eslint-disable prettier/prettier */
// /src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @Inject('MONGO_DB') private readonly db: Db,
  ) {}

  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<any> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = {
      ...createUserDto,
      password: hashedPassword,
      addresses: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await this.db.collection('users').insertOne(newUser);
    const insertedUser = await this.db.collection('users').findOne({ _id: result.insertedId });
    return insertedUser;
  }

  // Find all users
  async findAll(): Promise<any[]> {
    return this.db.collection('users').find().toArray();
  }

  // Find one user by email
  async findOneByEmail(email: string): Promise<any> {
    return this.db.collection('users').findOne({ email });
  }

  // Find one user by ID
  async findById(id: string): Promise<any> {
    const user = await this.db.collection('users').findOne({ _id: new ObjectId(id) });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Update user
  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    const result = await this.db.collection('users').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...updateUserDto, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );

    if (!result || !result.value) {
      throw new NotFoundException('User not found');
    }

    return result.value;
  }

  // Add address
  async addAddress(userId: string, address: string): Promise<any> {
    const user = await this.findById(userId);
    if (!user.addresses.includes(address)) {
      user.addresses.push(address);
      await this.db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        { $set: { addresses: user.addresses, updatedAt: new Date() } }
      );
    }
    return this.findById(userId);
  }

  // Remove address
  async removeAddress(userId: string, address: string): Promise<any> {
    const user = await this.findById(userId);
    const newAddresses = user.addresses.filter((addr: string) => addr !== address);

    await this.db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: { addresses: newAddresses, updatedAt: new Date() } }
    );

    return this.findById(userId);
  }
}