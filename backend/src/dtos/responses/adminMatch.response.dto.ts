import { Phase } from 'src/entities/phase.entity';
import { ResponseDTOFactory } from './factories/response.dto.factory';
import { Match } from 'src/entities/match.entity';
import { UserRequestInfo } from 'src/utils/types';
import { PhaseResponseDTO } from './phase.response.dto';
import { PartialMatchResponseDTO } from './partialMatch.response.dto';
import { SmartChampionshipDTO } from 'src/utils/dtos';
import { UnknownException } from 'src/exceptions/UnknownException';
import { configService } from 'src/services/config.service';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';

const errors = configService.get('service.errors');

export class AdminMatchResponseDTO extends ResponseDTOFactory {
  static from(
    source: Match | Phase,
    request: UserRequestInfo,
    mapper: EntityToDTOMapper,
  ): SmartChampionshipDTO {
    if (source instanceof Match) return mapper.map(source, request, PartialMatchResponseDTO);
    if (source instanceof Phase) return mapper.map(source, request, PhaseResponseDTO);
    throw new UnknownException(errors.unknown);
  }
}
