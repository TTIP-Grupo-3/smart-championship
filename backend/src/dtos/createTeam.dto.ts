import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTeamDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty({
    type: 'file',
    required: false,
    items: { type: 'file', items: { type: 'string', format: 'binary' } },
  })
  @IsOptional()
  logo?: Express.Multer.File;

  public get logoString(): string | undefined {
    return this.logo ? Buffer.from(this.logo.buffer).toString('base64') : undefined;
  }
}
