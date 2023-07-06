import { ConfigModule } from '@nestjs/config';
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

describe('AllChampionshipService', () => {
  let module: TestingModule;
  let dataService: DataService;

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
    dataService = module.get<DataService>(DataService);
    await dataService.initialize();
  });

  championshipServiceDescribe(() => module, AllChampionshipService, data);

  afterEach(async () => await module.close());
});
