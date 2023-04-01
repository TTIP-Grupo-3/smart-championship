import { CardsResponseDTO } from 'src/dtos/responses/cards.response.dto';
import { EliminationChampionshipResponseDTO } from 'src/dtos/responses/eliminationChampionship.response.dto';
import { ErrorResponseDTO } from 'src/dtos/responses/error.response.dto';
import { MatchResponseDTO } from 'src/dtos/responses/match.response.dto';
import { PhaseResponseDTO } from 'src/dtos/responses/phase.response.dto';
import { TeamStatusResponseDTO } from 'src/dtos/responses/teamStatus.response.dto';

export type SmartChampionshipDTO =
  | CardsResponseDTO
  | EliminationChampionshipResponseDTO
  | ErrorResponseDTO
  | MatchResponseDTO
  | PhaseResponseDTO
  | TeamStatusResponseDTO;
