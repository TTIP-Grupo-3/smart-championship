import { PartialCardsResponseDTO } from 'src/dtos/responses/partialCards.response.dto';
import { EliminationChampionshipResponseDTO } from 'src/dtos/responses/eliminationChampionship.response.dto';
import { ErrorResponseDTO } from 'src/dtos/responses/error.response.dto';
import { PartialMatchResponseDTO } from 'src/dtos/responses/partialMatch.response.dto';
import { PhaseManagerResponseDTO } from 'src/dtos/responses/phaseManager.response.dto';
import { PartialTeamStatusResponseDTO } from 'src/dtos/responses/partialTeamStatus.response.dto';
import { CardsResponseDTO } from 'src/dtos/responses/cards.response.dto';
import { MatchResponseDTO } from 'src/dtos/responses/match.response.dto';
import { PlayerEventResponseDTO } from 'src/dtos/responses/playerEvent.response.dto';
import { PlayerResponseDTO } from 'src/dtos/responses/player.response.dto';
import { TeamStatusResponseDTO } from 'src/dtos/responses/teamStatus.response.dto';
import { MatchTeamsResponseDTO } from 'src/dtos/responses/matchTeams.response.dto';
import { TeamResponseDTO } from 'src/dtos/responses/team.response.dto';
import { PartialChampionshipResponseDTO } from 'src/dtos/responses/partialChampionship.response.dto';
import { ChampionshipResponseDTO } from 'src/dtos/responses/championship.response.dto';
import { ScoreChampionshipResponseDTO } from 'src/dtos/responses/scoreChampionship.response.dto';
import { ScoreStatusResponseDTO } from 'src/dtos/responses/scoreStatus.response.dto';
import { UserResponseDTO } from 'src/dtos/responses/user.response.dto';
import { PartialAdminChampionshipResponse } from 'src/responses/partialAdminChampionship.response';
import { EnrollmentResponseDTO } from 'src/dtos/responses/enrollment.response.dto';
import { TeamLeaderResponseDTO } from 'src/dtos/responses/teamLeader.response.dto';
import { TeamLeaderEnrollmentResponseDTO } from 'src/dtos/responses/teamLeaderEnrollment.response.dto';
import { LeaderTeamResponseDTO } from 'src/dtos/responses/leaderTeam.response.dto';

export type SmartChampionshipDTO =
  | PartialCardsResponseDTO
  | EliminationChampionshipResponseDTO
  | ErrorResponseDTO
  | PartialMatchResponseDTO
  | PhaseManagerResponseDTO
  | PartialTeamStatusResponseDTO
  | CardsResponseDTO
  | MatchResponseDTO
  | PlayerResponseDTO
  | PlayerEventResponseDTO
  | TeamStatusResponseDTO
  | MatchTeamsResponseDTO
  | TeamResponseDTO
  | PartialChampionshipResponseDTO
  | ChampionshipResponseDTO
  | ScoreChampionshipResponseDTO
  | ScoreStatusResponseDTO
  | UserResponseDTO
  | PartialAdminChampionshipResponse
  | EnrollmentResponseDTO
  | TeamLeaderResponseDTO
  | TeamLeaderEnrollmentResponseDTO
  | LeaderTeamResponseDTO;
