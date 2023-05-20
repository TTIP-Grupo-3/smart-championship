import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ChampionshipController } from 'src/controllers/championship.controller';
import { ChampionshipService } from 'src/services/championship.service';
import { Methods } from 'src/utils/types';
import { getMethods, mock } from 'test/utils/tests';
import { args } from '../../data/src/controllers/championship.controller.spec.data.json';

describe('ChampionshipController', () => {
  let module: TestingModule;
  let controller: ChampionshipController;
  let service: ChampionshipService;

  const methods = getMethods(ChampionshipController);

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [ChampionshipController],
      providers: [ChampionshipService],
    })
      .overrideProvider(ChampionshipService)
      .useValue(mock(ChampionshipService))
      .compile();
    controller = module.get<ChampionshipController>(ChampionshipController);
    service = module.get<ChampionshipService>(ChampionshipService);
  });

  methods.forEach((method: Methods<ChampionshipController>) => {
    it(`${method} should be called on service`, async () => {
      await controller[method](args[method]);
      expect(service[method]).toBeCalled();
    });
  });

  afterEach(async () => await module.close());
});
