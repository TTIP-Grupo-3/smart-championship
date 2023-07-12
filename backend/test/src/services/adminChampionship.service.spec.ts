import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'src/config/configuration';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';
import { entities } from 'src/utils/entities';
import { testSqlClient } from 'test/utils/testSqlClient';
import data from '../../data/src/services/adminChampionship.service.spec.data.json';
import { TransactionService } from 'src/services/transaction.service';
import { DataService } from 'test/utils/data.service';
import { StorageService } from 'src/services/storage.service';
import { championshipServiceDescribe, setDates } from './championship.service.spec.describe';
import { AdminChampionshipService } from 'src/services/adminChampionship.service';
import { plainToInstance } from 'class-transformer';
import { CreateChampionshipDTO } from 'src/dtos/createChampionship.dto';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { InvalidArgumentException } from 'src/exceptions/InvalidArgumentException';
import { EditChampionshipDTO } from 'src/dtos/editChampionship.dto';
import { AdminEnrollmentService } from 'src/services/adminEnrollment.service';
import { TeamService } from 'src/services/team.service';
import { TeamLeaderService } from 'src/services/teamLeader.service';
import { UsersService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';
import { TeamLeaderChampionshipService } from 'src/services/teamLeaderChampionship.service';
import { JwtService } from '@nestjs/jwt';
import { AdminMatchService } from 'src/services/adminMatch.service';

describe('AdminChampionshipService', () => {
  const {
    args,
    plainCreatedChampionship,
    startedChampionshipId,
    notFoundId,
    editedName,
    championship: plainChampionship,
    plainEditedChampionship,
    startedChampionship,
  } = data;
  const createChampionshipDTO = plainToInstance(CreateChampionshipDTO, args.createChampionshipDTO);
  const editChampionshipDTO = plainToInstance(EditChampionshipDTO, args.editChampionshipDTO);
  const createdChampionship = setDates(plainCreatedChampionship)[0];
  const championship = setDates(plainChampionship)[0];
  const editedChampionship = setDates(plainEditedChampionship)[0];
  let module: TestingModule;
  let service: AdminChampionshipService;
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
        AdminChampionshipService,
        AdminEnrollmentService,
        TeamService,
        TeamLeaderService,
        UsersService,
        AuthService,
        AdminMatchService,
        TeamLeaderChampionshipService,
        JwtService,
        DataService,
        EntityToDTOMapper,
        TransactionService,
        StorageService,
      ],
    }).compile();
    service = module.get<AdminChampionshipService>(AdminChampionshipService);
    configService = module.get<ConfigService>(ConfigService);
    errors = configService.get('service.errors');
    dataService = module.get<DataService>(DataService);
    await dataService.initialize();
  });

  championshipServiceDescribe(() => module, AdminChampionshipService, data);

  describe('CreateChampionship', () => {
    it('should return created championship', async () => {
      const result = await service.createChampionship(createChampionshipDTO);
      expect(result).toMatchObject(createdChampionship);
    });

    it('should create championship', async () => {
      const result = await service.createChampionship(createChampionshipDTO);
      const championship = await service.getChampionship({
        ...args.getChampionshipDTO,
        championshipId: result.id,
      });
      expect(championship).toMatchObject(createdChampionship);
    });
  });

  describe('EditChampionship', () => {
    it('should return edited championship', async () => {
      const result = await service.editChampionship(args.championshipIdDTO, editChampionshipDTO);
      expect(result).toMatchObject(editedChampionship);
    });

    it('should edit championship', async () => {
      await service.editChampionship(args.championshipIdDTO, editChampionshipDTO);
      const championship = await service.getChampionship(args.championshipIdDTO);
      expect(championship).toMatchObject(editedChampionship);
    });

    it('should edit passed attributes', async () => {
      const result = await service.editChampionship(
        args.championshipIdDTO,
        plainToInstance(EditChampionshipDTO, { name: editedName }),
      );
      expect(result).toMatchObject({ ...championship, name: editedName });
    });

    it('should fail if championship not exists', async () => {
      await expect(
        service.editChampionship(
          { ...args.championshipIdDTO, championshipId: notFoundId },
          editChampionshipDTO,
        ),
      ).rejects.toStrictEqual(new NotFoundException(errors.notFoundChampionship));
    });

    it('should fail if is started championship', async () => {
      await expect(
        service.editChampionship(
          { ...args.championshipIdDTO, championshipId: startedChampionshipId },
          editChampionshipDTO,
        ),
      ).rejects.toStrictEqual(new InvalidArgumentException());
    });
  });

  describe('StartChampionship', () => {
    let adminEnrollmentService: AdminEnrollmentService;
    let adminMatchService: AdminMatchService;

    beforeEach(async () => {
      adminEnrollmentService = module.get<AdminEnrollmentService>(AdminEnrollmentService);
      adminMatchService = module.get<AdminMatchService>(AdminMatchService);
      const transactionService = module.get<TransactionService>(TransactionService);
      await transactionService.transaction(async (manager) => {
        for (const id of [1, 13, 14, 15]) {
          await adminEnrollmentService.acceptEnrollment({ ...args.startChampionshipDTO, id }, manager);
        }
        const championship = await service.getChampionship(args.startChampionshipDTO, manager);
        await adminMatchService.setMatchDates(
          { matchDates: championship.matches.map(({ id }) => ({ id, date: new Date() })) },
          args.startChampionshipDTO,
          manager,
        );
      });
    });

    it('should return started championship', async () => {
      const result = await service.startChampionship(args.startChampionshipDTO);
      expect(result).toMatchObject(startedChampionship);
    });

    it('should start championship', async () => {
      await service.startChampionship(args.startChampionshipDTO);
      const championship = await service.getChampionship(args.startChampionshipDTO);
      expect(championship.start).not.toBeNull();
    });

    it('should fail if championship not exists', async () => {
      await expect(
        service.startChampionship({ ...args.startChampionshipDTO, championshipId: notFoundId }),
      ).rejects.toStrictEqual(new NotFoundException(errors.notFoundChampionship));
    });
  });

  afterEach(async () => {
    await dataService.deleteAll();
    await module.close();
  });
});
