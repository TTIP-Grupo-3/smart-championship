import { Injectable } from '@nestjs/common/decorators';
import { UnknownException } from 'src/exceptions/UnknownException';
import { configService } from 'src/services/config.service';
import { SmartChampionshipDTO } from 'src/utils/dtos';
import { SmartChampionshipEntity } from 'src/utils/entities';
import { MaybeArray, UserRequestInfo } from 'src/utils/types';
import { Mapper } from './Mapper';
import { ResponseDTOFactory } from 'src/dtos/responses/factories/response.dto.factory';

const errors = configService.get('service.errors');

export type ResponseDTOFactoryClass<
  T extends SmartChampionshipEntity,
  R extends SmartChampionshipDTO,
  F extends ResponseDTOFactory,
> = {
  new (...args: any[]): F;
  from: (entity: T, request: UserRequestInfo, mapper: EntityToDTOMapper) => MaybeArray<R>;
};

@Injectable()
export class EntityToDTOMapper extends Mapper<SmartChampionshipEntity, SmartChampionshipDTO> {
  map<T extends SmartChampionshipEntity, R extends SmartChampionshipDTO, F extends ResponseDTOFactory>(
    source: T,
    request?: UserRequestInfo,
    dtoCls?: ResponseDTOFactoryClass<T, R, F>,
  ): R;
  map<T extends SmartChampionshipEntity, R extends SmartChampionshipDTO, F extends ResponseDTOFactory>(
    source: Array<T>,
    request?: UserRequestInfo,
    dtoCls?: ResponseDTOFactoryClass<T, R, F>,
  ): Array<R>;
  map(
    source: MaybeArray<SmartChampionshipEntity>,
    request: UserRequestInfo = {},
    dtoCls?: ResponseDTOFactoryClass<SmartChampionshipEntity, SmartChampionshipDTO, ResponseDTOFactory>,
  ): MaybeArray<SmartChampionshipDTO> {
    if (!dtoCls) throw new UnknownException(errors.unknown);
    if (source instanceof Array) return source.map((source) => this.map(source, request, dtoCls));
    return dtoCls.from(source, request, this);
  }
}
