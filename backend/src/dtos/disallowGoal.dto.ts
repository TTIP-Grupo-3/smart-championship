import { IsNotEmpty, IsNumber } from 'class-validator';
import { MatchIdDTO } from './matchId.dto';

export class DisallowGoalDTO extends MatchIdDTO {
  @IsNumber()
  @IsNotEmpty()
  goalId: number;
}
