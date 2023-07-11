import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from 'src/config/configuration';
import { StorageService } from 'src/services/storage.service';
import { TransactionService } from 'src/services/transaction.service';
import { entities } from 'src/utils/entities';
import { DataService } from 'test/utils/data.service';
import { testSqlClient } from 'test/utils/testSqlClient';
import { args, user, usernameNotFound } from 'test/data/src/services/user.service.spec.data.json';
import { TeamLeaderService } from 'src/services/teamLeader.service';
import { UsersService } from 'src/services/user.service';
import { AuthService } from 'src/services/auth.service';
import { TeamLeaderChampionshipService } from 'src/services/teamLeaderChampionship.service';
import { JwtService } from '@nestjs/jwt';

describe('UsersService', () => {
  let module: TestingModule;
  let service: UsersService;
  let dataService: DataService;

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
    service = module.get<UsersService>(UsersService);
    dataService = module.get<DataService>(DataService);
    await dataService.initialize();
  });

  describe('FindOne', () => {
    it('should return user', async () => {
      const result = await service.findOne(args.username);
      expect(result).toMatchObject(user);
    });

    it('should not fail if user not exists', async () => {
      const result = await service.findOne(usernameNotFound);
      expect(result).toBeNull();
    });
  });

  afterEach(async () => {
    await dataService.deleteAll();
    await module.close();
  });
});
