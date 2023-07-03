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
  notFoundId,
  team,
  existsId,
  createdTeam,
} from 'test/data/src/services/team.service.spec.data.json';
import { TeamLeaderService } from 'src/services/teamLeader.service';
import { UsersService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';
import { TeamLeaderChampionshipService } from 'src/services/teamLeaderChampionship.service';
import { JwtService } from '@nestjs/jwt';
import { TeamService } from 'src/services/team.service';
import { InvalidArgumentException } from 'src/exceptions/InvalidArgumentException';
import { CreateTeamDTO } from 'src/dtos/createTeam.dto';
import { plainToInstance } from 'class-transformer';

describe('TeamService', () => {
  let module: TestingModule;
  let service: TeamService;
  let dataService: DataService;
  let configService: ConfigService;
  let errors;
  let modelErrors;
  let createTeamDTO: CreateTeamDTO;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
        TypeOrmModule.forRoot(testSqlClient()),
        TypeOrmModule.forFeature(entities),
      ],
      providers: [
        TeamService,
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
    service = module.get<TeamService>(TeamService);
    configService = module.get<ConfigService>(ConfigService);
    errors = configService.get('service.errors');
    modelErrors = configService.get('model.errors');
    dataService = module.get<DataService>(DataService);
    createTeamDTO = plainToInstance(CreateTeamDTO, args.plainCreateTeamDTO);
    await dataService.initialize();
  });

  describe('GetTeam', () => {
    it('should return team', async () => {
      const result = await service.getTeam(args.id);
      expect(result).toMatchObject(team);
    });

    it('should fail if team not exists', async () => {
      await expect(service.getTeam(notFoundId)).rejects.toStrictEqual(
        new NotFoundException(errors.notFound),
      );
    });
  });

  describe('CreateTeam', () => {
    it('should return created team', async () => {
      const result = await service.createTeam(createTeamDTO, args.leaderDTO);
      expect(result).toMatchObject(createdTeam);
    });

    it('should create team', async () => {
      const result = await service.createTeam(createTeamDTO, args.leaderDTO);
      const team = await service.getTeam(result.id);
      expect(result).toMatchObject(team);
    });

    it('should fail if team leader not exists', async () => {
      await expect(
        service.createTeam(createTeamDTO, { ...args.leaderDTO, id: notFoundId }),
      ).rejects.toStrictEqual(new NotFoundException(errors.notFound));
    });

    it('should fail if team leader already has team', async () => {
      await expect(
        service.createTeam(createTeamDTO, { ...args.leaderDTO, id: existsId }),
      ).rejects.toStrictEqual(new InvalidArgumentException(modelErrors.teamAlreadyCreated));
    });
  });

  afterEach(async () => await module.close());
});
