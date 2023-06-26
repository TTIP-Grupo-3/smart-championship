import { Injectable } from '@nestjs/common/decorators';
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
import { Class, MaybeArray, UserRequestInfo } from 'src/utils/types';
import { Mapper } from './Mapper';
import { Card } from 'src/entities/card.entity';
import { Goal } from 'src/entities/goal.entity';
import { ChampionshipPlayer } from 'src/entities/championshipPlayer.entity';
import { PlayerResponseDTO } from 'src/dtos/responses/player.response.dto';
import { PlayerEventResponseDTO } from 'src/dtos/responses/playerEvent.response.dto';
import { MatchResponseDTO } from 'src/dtos/responses/match.response.dto';
import { TeamStatusResponseDTO } from 'src/dtos/responses/teamStatus.response.dto';
import { MatchTeamsResponseDTO } from 'src/dtos/responses/matchTeams.response.dto';
import { TeamResponseDTO } from 'src/dtos/responses/team.response.dto';
import { ChampionshipTeam } from 'src/entities/championshipTeam.entity';
import { Championship } from 'src/entities/championship.entity';
import { Match } from 'src/entities/match.entity';
import { ScoreStatus } from 'src/entities/scoreStatus.entity';
import { ScoreChampionship } from 'src/entities/scoreChampionship.entity';
import { ScoreChampionshipResponseDTO } from 'src/dtos/responses/scoreChampionship.response.dto';
import { PartialChampionshipResponseDTO } from 'src/dtos/responses/partialChampionship.response.dto';
import { ScoreStatusResponseDTO } from 'src/dtos/responses/scoreStatus.response.dto';
import { User } from 'src/entities/user.entity';
import { UserResponseDTO } from 'src/dtos/responses/user.response.dto';
import { AccessTokenResponseDTO } from 'src/dtos/responses/accessToken.response.dto';
import { PartialAdminChampionshipResponseDTO } from 'src/dtos/responses/partialAdminChampionship.response.dto';
import { TeamEnrollment } from 'src/entities/teamEnrollment.entity';
import { EnrollmentResponseDTO } from 'src/dtos/responses/enrollment.response.dto';
import { plainToInstance } from 'class-transformer';
import { TeamLeaderChampionshipResponseDTO } from 'src/dtos/responses/teamLeaderChampionship.response.dto';
import { TeamLeader } from 'src/entities/teamLeader.entity';
import { TeamLeaderResponseDTO } from 'src/dtos/responses/teamLeader.response.dto';
import { TeamLeaderEnrollmentResponseDTO } from 'src/dtos/responses/teamLeaderEnrollment.response.dto';
import { Player } from 'src/entities/player.entity';
import { LeaderTeamResponseDTO } from 'src/dtos/responses/leaderTeam.response.dto';
import { Team } from 'src/entities/team.entity';

const errors = configService.get('service.errors');

@Injectable()
export class EntityToDTOMapper extends Mapper<SmartChampionshipEntity, SmartChampionshipDTO> {
  map<T extends SmartChampionshipEntity, R extends SmartChampionshipDTO>(
    source: T,
    request?: UserRequestInfo,
    dtoCls?: Class<R>,
  ): R;
  map<T extends SmartChampionshipEntity, R extends SmartChampionshipDTO>(
    source: Array<T>,
    request?: UserRequestInfo,
    dtoCls?: Class<R>,
  ): Array<R>;
  map(
    source: MaybeArray<SmartChampionshipEntity>,
    request?: UserRequestInfo,
    dtoCls?: Class<SmartChampionshipDTO>,
  ): MaybeArray<SmartChampionshipDTO> {
    if (source instanceof Array) return source.map((source) => this.map(source, request, dtoCls));
    if (source instanceof Championship) return this.championshipResponseDTO(source, request, dtoCls);
    if (source instanceof Match) return this.matchResponseDTO(source, request, dtoCls);
    if (source instanceof ScoreStatus) return this.scoreStatusResponseDTO(source, request, dtoCls);
    if (source instanceof TeamStatus) return this.teamStatusResponseDTO(source, request, dtoCls);
    if (source instanceof Goal) return this.playerEventDTO(source, request, dtoCls);
    if (source instanceof Card) return this.playerEventDTO(source, request, dtoCls);
    if (source instanceof ChampionshipPlayer) return this.playerDTO(source, request, dtoCls);
    if (source instanceof Player) return this.playerDTO(source, request, dtoCls);
    if (source instanceof ChampionshipTeam) return this.championshipTeamDTO(source, request, dtoCls);
    if (source instanceof Team) return this.teamDTO(source, request, dtoCls);
    if (source instanceof TeamLeader) return this.teamLeaderDTO(source, request, dtoCls);
    if (source instanceof User) return this.userDTO(source, request, dtoCls);
    if (source instanceof TeamEnrollment) return this.teamEnrollmentDTO(source, request, dtoCls);
    throw new UnknownException(errors.unknown);
  }

  private teamEnrollmentDTO(
    enrollment: TeamEnrollment,
    requst: UserRequestInfo = {},
    dtoCls?: Class<SmartChampionshipDTO>,
  ): EnrollmentResponseDTO | TeamLeaderEnrollmentResponseDTO {
    const { id, status, receipt, championshipEnrollment, teamLeader } = enrollment;
    const { price } = championshipEnrollment;
    const { name } = teamLeader;
    if (dtoCls?.name === TeamLeaderEnrollmentResponseDTO.name) {
      const {
        championship: { name: championship },
      } = championshipEnrollment;
      return this.plainToInstance(TeamLeaderEnrollmentResponseDTO, {
        id,
        championship,
        price,
        status,
      });
    } else {
      return this.plainToInstance(EnrollmentResponseDTO, { id, name, price, status, receipt });
    }
  }

  private teamLeaderDTO(
    teamLeader: TeamLeader,
    request: UserRequestInfo = {},
    dtoCls?: Class<SmartChampionshipDTO>,
  ): UserResponseDTO | AccessTokenResponseDTO | TeamLeaderResponseDTO {
    if (dtoCls?.name === TeamLeaderResponseDTO.name) {
      const { id, name, team, enrollments } = teamLeader;
      return this.plainToInstance(TeamLeaderResponseDTO, {
        id,
        name,
        team: team ? this.map(team, request, LeaderTeamResponseDTO) : null,
        enrollments: this.map(enrollments, request, TeamLeaderEnrollmentResponseDTO),
      });
    } else {
      return this.userDTO(teamLeader, request, dtoCls);
    }
  }

  private teamDTO(
    team: Team,
    request: UserRequestInfo = {},
    dtoCls?: Class<SmartChampionshipDTO>,
  ): LeaderTeamResponseDTO {
    const { id, name, logo, players } = team;
    return this.plainToInstance(LeaderTeamResponseDTO, {
      id,
      name,
      logo,
      players: this.map(players, request, PlayerResponseDTO),
    });
  }

  private userDTO(
    user: User,
    request: UserRequestInfo = {},
    dtoCls?: Class<SmartChampionshipDTO>,
  ): UserResponseDTO | AccessTokenResponseDTO {
    const { name, username, role, access_token } = user;
    if (dtoCls?.name === UserResponseDTO.name) {
      return this.plainToInstance(UserResponseDTO, { name, username, role });
    } else {
      return this.plainToInstance(AccessTokenResponseDTO, { name, username, role, access_token });
    }
  }

  private scoreStatusResponseDTO(
    scoreStatus: ScoreStatus,
    request: UserRequestInfo = {},
    dtoCls?: Class<SmartChampionshipDTO>,
  ): ScoreStatusResponseDTO {
    const { team, score, played, tied, lost, won } = scoreStatus;
    const { id, name } = team;
    return this.plainToInstance(ScoreStatusResponseDTO, {
      id,
      name,
      score,
      played: played.length,
      tied: tied.length,
      lost: lost.length,
      won: won.length,
    });
  }

  private championshipResponseDTO(
    championship: Championship,
    request: UserRequestInfo = {},
    dtoCls?: Class<SmartChampionshipDTO>,
  ) {
    const partialDTONames = [
      PartialChampionshipResponseDTO.name,
      PartialAdminChampionshipResponseDTO.name,
      TeamLeaderChampionshipResponseDTO.name,
    ];
    if (partialDTONames.includes(dtoCls?.name)) {
      return this.partialChampionshipResponseDTO(championship, request, dtoCls);
    } else if (championship instanceof EliminationChampionship) {
      return this.eliminationChampionshipResponseDTO(championship, request, dtoCls);
    } else if (championship instanceof ScoreChampionship) {
      return this.scoreChampionshipResponseDTO(championship, request, dtoCls);
    }
    throw new UnknownException(errors.unknown);
  }

  private partialChampionshipResponseDTO(
    championship: Championship,
    { user, role }: UserRequestInfo = {},
    dtoCls?: Class<SmartChampionshipDTO>,
  ) {
    const { id, name, type, date, start, end, size, enrollment, duration, teamSize, status } = championship;
    const { price, enrolled } = enrollment;
    if (dtoCls?.name === PartialAdminChampionshipResponseDTO.name) {
      return this.plainToInstance(PartialAdminChampionshipResponseDTO, {
        id,
        name,
        type,
        date,
        start,
        end,
        size,
        enrolled,
        price,
        duration,
        teamSize,
        status,
      });
    } else if (dtoCls?.name === TeamLeaderChampionshipResponseDTO.name) {
      return this.plainToInstance(TeamLeaderChampionshipResponseDTO, {
        id,
        name,
        type,
        date,
        start,
        end,
        size,
        enrolled,
        price,
        duration,
        teamSize,
        status,
        isEnrolled: championship.isEnrolled(user),
      });
    } else {
      return this.plainToInstance(PartialChampionshipResponseDTO, {
        id,
        name,
        type,
        date: start,
        teamSize,
      });
    }
  }

  private scoreChampionshipResponseDTO(
    championship: ScoreChampionship,
    request: UserRequestInfo = {},
    dtoCls?: Class<SmartChampionshipDTO>,
  ): ScoreChampionshipResponseDTO | PartialChampionshipResponseDTO {
    const { id, name, type, matches } = championship;
    return this.plainToInstance(ScoreChampionshipResponseDTO, {
      id,
      name,
      type,
      matches: this.map(matches, request),
    });
  }

  private playerDTO(
    source: ChampionshipPlayer | Player,
    request: UserRequestInfo = {},
    dtoCls?: Class<SmartChampionshipDTO>,
  ): PlayerResponseDTO {
    const { id, name, number, dni } = source;
    return this.plainToInstance(PlayerResponseDTO, { id, name, number, dni });
  }

  private championshipTeamDTO(
    source: ChampionshipTeam,
    request: UserRequestInfo = {},
    dtoCls?: Class<SmartChampionshipDTO>,
  ): TeamResponseDTO {
    const { id, name, players } = source;
    return this.plainToInstance(TeamResponseDTO, {
      id,
      name,
      players: this.map(players, request, PlayerResponseDTO),
    });
  }

  private playerEventDTO(
    source: Card | Goal,
    request: UserRequestInfo = {},
    dtoCls?: Class<SmartChampionshipDTO>,
  ): PlayerEventResponseDTO {
    const { id, minute, player } = source;
    return this.plainToInstance(PlayerEventResponseDTO, {
      id,
      minute,
      player: this.map(player, request, PlayerResponseDTO),
    });
  }

  private eliminationChampionshipResponseDTO(
    championship: EliminationChampionship,
    request: UserRequestInfo = {},
    dtoCls?: Class<SmartChampionshipDTO>,
  ): EliminationChampionshipResponseDTO | PartialChampionshipResponseDTO {
    const { id, name, type, final } = championship;
    return this.plainToInstance(EliminationChampionshipResponseDTO, {
      id,
      name,
      type,
      ...this.phaseResponseDTO(final.phases, request),
    });
  }

  private matchResponseDTO(
    match: Match,
    request: UserRequestInfo = {},
    dtoCls?: Class<SmartChampionshipDTO>,
  ): PartialMatchResponseDTO | MatchResponseDTO | MatchTeamsResponseDTO {
    const {
      id,
      championship,
      status: { localStatus, visitingStatus, status, date, start, end },
    } = match;
    if (dtoCls?.name === MatchResponseDTO.name) {
      const local = this.teamStatusResponseDTO(localStatus, request, TeamStatusResponseDTO);
      const visiting = this.teamStatusResponseDTO(visitingStatus, request, TeamStatusResponseDTO);
      return this.plainToInstance(MatchResponseDTO, { id, date, start, end, status, local, visiting });
    } else if (dtoCls?.name === MatchTeamsResponseDTO.name) {
      const { id: championshipId } = championship;
      const local = this.teamStatusResponseDTO(localStatus, request, TeamResponseDTO);
      const visiting = this.teamStatusResponseDTO(visitingStatus, request, TeamResponseDTO);
      return this.plainToInstance(MatchTeamsResponseDTO, {
        id,
        date,
        start,
        end,
        championshipId,
        local,
        visiting,
      });
    } else {
      const local = this.teamStatusResponseDTO(localStatus, request);
      const visiting = this.teamStatusResponseDTO(visitingStatus, request);
      return this.plainToInstance(PartialMatchResponseDTO, {
        id,
        date,
        start,
        end,
        status,
        local,
        visiting,
      });
    }
  }

  private teamStatusResponseDTO(
    status: TeamStatus,
    request: UserRequestInfo = {},
    dtoCls?: Class<SmartChampionshipDTO>,
  ): PartialTeamStatusResponseDTO | TeamStatusResponseDTO | TeamResponseDTO {
    const { team, goals, reds, yellows } = status;
    if (dtoCls?.name === TeamStatusResponseDTO.name) {
      return this.plainToInstance(TeamStatusResponseDTO, {
        name: team.name,
        logo: team.logo,
        goals: this.map(goals, request),
        cards: { red: this.map(reds, request), yellow: this.map(yellows, request) },
      });
    } else if (dtoCls?.name === TeamResponseDTO.name) {
      return this.map(team, request, TeamResponseDTO);
    } else {
      return this.plainToInstance(PartialTeamStatusResponseDTO, {
        name: team.name,
        logo: team.logo,
        goals: goals.length,
        cards: { red: reds.length, yellow: yellows.length },
      });
    }
  }

  private phaseResponseDTO(
    phases: Array<Array<EliminationMatch>>,
    request: UserRequestInfo = {},
  ): PhaseResponseDTO | null {
    if (phases.length === 0) {
      return null;
    } else {
      return this.plainToInstance(PhaseResponseDTO, {
        matches: phases[0].map((match) => this.matchResponseDTO(match, request)),
        next: this.phaseResponseDTO(phases.slice(1), request),
      });
    }
  }

  private plainToInstance<T, V>(cls: Class<T>, plain: V): T;
  private plainToInstance<T, V>(cls: Class<T>, plain: V[]): T[];
  private plainToInstance<T, V>(cls: Class<T>, plain: V | V[]): T | T[] {
    return plainToInstance(cls, plain, { exposeDefaultValues: true });
  }
}
