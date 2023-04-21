import { PartialCardsResponseDTO } from 'src/dtos/responses/partialCards.response.dto';
import { EliminationChampionshipResponseDTO } from 'src/dtos/responses/eliminationChampionship.response.dto';
import { ErrorResponseDTO } from 'src/dtos/responses/error.response.dto';
import { PartialMatchResponseDTO } from 'src/dtos/responses/partialMatch.response.dto';
import { PhaseResponseDTO } from 'src/dtos/responses/phase.response.dto';
import { PartialTeamStatusResponseDTO } from 'src/dtos/responses/partialTeamStatus.response.dto';
import { CardsResponseDTO } from 'src/dtos/responses/cards.response.dto';
import { MatchResponseDTO } from 'src/dtos/responses/match.response.dto';
import { PlayerEventResponseDTO } from 'src/dtos/responses/playerEvent.response.dto';
import { PlayerResponseDTO } from 'src/dtos/responses/player.response.dto';
import { TeamStatusResponseDTO } from 'src/dtos/responses/teamStatus.response.dto';

export type SmartChampionshipDTO =
  | PartialCardsResponseDTO
  | EliminationChampionshipResponseDTO
  | ErrorResponseDTO
  | PartialMatchResponseDTO
  | PhaseResponseDTO
  | PartialTeamStatusResponseDTO
  | CardsResponseDTO
  | MatchResponseDTO
  | PlayerResponseDTO
  | PlayerEventResponseDTO
  | TeamStatusResponseDTO;
