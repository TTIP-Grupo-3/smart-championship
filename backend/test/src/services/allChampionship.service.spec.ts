import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'src/config/configuration';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';
import { AllChampionshipService } from 'src/services/allChampionship.service';
import { entities } from 'src/utils/entities';
import { testSqlClient } from 'test/utils/testSqlClient';
import {
  args,
  notFoundId,
  championship,
  errors,
} from '../../data/src/services/allChampionship.service.spec.data.json';
import { TransactionService } from 'src/services/transaction.service';
import { DataService } from 'test/utils/data.service';
import { ChampionshipIdDTO } from 'src/dtos/championshipId.dto';
import { StorageService } from 'src/services/storage.service';

describe('AllChampionshipService', () => {
  let module: TestingModule;
  let service: AllChampionshipService;
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
    service = module.get<AllChampionshipService>(AllChampionshipService);
    dataService = module.get<DataService>(DataService);
    await dataService.initialize();
  });

  describe('GetChampionship', () => {
    it('should get championship', async () => {
      const result = await service.getChampionship(args.championshipDTO as ChampionshipIdDTO);
      expect(result).toMatchObject(championship);
    });

    it('should fail if championship not exists', async () => {
      await expect(
        service.getChampionship({
          ...args.championshipDTO,
          championshipId: notFoundId,
        } as ChampionshipIdDTO),
      ).rejects.toStrictEqual(new NotFoundException(errors.championshipNotFound));
    });
  });

  afterEach(async () => await module.close());
});