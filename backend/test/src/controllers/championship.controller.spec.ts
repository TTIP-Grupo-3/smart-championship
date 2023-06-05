import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AllChampionshipController } from 'src/controllers/allChampionship.controller';
import { AllChampionshipService } from 'src/services/allChampionship.service';
import { Methods } from 'src/utils/types';
import { getMethods, mock } from 'test/utils/tests';
import { args } from '../../data/src/controllers/championship.controller.spec.data.json';

describe('ChampionshipController', () => {
  let module: TestingModule;
  let controller: AllChampionshipController;
  let service: AllChampionshipService;

  const methods = getMethods(AllChampionshipController);

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [AllChampionshipController],
      providers: [AllChampionshipService],
    })
      .overrideProvider(AllChampionshipService)
      .useValue(mock(AllChampionshipService))
      .useMocker(mock)
      .compile();
    controller = module.get<AllChampionshipController>(AllChampionshipController);
    service = module.get<AllChampionshipService>(AllChampionshipService);
  });

  methods.forEach((method: Methods<AllChampionshipController>) => {
    it(`${method} should be called on service`, async () => {
      await controller[method](args[method]);
      expect(service[method]).toBeCalled();
    });
  });

  afterEach(async () => await module.close());
});
