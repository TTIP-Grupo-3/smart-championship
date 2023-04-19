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
import { TransactionService } from './services/transaction.service';
import { MatchService } from './services/match.service';
import { MatchGateway } from './gateways/match.gateway';
import { ChampionshipGateway } from './gateways/championship.gateway';
import { ChampionshipPlayerService } from './services/championshipPlayer.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRoot(sqlClient()),
    TypeOrmModule.forFeature(entities),
  ],
  controllers: [ChampionshipController],
  providers: [
    ChampionshipService,
    TransactionService,
    MatchService,
    MatchGateway,
    ChampionshipGateway,
    ChampionshipPlayerService,
    DataService,
    EntityToDTOMapper,
  ],
})
export class AppModule {
  constructor(private dataService: DataService) {}

  async onModuleInit() {
    await this.dataService.initialize();
  }
}
