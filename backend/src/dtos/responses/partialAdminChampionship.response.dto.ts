import { PartialAdminChampionshipResponse } from 'src/responses/partialAdminChampionship.response';
import { PartialChampionshipResponseDTO } from './partialChampionship.response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ChampionshipStatus } from 'src/enums/championshipStatus.enum';

export class PartialAdminChampionshipResponseDTO
  extends PartialChampionshipResponseDTO
  implements PartialAdminChampionshipResponse
{
  @ApiProperty({ example: new Date() })
  date: string;
  @ApiProperty({ example: new Date(), nullable: true, required: false })
  start?: string;
  @ApiProperty({ example: new Date(), nullable: true, required: false })
  end?: string;
  @ApiProperty()
  size: number;
  @ApiProperty()
  enrolled: number;
  @ApiProperty()
  price: number;
  @ApiProperty()
  duration: number;
  @ApiProperty()
  teamSize: number;
  @ApiProperty({ enum: ChampionshipStatus })
  status: ChampionshipStatus;
}
