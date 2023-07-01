import { UnknownException } from 'src/exceptions/UnknownException';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';
import { configService } from 'src/services/config.service';
import { SmartChampionshipDTO } from 'src/utils/dtos';
import { SmartChampionshipEntity } from 'src/utils/entities';
import { MaybeArray, UserRequestInfo } from 'src/utils/types';

const errors = configService.get('service.errors');

export abstract class ResponseDTOFactory {
  static from(
    entity: SmartChampionshipEntity,
    request: UserRequestInfo,
    mapper: EntityToDTOMapper,
  ): MaybeArray<SmartChampionshipDTO> {
    throw new UnknownException(errors.unknown);
  }
}
