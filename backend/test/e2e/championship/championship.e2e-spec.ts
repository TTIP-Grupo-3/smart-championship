import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from 'src/app.module';
import { params, championship } from '../../data/e2e/championship/championship.e2e-spec.data.json';
import { StorageService } from 'src/services/storage.service';
import { mock } from 'test/utils/tests';

describe('ChampionshipController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(StorageService)
      .useValue(mock(StorageService))
      .compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Championship', () => {
    it('should return championship data', async () => {
      return await request(app.getHttpServer())
        .get(`/championship/${params.championship.championshipId}`)
        .expect(200)
        .then(({ body }) => expect(body).toStrictEqual(championship));
    });
  });

  afterEach(async () => await app.close());
});
