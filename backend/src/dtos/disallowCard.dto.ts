import { IsNotEmpty, IsNumber } from 'class-validator';
import { MatchIdDTO } from './matchId.dto';

export class DisallowCardDTO extends MatchIdDTO {
  @IsNumber()
  @IsNotEmpty()
  cardId: number;
}
