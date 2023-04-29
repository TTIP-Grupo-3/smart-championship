import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'src/config/configuration';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';
import { ChampionshipService } from 'src/services/championship.service';
import { entities } from 'src/utils/entities';
import { testSqlClient } from 'test/utils/testSqlClient';
import {
  notFoundId,
  championship,
  errors,
} from '../../data/src/services/championship.service.spec.data.json';
import { TransactionService } from 'src/services/transaction.service';
import { DataService } from 'test/utils/data.service';

describe('ChampionshipService', () => {
  let module: TestingModule;
  let service: ChampionshipService;
  let dataService: DataService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
        TypeOrmModule.forRoot(testSqlClient()),
        TypeOrmModule.forFeature(entities),
      ],
      providers: [ChampionshipService, DataService, EntityToDTOMapper, TransactionService],
    }).compile();
    service = module.get<ChampionshipService>(ChampionshipService);
    dataService = module.get<DataService>(DataService);
    await dataService.initialize();
  });

  describe('GetChampionship', () => {
    it('should get championship', async () => {
      const result = await service.getChampionship(championship.id);
      expect(result).toMatchObject(championship);
    });

    it('should fail if championship not exists', async () => {
      await expect(service.getChampionship(notFoundId)).rejects.toStrictEqual(
        new NotFoundException(errors.championshipNotFound),
      );
    });
  });

  afterEach(async () => await module.close());
});
