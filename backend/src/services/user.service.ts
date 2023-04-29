import { Injectable } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { EntityManager } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly transactionService: TransactionService) {}

  async findOne(username: string, manager?: EntityManager): Promise<User> {
    return await this.transactionService.transaction(async (manager) => {
      return await manager.findOneBy<User>(User, { username });
    }, manager);
  }
}
