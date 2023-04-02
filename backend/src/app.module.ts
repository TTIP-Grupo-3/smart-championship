import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { sqlClient } from './clients/sql.client';
import configuration from './config/configuration';
import { ChampionshipController } from './controllers/championship.controller';
import { EntityToDTOMapper } from './mappers/EntityToDTOMapper';
import { ChampionshipService } from './services/championship.service';
import { DataService } from './services/data.service';
import { entities } from './utils/entities';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRoot(sqlClient()),
    TypeOrmModule.forFeature(entities),
  ],
  controllers: [ChampionshipController],
  providers: [ChampionshipService, DataService, EntityToDTOMapper],
})
export class AppModule {
  constructor(private dataService: DataService) {}

  async onModuleInit() {
    await this.dataService.initialize();
  }
}
