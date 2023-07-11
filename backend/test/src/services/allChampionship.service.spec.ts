import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'src/config/configuration';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';
import { AllChampionshipService } from 'src/services/allChampionship.service';
import { entities } from 'src/utils/entities';
import { testSqlClient } from 'test/utils/testSqlClient';
import data from '../../data/src/services/allChampionship.service.spec.data.json';
import { TransactionService } from 'src/services/transaction.service';
import { DataService } from 'test/utils/data.service';
import { StorageService } from 'src/services/storage.service';
import { championshipServiceDescribe } from './championship.service.spec.describe';
import { NotFoundException } from 'src/exceptions/NotFoundException';

describe('AllChampionshipService', () => {
  const { args, toStartChampionshipId } = data;
  let module: TestingModule;
  let dataService: DataService;
  let service: AllChampionshipService;
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
        AllChampionshipService,
        DataService,
        EntityToDTOMapper,
        TransactionService,
        StorageService,
      ],
    }).compile();
    service = module.get<AllChampionshipService>(AllChampionshipService);
    configService = module.get<ConfigService>(ConfigService);
    errors = configService.get('service.errors');
    dataService = module.get<DataService>(DataService);
    await dataService.initialize();
  });

  championshipServiceDescribe(() => module, AllChampionshipService, data);

  describe('GetChampionship', () => {
    it('should fail if not is started championship', async () => {
      await expect(
        service.getChampionship({ ...args.getChampionshipDTO, championshipId: toStartChampionshipId }),
      ).rejects.toStrictEqual(new NotFoundException(errors.notFoundChampionship));
    });
  });

  afterEach(async () => {
    await dataService.deleteAll();
    await module.close();
  });
});
