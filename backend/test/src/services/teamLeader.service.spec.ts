import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'src/config/configuration';
import { StorageService } from 'src/services/storage.service';
import { TransactionService } from 'src/services/transaction.service';
import { entities } from 'src/utils/entities';
import { DataService } from 'test/utils/data.service';
import { testSqlClient } from 'test/utils/testSqlClient';
import {
  args,
  notFoundId,
  teamLeader,
  createdTeamLeader,
  existsUsername,
} from 'test/data/src/services/teamLeader.service.spec.data.json';
import { TeamLeaderService } from 'src/services/teamLeader.service';
import { UsersService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';
import { TeamLeaderChampionshipService } from 'src/services/teamLeaderChampionship.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { InvalidArgumentException } from 'src/exceptions/InvalidArgumentException';
import { JwtStrategy } from 'src/strategies/jwt.startegy';
import { LocalStrategy } from 'src/strategies/local.strategy';
import { JwtAuthGuard } from 'src/guards/jwtAuth.guard';
import { PassportModule } from '@nestjs/passport';
import { jwtModuleAsyncOptions } from 'src/options/jwtModuleAsync.options';
import { mock } from 'test/utils/tests';

describe('TeamLeaderService', () => {
  let module: TestingModule;
  let service: TeamLeaderService;
  let dataService: DataService;
  let configService: ConfigService;
  let errors;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.registerAsync(jwtModuleAsyncOptions()),
        ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
        TypeOrmModule.forRoot(testSqlClient()),
        TypeOrmModule.forFeature(entities),
      ],
      providers: [
        TeamLeaderService,
        UsersService,
        AuthService,
        TeamLeaderChampionshipService,
        JwtService,
        JwtStrategy,
        LocalStrategy,
        JwtAuthGuard,
        DataService,
        TransactionService,
        StorageService,
      ],
    })
      .overrideProvider(JwtService)
      .useValue(mock(JwtService))
      .compile();
    service = module.get<TeamLeaderService>(TeamLeaderService);
    configService = module.get<ConfigService>(ConfigService);
    errors = configService.get('service.errors');
    dataService = module.get<DataService>(DataService);
    await dataService.initialize();
  });

  describe('GetTeamLeader', () => {
    it('should return team leader', async () => {
      const result = await service.getTeamLeader(args.getTeamLeaderDTO);
      expect(result).toMatchObject(teamLeader);
    });

    it('should fail if team leader not exists', async () => {
      await expect(
        service.getTeamLeader({ ...args.getTeamLeaderDTO, id: notFoundId }),
      ).rejects.toStrictEqual(new NotFoundException(errors.notFound));
    });
  });

  describe('CreateTeamLeader', () => {
    it('should return created team leader', async () => {
      const result = await service.createTeamLeader(args.createTeamLeaderDTO);
      expect(result).toMatchObject(createdTeamLeader);
    });

    it('should create team leader', async () => {
      const result = await service.createTeamLeader(args.createTeamLeaderDTO);
      const leader = await service.getTeamLeader({ id: result.id });
      expect(leader).toMatchObject(createdTeamLeader);
    });

    it('should fail if username already exists', async () => {
      await expect(
        service.createTeamLeader({ ...args.createTeamLeaderDTO, username: existsUsername }),
      ).rejects.toStrictEqual(new InvalidArgumentException(errors.alreadyExists));
    });
  });

  afterEach(async () => {
    await dataService.deleteAll();
    await module.close();
  });
});
