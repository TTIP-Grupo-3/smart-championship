import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'src/config/configuration';
import { StorageService } from 'src/services/storage.service';
import { TransactionService } from 'src/services/transaction.service';
import { entities } from 'src/utils/entities';
import { DataService } from 'test/utils/data.service';
import { testSqlClient } from 'test/utils/testSqlClient';
import {
  args,
  user,
  notFoundUsername,
  incorrectPassword,
  access_token,
} from 'test/data/src/services/auth.service.spec.data.json';
import { TeamLeaderService } from 'src/services/teamLeader.service';
import { UsersService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';
import { TeamLeaderChampionshipService } from 'src/services/teamLeaderChampionship.service';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/entities/user.entity';
import { UnknownException } from 'src/exceptions/UnknownException';

describe('AuthService', () => {
  let module: TestingModule;
  let service: AuthService;
  let dataService: DataService;
  let userEntity: User;
  let jwtService: JwtService;
  let error: Error;
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
    service = module.get<AuthService>(AuthService);
    dataService = module.get<DataService>(DataService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
    error = new Error('ERROR');
    errors = configService.get('service.errors');
    userEntity = plainToInstance(User, user);
    await dataService.initialize();
  });

  describe('ValidateUser', () => {
    it('should return user', async () => {
      const result = await service.validateUser(args.username, args.password);
      expect(result).toMatchObject(user);
    });

    it('should not return user password', async () => {
      const result = await service.validateUser(args.username, args.password);
      expect(result.password).toBeNull();
    });

    it('should not fail if username not exists', async () => {
      const result = await service.validateUser(notFoundUsername, args.password);
      expect(result).toBeNull();
    });

    it('should not fail if password is incorrect', async () => {
      const result = await service.validateUser(args.username, incorrectPassword);
      expect(result).toBeNull();
    });
  });

  describe('Profile', () => {
    it('should return received user', async () => {
      const result = await service.profile(userEntity);
      expect(result).toBe(userEntity);
    });
  });

  describe('Login', () => {
    beforeEach(() => {
      jest.spyOn(jwtService, 'sign').mockReturnValue(access_token);
    });

    it('should sign user', async () => {
      const result = await service.login(userEntity);
      expect(result.access_token).toEqual(access_token);
    });

    it('should fail if sign fails', async () => {
      jest.spyOn(jwtService, 'sign').mockImplementation(() => {
        throw error;
      });
      await expect(service.login(userEntity)).rejects.toStrictEqual(new UnknownException(errors.unknown));
    });
  });

  afterEach(async () => await module.close());
});
