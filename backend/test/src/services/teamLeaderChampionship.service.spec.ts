import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'src/config/configuration';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';
import { entities } from 'src/utils/entities';
import { testSqlClient } from 'test/utils/testSqlClient';
import data from '../../data/src/services/teamLeaderChampionship.service.spec.data.json';
import { TransactionService } from 'src/services/transaction.service';
import { DataService } from 'test/utils/data.service';
import { StorageService } from 'src/services/storage.service';
import { championshipServiceDescribe } from './championship.service.spec.describe';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { TeamLeaderChampionshipService } from 'src/services/teamLeaderChampionship.service';

describe('TeamLeaderChampionshipService', () => {
  const { args, startedChampionshipId, minimumTeamSize } = data;
  let module: TestingModule;
  let dataService: DataService;
  let service: TeamLeaderChampionshipService;
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
        TeamLeaderChampionshipService,
        DataService,
        EntityToDTOMapper,
        TransactionService,
        StorageService,
      ],
    }).compile();
    service = module.get<TeamLeaderChampionshipService>(TeamLeaderChampionshipService);
    configService = module.get<ConfigService>(ConfigService);
    errors = configService.get('service.errors');
    dataService = module.get<DataService>(DataService);
    await dataService.initialize();
  });

  championshipServiceDescribe(() => module, TeamLeaderChampionshipService, data);

  describe('GetChampionship', () => {
    it('should fail if not is to start championship', async () => {
      await expect(
        service.getChampionship({ ...args.getChampionshipDTO, championshipId: startedChampionshipId }),
      ).rejects.toStrictEqual(new NotFoundException(errors.notFoundChampionship));
    });
  });

  describe('MinimumSize', () => {
    it('should return minimum team size', async () => {
      const result = await service.minimumSize();
      expect(result).toEqual(minimumTeamSize);
    });
  });

  afterEach(async () => {
    await dataService.deleteAll();
    await module.close();
  });
});
