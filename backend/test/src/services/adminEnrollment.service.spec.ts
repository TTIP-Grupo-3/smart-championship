import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'src/config/configuration';
import { StorageService } from 'src/services/storage.service';
import { TransactionService } from 'src/services/transaction.service';
import { entities } from 'src/utils/entities';
import { DataService } from 'test/utils/data.service';
import { testSqlClient } from 'test/utils/testSqlClient';
import data from 'test/data/src/services/adminEnrollment.service.spec.data.json';
import { TeamLeaderService } from 'src/services/teamLeader.service';
import { UsersService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';
import { TeamLeaderChampionshipService } from 'src/services/teamLeaderChampionship.service';
import { JwtService } from '@nestjs/jwt';
import { AdminEnrollmentService } from 'src/services/adminEnrollment.service';
import { enrollmentServiceDescribe } from './enrollment.service.spec.describe';
import { AdminChampionshipService } from 'src/services/adminChampionship.service';
import { TeamService } from 'src/services/team.service';
import { PayStatus } from 'src/enums/payStatus.enum';
import { NotFoundException } from 'src/exceptions/NotFoundException';

describe('AdminEnrollmentService', () => {
  const { notFoundId, args, acceptedEnrollment, rejectedEnrollment, notAdminId } = data;
  let module: TestingModule;
  let service: AdminEnrollmentService;
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
        TeamService,
        AdminChampionshipService,
        AdminEnrollmentService,
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
    service = module.get<AdminEnrollmentService>(AdminEnrollmentService);
    configService = module.get<ConfigService>(ConfigService);
    errors = configService.get('service.errors');
    dataService = module.get<DataService>(DataService);
    await dataService.initialize();
  });

  enrollmentServiceDescribe(() => module, AdminEnrollmentService, data);

  describe('AcceptEnrollment', () => {
    it('should return accepted enrollment', async () => {
      const result = await service.acceptEnrollment(args.acceptEnrollmentDTO);
      expect(result).toMatchObject(acceptedEnrollment);
    });

    it('should accept enrollment', async () => {
      const result = await service.acceptEnrollment(args.acceptEnrollmentDTO);
      const enrollment = await service.getEnrollment({ ...args.acceptEnrollmentDTO, id: result.id });
      expect(enrollment.status).toEqual(PayStatus.Paid);
    });

    it('should fail if is not admin enrollment', async () => {
      await expect(
        service.acceptEnrollment({ ...args.acceptEnrollmentDTO, id: notAdminId }),
      ).rejects.toStrictEqual(new NotFoundException(errors.notFound));
    });

    it('should fail if enrollment not exists', async () => {
      await expect(
        service.acceptEnrollment({ ...args.acceptEnrollmentDTO, id: notFoundId }),
      ).rejects.toStrictEqual(new NotFoundException(errors.notFound));
    });

    it('should fail if championship not exists', async () => {
      await expect(
        service.acceptEnrollment({ ...args.acceptEnrollmentDTO, championshipId: notFoundId }),
      ).rejects.toStrictEqual(new NotFoundException(errors.notFoundChampionship));
    });
  });

  describe('RejectEnrollment', () => {
    it('should return rejected enrollment', async () => {
      const result = await service.rejectEnrollment(args.rejectEnrollmentDTO);
      expect(result).toMatchObject(rejectedEnrollment);
    });

    it('should reject enrollment', async () => {
      const result = await service.rejectEnrollment(args.rejectEnrollmentDTO);
      const enrollment = await service.getEnrollment({ ...args.rejectEnrollmentDTO, id: result.id });
      expect(enrollment.status).toEqual(PayStatus.Rejected);
    });

    it('should fail if is not admin enrollment', async () => {
      await expect(
        service.rejectEnrollment({ ...args.rejectEnrollmentDTO, id: notAdminId }),
      ).rejects.toStrictEqual(new NotFoundException(errors.notFound));
    });

    it('should fail if enrollment not exists', async () => {
      await expect(
        service.rejectEnrollment({ ...args.rejectEnrollmentDTO, id: notFoundId }),
      ).rejects.toStrictEqual(new NotFoundException(errors.notFound));
    });

    it('should fail if championship not exists', async () => {
      await expect(
        service.rejectEnrollment({ ...args.rejectEnrollmentDTO, championshipId: notFoundId }),
      ).rejects.toStrictEqual(new NotFoundException(errors.notFoundChampionship));
    });
  });

  afterEach(async () => {
    await dataService.deleteAll();
    await module.close();
  });
});
