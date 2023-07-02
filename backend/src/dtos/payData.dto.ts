import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class PayDataDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  cuit: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  cbu: string;
  @ApiProperty()
  @IsNotEmpty()
  alias: string;
}
