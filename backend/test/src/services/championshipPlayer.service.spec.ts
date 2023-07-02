import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'src/config/configuration';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { ChampionshipPlayerService } from 'src/services/championshipPlayer.service';
import { StorageService } from 'src/services/storage.service';
import { TransactionService } from 'src/services/transaction.service';
import { entities } from 'src/utils/entities';
import { DataService } from 'test/utils/data.service';
import { testSqlClient } from 'test/utils/testSqlClient';
import { player, args, notFoundId } from 'test/data/src/services/championshipPlayer.spec.data.service.json';

describe('ChampionshipPlayerService', () => {
  let module: TestingModule;
  let service: ChampionshipPlayerService;
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
      providers: [ChampionshipPlayerService, DataService, TransactionService, StorageService],
    }).compile();
    service = module.get<ChampionshipPlayerService>(ChampionshipPlayerService);
    configService = module.get<ConfigService>(ConfigService);
    errors = configService.get('service.errors');
    dataService = module.get<DataService>(DataService);
    await dataService.initialize();
  });

  describe('FindOne', () => {
    it('should get championship player', async () => {
      const result = await service.findOne(args.id);
      expect(result).toMatchObject(player);
    });

    it('should fail if championship player not exists', async () => {
      await expect(service.findOne(notFoundId)).rejects.toStrictEqual(
        new NotFoundException(errors.notFound),
      );
    });
  });

  afterEach(async () => await module.close());
});
