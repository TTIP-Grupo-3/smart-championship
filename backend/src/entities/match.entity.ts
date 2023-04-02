import { MatchStatus } from './matchStatus.entity';

export abstract class Match {
  id: number;
  status: MatchStatus;
}
