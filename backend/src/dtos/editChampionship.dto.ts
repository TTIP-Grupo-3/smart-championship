import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsInt, IsOptional, ValidateNested } from 'class-validator';
import { EditPayDataDTO } from './editPayData.dto';

export class EditChampionshipDTO {
  @ApiProperty()
  @IsOptional()
  name: string;
  @ApiProperty()
  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(Date.parse(value)))
  date: Date;
  @ApiProperty()
  @IsInt()
  @IsOptional()
  size: number;
  @ApiProperty()
  @IsOptional()
  price: number;
  @ApiProperty()
  @IsInt()
  @IsOptional()
  duration: number;
  @ApiProperty()
  @IsInt()
  @IsOptional()
  teamSize: number;
  @ApiProperty()
  @ValidateNested()
  @IsOptional()
  @Type(() => EditPayDataDTO)
  payData: EditPayDataDTO;
}
