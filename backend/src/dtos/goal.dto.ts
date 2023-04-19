import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { MatchIdDTO } from './matchId.dto';

export class GoalDTO extends MatchIdDTO {
  @IsNumber()
  @IsNotEmpty()
  minute: number;
  @IsNumber()
  @IsNotEmpty()
  playerId: number;
  @IsBoolean()
  @IsNotEmpty()
  local: boolean;
}
