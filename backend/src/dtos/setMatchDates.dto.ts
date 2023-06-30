import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { MatchDateDTO } from './matchDate.dto';

export class SetMatchDatesDTO {
  @ApiProperty({ type: MatchDateDTO, isArray: true })
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => MatchDateDTO)
  matchDates: Array<MatchDateDTO>;
}
