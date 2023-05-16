import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from 'src/app.module';
import { params, championship, SECRET } from '../../data/e2e/championship/championship.e2e-spec.data.json';

describe('ChampionshipController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    process.env.JWT_SECRET = SECRET;
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
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
