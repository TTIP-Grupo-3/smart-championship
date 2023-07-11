import { ConfigService } from '@nestjs/config';
import { TestingModule } from '@nestjs/testing';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { ChampionshipService } from 'src/services/championship.service';
import { Class } from 'src/utils/types';

export function championshipServiceDescribe(
  getModule: () => TestingModule,
  ServiceClass: Class<ChampionshipService>,
  data,
) {
  const { args, championship, notFoundId, existentChampionships } = data;
  let module: TestingModule;
  let service: ChampionshipService;
  let configService: ConfigService;
  const championships = setDates(existentChampionships);
  let errors;

  function setDates(championships) {
    return championships.map(({ start, date, ...existentChampionship }) => ({
      ...existentChampionship,
      start: start ? new Date(start) : null,
      date: date ? new Date(date) : null,
    }));
  }

  function sort<T extends { id: number }>(array: Array<T>): Array<T> {
    return array.sort((a, b) => a.id - b.id);
  }

  describe('ChampionshipService', () => {
    beforeEach(() => {
      module = getModule();
      configService = module.get<ConfigService>(ConfigService);
      service = module.get<ChampionshipService>(ServiceClass);
      errors = configService.get('service.errors');
    });

    describe('GetChampionship', () => {
      it('should return championship', async () => {
        const result = await service.getChampionship(args.getChampionshipDTO);
        expect(result).toMatchObject(championship);
      });

      it('should fail if championship not exists', async () => {
        await expect(
          service.getChampionship({ ...args.getChampionshipDTO, championshipId: notFoundId }),
        ).rejects.toStrictEqual(new NotFoundException(errors.notFoundChampionship));
      });
    });

    describe('GetChampionships', () => {
      it('should return existent championships', async () => {
        const result = await service.getChampionships();
        expect(sort(result)).toMatchObject(sort(championships));
      });
    });
  });
}
