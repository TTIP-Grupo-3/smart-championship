import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { entities } from 'src/utils/entities';

export const testSqlClient = (): TypeOrmModuleOptions => ({
  type: 'sqlite',
  database: ':memory:',
  entities,
  logging: false,
  synchronize: true,
  dropSchema: true,
});
