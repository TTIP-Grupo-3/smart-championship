import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ResponseDTOFactory } from 'src/dtos/responses/factories/response.dto.factory';
import { EntityToDTOMapper, ResponseDTOFactoryClass } from 'src/mappers/EntityToDTOMapper';
import { SmartChampionshipDTO } from 'src/utils/dtos';
import { SmartChampionshipEntity } from 'src/utils/entities';
import { getRequest } from 'src/utils/executionContext';
import { MaybeArray } from 'src/utils/types';

export class TransformInterceptor<T extends MaybeArray<SmartChampionshipEntity>>
  implements NestInterceptor<T, MaybeArray<SmartChampionshipDTO>>
{
  private mapper: EntityToDTOMapper = new EntityToDTOMapper();

  constructor(
    private dtoCls?: ResponseDTOFactoryClass<
      SmartChampionshipEntity,
      SmartChampionshipDTO,
      ResponseDTOFactory
    >,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<MaybeArray<SmartChampionshipDTO>> {
    return next.handle().pipe(map((data) => this.mapper.map(data, getRequest(context), this.dtoCls)));
  }
}
