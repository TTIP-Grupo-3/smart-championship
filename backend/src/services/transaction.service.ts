import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(private readonly dataSource: DataSource) {}

  async transaction<T>(
    callback: (entityManager: EntityManager) => Promise<T>,
    manager?: EntityManager,
  ): Promise<T> {
    if (manager) {
      return await callback(manager);
    } else {
      return await this.dataSource.transaction(callback);
    }
  }
}
