import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class EditPayDataDTO {
  @ApiProperty()
  @IsOptional()
  name: string;
  @ApiProperty()
  @IsOptional()
  cuit: string;
  @ApiProperty()
  @IsOptional()
  cbu: string;
  @ApiProperty()
  @IsOptional()
  alias: string;
}
