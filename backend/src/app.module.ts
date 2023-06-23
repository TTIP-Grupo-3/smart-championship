import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { sqlClient } from './clients/sql.client';
import configuration from './config/configuration';
import { AllChampionshipController } from './controllers/allChampionship.controller';
import { EntityToDTOMapper } from './mappers/EntityToDTOMapper';
import { AllChampionshipService } from './services/allChampionship.service';
import { DataService } from './services/data.service';
import { entities } from './utils/entities';
import { TransactionService } from './services/transaction.service';
import { MatchService } from './services/match.service';
import { MatchGateway } from './gateways/match.gateway';
import { ChampionshipGateway } from './gateways/championship.gateway';
import { ChampionshipPlayerService } from './services/championshipPlayer.service';
import { MatchController } from './controllers/match.controller';
import { UploadFileController } from './controllers/upload-file.controller';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/user.service';
import { JwtStrategy } from './strategies/jwt.startegy';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { jwtModuleAsyncOptions } from './options/jwtModuleAsync.options';
import { StorageService } from './services/storage.service';
import { ScoreChampionshipGateway } from './gateways/scoreChampionship.gateway';
import { ScoreChampionshipService } from './services/scoreChampionship.service';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { AdminChampionshipService } from './services/adminChampionship.service';
import { AdminChampionshipController } from './controllers/adminChampionship.controller';
import { AdminEnrollmentController } from './controllers/adminEnrollment.controller';
import { AdminEnrollmentService } from './services/adminEnrollment.service';
import { TeamLeaderChampionshipController } from './controllers/teamLeaderChampionship.controller';
import { TeamLeaderChampionshipService } from './services/teamLeaderChampionship.service';
import { TeamLeaderService } from './services/teamLeader.service';
import { TeamLeaderController } from './controllers/teamLeader.controller';
import { TeamLeaderEnrollmentController } from './controllers/teamLeaderEnrollment.controller';
import { TeamLeaderEnrollmentService } from './services/teamLeaderEnrollment.service';

@Module({
  imports: [
    PassportModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    JwtModule.registerAsync(jwtModuleAsyncOptions()),
    TypeOrmModule.forRoot(sqlClient()),
    TypeOrmModule.forFeature(entities),
  ],
  controllers: [
    AdminChampionshipController,
    AllChampionshipController,
    MatchController,
    AuthController,
    UploadFileController,
    AdminEnrollmentController,
    TeamLeaderChampionshipController,
    TeamLeaderController,
    TeamLeaderEnrollmentController,
  ],
  providers: [
    AllChampionshipService,
    AdminChampionshipService,
    TeamLeaderChampionshipService,
    TransactionService,
    MatchService,
    MatchGateway,
    ChampionshipGateway,
    ScoreChampionshipGateway,
    ScoreChampionshipService,
    ChampionshipPlayerService,
    DataService,
    EntityToDTOMapper,
    AuthService,
    UsersService,
    JwtStrategy,
    LocalStrategy,
    StorageService,
    JwtAuthGuard,
    AdminEnrollmentService,
    TeamLeaderService,
    TeamLeaderEnrollmentService,
  ],
})
export class AppModule {
  constructor(private dataService: DataService) {}

  async onModuleInit() {
    await this.dataService.initialize();
  }
}
