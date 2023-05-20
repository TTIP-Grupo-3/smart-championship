import { Card } from 'src/entities/card.entity';
import { EliminationChampionship } from 'src/entities/eliminationChampionship.entity';
import { EliminationMatch } from 'src/entities/eliminationMatch.entity';
import { Goal } from 'src/entities/goal.entity';
import { MatchStatus } from 'src/entities/matchStatus.entity';
import { ChampionshipPlayer } from 'src/entities/championshipPlayer.entity';
import { ChampionshipTeam } from 'src/entities/championshipTeam.entity';
import { TeamStatus } from 'src/entities/teamStatus.entity';
import { User } from 'src/entities/user.entity';
import { Championship } from 'src/entities/championship.entity';
import { Match } from 'src/entities/match.entity';
import { ScoreStatus } from 'src/entities/scoreStatus.entity';
import { ScoreMatch } from 'src/entities/scoreMatch.entity';
import { ScoreChampionship } from 'src/entities/scoreChampionship.entity';
export type SmartChampionshipEntity =
  | Championship
  | Match
  | User
  | Card
  | EliminationChampionship
  | EliminationMatch
  | Goal
  | MatchStatus
  | ChampionshipPlayer
  | ChampionshipTeam
  | TeamStatus
  | ScoreStatus
  | ScoreMatch
  | ScoreChampionship;

export const entities = [
  Championship,
  Match,
  User,
  Card,
  EliminationChampionship,
  EliminationMatch,
  Goal,
  MatchStatus,
  ChampionshipPlayer,
  ChampionshipTeam,
  TeamStatus,
  ScoreMatch,
  ScoreChampionship,
];
