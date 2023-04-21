import { Injectable } from '@nestjs/common/decorators';
import { plainToInstance } from 'class-transformer';
import { EliminationChampionshipResponseDTO } from 'src/dtos/responses/eliminationChampionship.response.dto';
import { PartialMatchResponseDTO } from 'src/dtos/responses/partialMatch.response.dto';
import { PhaseResponseDTO } from 'src/dtos/responses/phase.response.dto';
import { PartialTeamStatusResponseDTO } from 'src/dtos/responses/partialTeamStatus.response.dto';
import { EliminationChampionship } from 'src/entities/eliminationChampionship.entity';
import { EliminationMatch } from 'src/entities/eliminationMatch.entity';
import { TeamStatus } from 'src/entities/teamStatus.entity';
import { UnknownException } from 'src/exceptions/UnknownException';
import { configService } from 'src/services/config.service';
import { SmartChampionshipDTO } from 'src/utils/dtos';
import { SmartChampionshipEntity } from 'src/utils/entities';
import { Class, MaybeArray } from 'src/utils/types';
import { Mapper } from './Mapper';
import { Card } from 'src/entities/card.entity';
import { Goal } from 'src/entities/goal.entity';
import { ChampionshipPlayer } from 'src/entities/championshipPlayer.entity';
import { PlayerResponseDTO } from 'src/dtos/responses/player.response.dto';
import { PlayerEventResponseDTO } from 'src/dtos/responses/playerEvent.response.dto';
import { MatchResponseDTO } from 'src/dtos/responses/match.response.dto';
import { TeamStatusResponseDTO } from 'src/dtos/responses/teamStatus.response.dto';

const errors = configService.get('service.errors');

@Injectable()
export class EntityToDTOMapper extends Mapper<SmartChampionshipEntity, SmartChampionshipDTO> {
  map<T extends SmartChampionshipEntity, R extends SmartChampionshipDTO>(source: T, dtoCls?: Class<R>): R;
  map<T extends SmartChampionshipEntity, R extends SmartChampionshipDTO>(
    source: Array<T>,
    dtoCls?: Class<R>,
  ): Array<R>;
  map(
    source: MaybeArray<SmartChampionshipEntity>,
    dtoCls?: Class<SmartChampionshipDTO>,
  ): MaybeArray<SmartChampionshipDTO> {
    if (source instanceof Array) return source.map((source) => this.map(source, dtoCls));
    if (source instanceof EliminationChampionship) return this.eliminationChampionshipResponseDTO(source);
    if (source instanceof EliminationMatch) return this.eliminationMatchResponseDTO(source, dtoCls);
    if (source instanceof TeamStatus) return this.teamStatusResponseDTO(source);
    if (source instanceof Goal) return this.playerEventDTO(source, dtoCls);
    if (source instanceof Card) return this.playerEventDTO(source, dtoCls);
    if (source instanceof ChampionshipPlayer) return this.playerDTO(source, dtoCls);
    throw new UnknownException(errors.unknown);
  }

  private playerDTO(source: ChampionshipPlayer, dtoCls?: Class<SmartChampionshipDTO>): PlayerResponseDTO {
    const { id, name, number } = source;
    return this.plainToInstance(PlayerResponseDTO, { id, name, number });
  }

  private playerEventDTO(
    source: Card | Goal,
    dtoCls?: Class<SmartChampionshipDTO>,
  ): PlayerEventResponseDTO {
    const { id, minute, player } = source;
    return this.plainToInstance(PlayerEventResponseDTO, {
      id,
      minute,
      player: this.map(player, PlayerResponseDTO),
    });
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

  private eliminationMatchResponseDTO(
    match: EliminationMatch,
    dtoCls?: Class<SmartChampionshipDTO>,
  ): PartialMatchResponseDTO | MatchResponseDTO {
    const {
      id,
      status: { localStatus, visitingStatus, status },
    } = match;
    if (dtoCls?.name === MatchResponseDTO.name) {
      const local = this.teamStatusResponseDTO(localStatus, TeamStatusResponseDTO);
      const visiting = this.teamStatusResponseDTO(visitingStatus, TeamStatusResponseDTO);
      return this.plainToInstance(MatchResponseDTO, { id, status, local, visiting });
    } else {
      const local = this.teamStatusResponseDTO(localStatus);
      const visiting = this.teamStatusResponseDTO(visitingStatus);
      return this.plainToInstance(PartialMatchResponseDTO, { id, local, visiting });
    }
  }

  private teamStatusResponseDTO(
    status: TeamStatus,
    dtoCls?: Class<SmartChampionshipDTO>,
  ): PartialTeamStatusResponseDTO | TeamStatusResponseDTO {
    const { team, goals, reds, yellows } = status;
    if (dtoCls?.name === TeamStatusResponseDTO.name) {
      return this.plainToInstance(TeamStatusResponseDTO, {
        name: team.name,
        goals: this.map(goals),
        cards: { red: this.map(reds), yellow: this.map(yellows) },
      });
    } else {
      return this.plainToInstance(PartialTeamStatusResponseDTO, {
        name: team.name,
        goals: goals.length,
        cards: { red: reds.length, yellow: yellows.length },
      });
    }
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
