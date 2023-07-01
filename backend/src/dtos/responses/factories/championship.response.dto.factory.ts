import { Championship } from 'src/entities/championship.entity';
import { ResponseDTOFactory } from './response.dto.factory';
import { UserRequestInfo } from 'src/utils/types';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';
import { SmartChampionshipDTO } from 'src/utils/dtos';
import { EliminationChampionship } from 'src/entities/eliminationChampionship.entity';
import { ScoreChampionship } from 'src/entities/scoreChampionship.entity';
import { UnknownException } from 'src/exceptions/UnknownException';
import { configService } from 'src/services/config.service';
import { EliminationChampionshipResponseDTO } from '../eliminationChampionship.response.dto';
import { ScoreChampionshipResponseDTO } from '../scoreChampionship.response.dto';

const errors = configService.get('service.errors');

export class ChampionshipResponseDTOFactory extends ResponseDTOFactory {
  static from(
    championship: Championship,
    request: UserRequestInfo,
    mapper: EntityToDTOMapper,
  ): SmartChampionshipDTO {
    if (championship instanceof EliminationChampionship) {
      return mapper.map(championship, request, EliminationChampionshipResponseDTO);
    }
    if (championship instanceof ScoreChampionship) {
      return mapper.map(championship, request, ScoreChampionshipResponseDTO);
    }
    throw new UnknownException(errors.unknown);
  }
}
