import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import configuration from 'src/config/configuration';
import { EliminationChampionshipResponseDTO } from 'src/dtos/responses/eliminationChampionship.response.dto';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';
import { ChampionshipService } from 'src/services/championship.service';
import { DataService } from 'src/services/data.service';
import { entities } from 'src/utils/entities';
import { testSqlClient } from 'test/utils/testSqlClient';
import {
  notFoundId,
  championship,
  errors,
} from '../../data/src/services/championship.service.spec.data.json';

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
      providers: [ChampionshipService, DataService, EntityToDTOMapper],
    }).compile();
    service = module.get<ChampionshipService>(ChampionshipService);
    dataService = module.get<DataService>(DataService);
    await dataService.initialize();
  });

  describe('GetChampionship', () => {
    it('should get championship', async () => {
      const result = await service.getChampionship(championship.id);
      expect(result).toStrictEqual(plainToInstance(EliminationChampionshipResponseDTO, championship));
    });

    it('should fail if championship not exists', async () => {
      await expect(service.getChampionship(notFoundId)).rejects.toStrictEqual(
        new NotFoundException(errors.championshipNotFound),
      );
    });
  });

  afterEach(async () => await module.close());
});
