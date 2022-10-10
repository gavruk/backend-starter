import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(query: object): Promise<UserDocument | undefined> {
    return this.userModel.findOne(query);
  }

  async create(data: Partial<User>): Promise<UserDocument | undefined> {
    return this.userModel.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      passwordHash: data.passwordHash,
    });
  }
}
