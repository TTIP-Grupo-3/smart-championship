import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'src/config/configuration';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { StorageService } from 'src/services/storage.service';
import { TransactionService } from 'src/services/transaction.service';
import { entities } from 'src/utils/entities';
import { DataService } from 'test/utils/data.service';
import { testSqlClient } from 'test/utils/testSqlClient';
import {
  args,
  statuses,
  notFoundId,
} from 'test/data/src/services/scoreChampionship.service.spec.data.json';
import { TeamLeaderService } from 'src/services/teamLeader.service';
import { UsersService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';
import { TeamLeaderChampionshipService } from 'src/services/teamLeaderChampionship.service';
import { JwtService } from '@nestjs/jwt';
import { ScoreChampionshipService } from 'src/services/scoreChampionship.service';

describe('ScoreChampionshipService', () => {
  let module: TestingModule;
  let service: ScoreChampionshipService;
  let dataService: DataService;
  let configService: ConfigService;
  let errors;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
        TypeOrmModule.forRoot(testSqlClient()),
        TypeOrmModule.forFeature(entities),
      ],
      providers: [
        ScoreChampionshipService,
        TeamLeaderService,
        UsersService,
        AuthService,
        TeamLeaderChampionshipService,
        JwtService,
        DataService,
        TransactionService,
        StorageService,
      ],
    }).compile();
    service = module.get<ScoreChampionshipService>(ScoreChampionshipService);
    configService = module.get<ConfigService>(ConfigService);
    errors = configService.get('service.errors');
    dataService = module.get<DataService>(DataService);
    await dataService.initialize();
  });

  describe('GetTeamStatuses', () => {
    it('should return championship teams score statuses', async () => {
      const result = await service.getTeamStatuses(args.getTeamStatusesDTO);
      expect(result).toMatchObject(statuses);
    });

    it('should fail if score championship not exists', async () => {
      await expect(
        service.getTeamStatuses({ ...args.getTeamStatusesDTO, championshipId: notFoundId }),
      ).rejects.toStrictEqual(new NotFoundException(errors.notFound));
    });
  });

  afterEach(async () => {
    await dataService.deleteAll();
    await module.close();
  });
});
