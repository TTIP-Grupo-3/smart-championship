import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'src/config/configuration';
import { StorageService } from 'src/services/storage.service';
import { TransactionService } from 'src/services/transaction.service';
import { entities } from 'src/utils/entities';
import { DataService } from 'test/utils/data.service';
import { testSqlClient } from 'test/utils/testSqlClient';
import data from 'test/data/src/services/teamLeaderEnrollment.service.spec.data.json';
import { TeamLeaderService } from 'src/services/teamLeader.service';
import { UsersService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';
import { TeamLeaderChampionshipService } from 'src/services/teamLeaderChampionship.service';
import { JwtService } from '@nestjs/jwt';
import { enrollmentServiceDescribe } from './enrollment.service.spec.describe';
import { TeamService } from 'src/services/team.service';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { TeamLeaderEnrollmentService } from 'src/services/teamLeaderEnrollment.service';
import { TeamLeader } from 'src/entities/teamLeader.entity';
import { plainToInstance } from 'class-transformer';
import { UploadReceiptDTO } from 'src/dtos/uploadReceipt.dto';

describe('TeamLeaderEnrollmentService', () => {
  const {
    notFoundId,
    args,
    plainTeamLeader,
    otherUserEnrollmentId,
    enrollment,
    plainEnrolledLeader,
    createdEnrollment,
    uploadedReceiptEnrollment,
    plainReceiptLeader,
  } = data;
  let module: TestingModule;
  let service: TeamLeaderEnrollmentService;
  let dataService: DataService;
  let configService: ConfigService;
  let teamLeader: TeamLeader;
  let enrolledLeader: TeamLeader;
  let receiptLeader: TeamLeader;
  let uploadReceiptDTO: UploadReceiptDTO;
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
        TeamLeaderEnrollmentService,
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
    service = module.get<TeamLeaderEnrollmentService>(TeamLeaderEnrollmentService);
    configService = module.get<ConfigService>(ConfigService);
    errors = configService.get('service.errors');
    teamLeader = plainToInstance(TeamLeader, plainTeamLeader);
    enrolledLeader = plainToInstance(TeamLeader, plainEnrolledLeader);
    receiptLeader = plainToInstance(TeamLeader, plainReceiptLeader);
    uploadReceiptDTO = plainToInstance(UploadReceiptDTO, args.uploadReceiptDTO);
    dataService = module.get<DataService>(DataService);
    await dataService.initialize();
  });

  enrollmentServiceDescribe(() => module, TeamLeaderEnrollmentService, data);

  describe('GetLeaderEnrollment', () => {
    it('should return enrollment', async () => {
      const result = await service.getLeaderEnrollment(args.getEnrollmentDTO, teamLeader);
      expect(result).toMatchObject(enrollment);
    });

    it("should fail if is not leader's enrollment", async () => {
      await expect(
        service.getLeaderEnrollment({ ...args.getEnrollmentDTO, id: otherUserEnrollmentId }, teamLeader),
      ).rejects.toStrictEqual(new NotFoundException(errors.notFound));
    });

    it('should fail if enrollment not exists', async () => {
      await expect(
        service.getLeaderEnrollment({ ...args.getEnrollmentDTO, id: notFoundId }, teamLeader),
      ).rejects.toStrictEqual(new NotFoundException(errors.notFound));
    });
  });

  describe('Enroll', () => {
    it('should return created team enrollment', async () => {
      const result = await service.enroll(args.enrollDTO, args.leaderDTO);
      expect(result).toMatchObject(createdEnrollment);
    });

    it('should create team enrollment', async () => {
      const result = await service.enroll(args.enrollDTO, args.leaderDTO);
      const enrollment = await service.getLeaderEnrollment(
        { ...args.enrollDTO, id: result.id },
        enrolledLeader,
      );
      expect(enrollment).toMatchObject(createdEnrollment);
    });

    it('should fail if leader not exists', async () => {
      await expect(
        service.enroll(args.enrollDTO, { ...args.leaderDTO, id: notFoundId }),
      ).rejects.toStrictEqual(new NotFoundException(errors.notFound));
    });

    it('should fail if championship not exists', async () => {
      await expect(
        service.enroll({ ...args.enrollDTO, championshipId: notFoundId }, args.leaderDTO),
      ).rejects.toStrictEqual(new NotFoundException(errors.notFoundChampionship));
    });
  });

  describe('UploadReceipt', () => {
    it('should return enrollment eith uploaded receipt', async () => {
      const result = await service.uploadReceipt(args.toPayEnrollmentDTO, uploadReceiptDTO, receiptLeader);
      expect(result).toMatchObject(uploadedReceiptEnrollment);
    });

    it('should upload receipt', async () => {
      const result = await service.uploadReceipt(args.toPayEnrollmentDTO, uploadReceiptDTO, receiptLeader);
      const enrollment = await service.getLeaderEnrollment(
        { ...args.toPayEnrollmentDTO, id: result.id },
        receiptLeader,
      );
      expect(enrollment).toMatchObject(uploadedReceiptEnrollment);
    });

    it('should fail if enrollment not exists', async () => {
      await expect(
        service.uploadReceipt(
          { ...args.toPayEnrollmentDTO, id: notFoundId },
          uploadReceiptDTO,
          receiptLeader,
        ),
      ).rejects.toStrictEqual(new NotFoundException(errors.notFound));
    });

    it("should fail if is not leader's enrollment", async () => {
      await expect(
        service.uploadReceipt(args.toPayEnrollmentDTO, uploadReceiptDTO, teamLeader),
      ).rejects.toStrictEqual(new NotFoundException(errors.notFound));
    });
  });

  afterEach(async () => await module.close());
});
