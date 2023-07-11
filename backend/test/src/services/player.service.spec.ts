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
  players,
  args,
  notFoundId,
  withoutTeamId,
  createdPlayer,
  repeatedDni,
  repeatedNumber,
  deletedPlayers,
  notDeletedPlayers,
} from 'test/data/src/services/player.service.spec.data.json';
import { PlayerService } from 'src/services/player.service';
import { TeamLeaderService } from 'src/services/teamLeader.service';
import { UsersService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';
import { TeamLeaderChampionshipService } from 'src/services/teamLeaderChampionship.service';
import { JwtService } from '@nestjs/jwt';
import { InvalidArgumentException } from 'src/exceptions/InvalidArgumentException';

describe('ChampionshipPlayerService', () => {
  let module: TestingModule;
  let service: PlayerService;
  let dataService: DataService;
  let configService: ConfigService;
  let errors;
  let modelErrors;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
        TypeOrmModule.forRoot(testSqlClient()),
        TypeOrmModule.forFeature(entities),
      ],
      providers: [
        PlayerService,
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
    service = module.get<PlayerService>(PlayerService);
    configService = module.get<ConfigService>(ConfigService);
    errors = configService.get('service.errors');
    modelErrors = configService.get('model.errors');
    dataService = module.get<DataService>(DataService);
    await dataService.initialize();
  });

  describe('GetPlayers', () => {
    it('should get leader team players', async () => {
      const result = await service.getPlayers(args.leaderDTO);
      expect(result).toMatchObject(players);
    });

    it('should fail if team leader not exists', async () => {
      await expect(service.getPlayers({ ...args.leaderDTO, id: notFoundId })).rejects.toStrictEqual(
        new NotFoundException(errors.notFound),
      );
    });

    it('should fail if team leader has no team', async () => {
      await expect(service.getPlayers({ ...args.leaderDTO, id: withoutTeamId })).rejects.toStrictEqual(
        new NotFoundException(modelErrors.teamNotCreated),
      );
    });
  });

  describe('CreatePlayer', () => {
    it('should return created player', async () => {
      const result = await service.createPlayer(args.createPlayerDTO, args.leaderDTO);
      expect(result).toMatchObject(createdPlayer);
    });

    it('should create player', async () => {
      const result = await service.createPlayer(args.createPlayerDTO, args.leaderDTO);
      const player = (await service.getPlayers(args.leaderDTO)).find(({ id }) => id === result.id);
      expect(result).toMatchObject(player);
    });

    it('should fail if team leader not exists', async () => {
      await expect(
        service.createPlayer(args.createPlayerDTO, { ...args.leaderDTO, id: notFoundId }),
      ).rejects.toStrictEqual(new NotFoundException(errors.notFound));
    });

    it('should fail if team leader has no team', async () => {
      await expect(
        service.createPlayer(args.createPlayerDTO, { ...args.leaderDTO, id: withoutTeamId }),
      ).rejects.toStrictEqual(new NotFoundException(modelErrors.teamNotCreated));
    });

    it('should fail if player dni is repeated in team', async () => {
      await expect(
        service.createPlayer({ ...args.createPlayerDTO, dni: repeatedDni }, args.leaderDTO),
      ).rejects.toStrictEqual(new InvalidArgumentException(modelErrors.playerAlreadyExists));
    });

    it('should fail if player number is repeated in team', async () => {
      await expect(
        service.createPlayer({ ...args.createPlayerDTO, number: repeatedNumber }, args.leaderDTO),
      ).rejects.toStrictEqual(new InvalidArgumentException(modelErrors.playerAlreadyExists));
    });
  });

  describe('DeletePlayers', () => {
    it('should return deleted players', async () => {
      const result = await service.deletePlayers(args.deletePlayersDTO, args.leaderDTO);
      expect(result).toMatchObject(deletedPlayers);
    });

    it('should delete players', async () => {
      await service.deletePlayers(args.deletePlayersDTO, args.leaderDTO);
      const gotPlayers = await service.getPlayers(args.leaderDTO);
      expect(gotPlayers).toMatchObject(notDeletedPlayers);
    });
  });

  afterEach(async () => {
    await dataService.deleteAll();
    await module.close();
  });
});
