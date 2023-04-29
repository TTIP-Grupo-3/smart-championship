import { Card } from 'src/entities/card.entity';
import { EliminationChampionship } from 'src/entities/eliminationChampionship.entity';
import { EliminationMatch } from 'src/entities/eliminationMatch.entity';
import { Goal } from 'src/entities/goal.entity';
import { MatchStatus } from 'src/entities/matchStatus.entity';
import { ChampionshipPlayer } from 'src/entities/championshipPlayer.entity';
import { ChampionshipTeam } from 'src/entities/championshipTeam.entity';
import { TeamStatus } from 'src/entities/teamStatus.entity';
import { User } from 'src/entities/user.entity';
export type SmartChampionshipEntity =
  | User
  | Card
  | EliminationChampionship
  | EliminationMatch
  | Goal
  | MatchStatus
  | ChampionshipPlayer
  | ChampionshipTeam
  | TeamStatus;

export const entities = [
  User,
  Card,
  EliminationChampionship,
  EliminationMatch,
  Goal,
  MatchStatus,
  ChampionshipPlayer,
  ChampionshipTeam,
  TeamStatus,
];
