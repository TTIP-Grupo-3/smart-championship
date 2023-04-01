import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { entities } from 'src/utils/entities';

export const sqlClient = (): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: process.env.SQL_HOST,
  username: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB_NAME,
  entities,
  entityPrefix: 'smartchampionship_',
  synchronize: process.env.SQL_SYNCHRONIZE === 'true',
  logger: 'advanced-console',
  logging: ['warn', 'error'],
});
