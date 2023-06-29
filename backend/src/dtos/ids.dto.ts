import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class IdsDTO {
  @ApiProperty({ isArray: true, type: 'number' })
  @IsArray()
  ids: Array<number>;
}
