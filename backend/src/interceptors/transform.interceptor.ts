import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';
import { SmartChampionshipDTO } from 'src/utils/dtos';
import { SmartChampionshipEntity } from 'src/utils/entities';
import { Class, MaybeArray } from 'src/utils/types';

export class TransformInterceptor<T extends MaybeArray<SmartChampionshipEntity>>
  implements NestInterceptor<T, MaybeArray<SmartChampionshipDTO>>
{
  private mapper: EntityToDTOMapper = new EntityToDTOMapper();

  constructor(private dtoCls?: Class<SmartChampionshipDTO>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<MaybeArray<SmartChampionshipDTO>> {
    return next.handle().pipe(map((data) => this.mapper.map(data, this.dtoCls)));
  }
}
