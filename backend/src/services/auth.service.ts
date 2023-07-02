import { Injectable } from '@nestjs/common';
import { UsersService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { compareSync as compare } from 'bcrypt';
import { TypeOrmExceptionMapperExecutor } from 'src/executors/TypeOrmExceptionMapperExecutor';
import { UseExceptionMapper } from 'src/decorators/UseExceptionMapper';

@Injectable()
@UseExceptionMapper(TypeOrmExceptionMapperExecutor)
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

  async login<T extends User>(user: T): Promise<T> {
    const { id, username } = user;
    user.access_token = this.jwtService.sign({ username, sub: id });
    return user;
  }

  async profile(user: User): Promise<User> {
    return user;
  }
}
