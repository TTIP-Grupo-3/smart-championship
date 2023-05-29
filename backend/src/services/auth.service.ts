import { Injectable } from '@nestjs/common';
import { UsersService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { compareSync as compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findOne(username);
    if (user && compare(password, user.password)) {
      user.password = null;
      return user;
    }
    return null;
  }

  async login(user: User) {
    const { id, username, role } = user;
    const payload = { username: username, sub: id };
    return { username, role, access_token: this.jwtService.sign(payload) };
  }
}
