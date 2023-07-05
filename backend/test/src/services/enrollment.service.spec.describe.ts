import { ConfigService } from '@nestjs/config';
import { TestingModule } from '@nestjs/testing';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { EnrollmentService } from 'src/services/enrollment.service';
import { Class } from 'src/utils/types';

export function enrollmentServiceDescribe(
  getModule: () => TestingModule,
  ServiceClass: Class<EnrollmentService>,
  data,
) {
  const { args, enrollment, notFoundId, existentEnrollments } = data;
  let module: TestingModule;
  let service: EnrollmentService;
  let configService: ConfigService;
  let errors;

  function sort<T extends { id: number }>(array: Array<T>): Array<T> {
    return array.sort((a, b) => a.id - b.id);
  }

  beforeEach(() => {
    module = getModule();
    configService = module.get<ConfigService>(ConfigService);
    service = module.get<EnrollmentService>(ServiceClass);
    errors = configService.get('service.errors');
  });

  describe('EnrollmentService', () => {
    describe('GetEnrollment', () => {
      it('should return team enrollment', async () => {
        const result = await service.getEnrollment(args.getEnrollmentDTO);
        expect(result).toMatchObject(enrollment);
      });

      it('should fail if team enrollment not exists', async () => {
        await expect(
          service.getEnrollment({ ...args.getEnrollmentDTO, id: notFoundId }),
        ).rejects.toStrictEqual(new NotFoundException(errors.notFound));
      });

      it('should fail if championship not exists', async () => {
        await expect(
          service.getEnrollment({ ...args.getEnrollmentDTO, championshipId: notFoundId }),
        ).rejects.toStrictEqual(new NotFoundException(errors.championshipNotFound));
      });
    });

    describe('GetEnrollments', () => {
      it('should return existent team enrollments', async () => {
        const result = await service.getEnrollments(args.getEnrollmentsDTO);
        expect(sort(result)).toMatchObject(sort(existentEnrollments));
      });

      it('should fail if championship not exists', async () => {
        await expect(
          service.getEnrollments({ ...args.getEnrollmentsDTO, championshipId: notFoundId }),
        ).rejects.toStrictEqual(new NotFoundException(errors.notFoundChampionship));
      });
    });
  });
}
