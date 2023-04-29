import { IsBoolean, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { MatchIdDTO } from './matchId.dto';
import { CardType } from 'src/entities/card.entity';

export class CardDTO extends MatchIdDTO {
  @IsEnum(CardType)
  @IsNotEmpty()
  type: CardType;
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
