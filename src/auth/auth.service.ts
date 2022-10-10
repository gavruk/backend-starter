import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import * as interfaces from './auth.interfaces';
import { UserRo } from '../users/users.interfaces';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUserByPassword(
    email: string,
    password: string,
  ): Promise<UserRo | null> {
    const user = await this.usersService.findOne({ email });
    if (!user) {
      return null;
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return null;
    }

    return {
      _id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  async signup(data: interfaces.SignupDto): Promise<interfaces.AuthRo> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(data.password, salt);
    const user = await this.usersService.create({
      ...data,
      passwordHash: hash,
    });
    return this.login({
      _id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    });
  }

  async login(user: UserRo): Promise<interfaces.AuthRo> {
    const payload = { email: user.email, sub: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async getMe(_id: string): Promise<UserRo | null> {
    const user = await this.usersService.findOne({ _id });
    if (!user) {
      return null;
    }
    return {
      _id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }
}
