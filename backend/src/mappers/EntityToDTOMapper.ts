import { Injectable } from '@nestjs/common/decorators';
import { plainToInstance } from 'class-transformer';
import { EliminationChampionshipResponseDTO } from 'src/dtos/responses/eliminationChampionship.response.dto';
import { MatchResponseDTO } from 'src/dtos/responses/match.response.dto';
import { PhaseResponseDTO } from 'src/dtos/responses/phase.response.dto';
import { TeamStatusResponseDTO } from 'src/dtos/responses/teamStatus.response.dto';
import { EliminationChampionship } from 'src/entities/eliminationChampionship.entity';
import { EliminationMatch } from 'src/entities/eliminationMatch.entity';
import { TeamStatus } from 'src/entities/teamStatus.entity';
import { UnknownException } from 'src/exceptions/UnknownException';
import { configService } from 'src/services/config.service';
import { SmartChampionshipDTO } from 'src/utils/dtos';
import { SmartChampionshipEntity } from 'src/utils/entities';
import { Class } from 'src/utils/types';
import { Mapper } from './Mapper';

const errors = configService.get('service.errors');

@Injectable()
export class EntityToDTOMapper extends Mapper<SmartChampionshipEntity, SmartChampionshipDTO> {
  map(
    source: EliminationChampionship,
    dtoCls?: Class<SmartChampionshipDTO>,
  ): EliminationChampionshipResponseDTO;
  map(source: EliminationMatch, dtoCls?: Class<SmartChampionshipDTO>): MatchResponseDTO;
  map(source: TeamStatus, dtoCls?: Class<SmartChampionshipDTO>): TeamStatusResponseDTO;
  map(source: SmartChampionshipEntity, dtoCls?: Class<SmartChampionshipDTO>): SmartChampionshipDTO {
    if (source instanceof EliminationChampionship) return this.eliminationChampionshipResponseDTO(source);
    if (source instanceof EliminationMatch) return this.eliminationMatchResponseDTO(source);
    if (source instanceof TeamStatus) return this.teamStatusResponseDTO(source);
    throw new UnknownException(errors.unknown);
  }

  private eliminationChampionshipResponseDTO(
    championship: EliminationChampionship,
  ): EliminationChampionshipResponseDTO {
    const { id, name, final } = championship;
    return this.plainToInstance(EliminationChampionshipResponseDTO, {
      id,
      name,
      ...this.phaseResponseDTO(final.phases),
    });
  }

  private eliminationMatchResponseDTO(match: EliminationMatch): MatchResponseDTO {
    const { id, status } = match;
    const local = this.teamStatusResponseDTO(status.localStatus);
    const visiting = this.teamStatusResponseDTO(status.visitingStatus);
    return this.plainToInstance(MatchResponseDTO, { id, local, visiting });
  }

  private teamStatusResponseDTO(status: TeamStatus): TeamStatusResponseDTO {
    const { team, goals, reds, yellows } = status;
    return this.plainToInstance(TeamStatusResponseDTO, {
      name: team.name,
      goals: goals.length,
      cards: { red: reds.length, yellow: yellows.length },
    });
  }

  private phaseResponseDTO(phases: Array<Array<EliminationMatch>>): PhaseResponseDTO | null {
    if (phases.length === 0) {
      return null;
    } else {
      return this.plainToInstance(PhaseResponseDTO, {
        matches: phases[0].map((match) => this.eliminationMatchResponseDTO(match)),
        next: this.phaseResponseDTO(phases.slice(1)),
      });
    }
  }

  private plainToInstance<T, V>(cls: Class<T>, plain: V): T;
  private plainToInstance<T, V>(cls: Class<T>, plain: V[]): T[];
  private plainToInstance<T, V>(cls: Class<T>, plain: V | V[]): T | T[] {
    return plainToInstance(cls, plain, { exposeDefaultValues: true });
  }
}
