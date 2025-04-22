import { Injectable, Query, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAllUsers(@Query() query) {
    let { limit = 10, page = 1 } = query;
    page = page || 1;
    const skip = page ? (page - 1) * limit : 0;
    let option = {};

    const count = this.userModel
      .find(option)
      .sort({ updatedAt: -1 })
      .countDocuments();

    let pages = 0;
    if ((await count) > 0) {
      if (limit) {
        pages = Math.ceil((await count) / limit);
      } else {
        pages = 1;
      }
    }

    limit = limit - 0;
    let next = { limit, page: page * 1 + 1 };
    let previous = { limit, page: page * 1 + 1 };
    let result = {next,previous};

    if (page * 1 < pages) {
      result.next = { limit, page: page * 1 + 1 };
    }
    if (page * 1 <= pages && page - 1 != 0) {
      result.previous = { limit, page: page - 1 };
    }

    const user = await this.userModel.find(option)
      .limit(limit * 1)
      .skip(skip);
    return ({ status: 'success', data: { ...result, count, pages, user } });
  }

  findSingleUser(id: any) {
    return this.userModel.findOne(id);
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
}
