import { PayDataResponse } from 'src/responses/payData.response';
import { ResponseDTOFactory } from './factories/response.dto.factory';
import { ApiProperty } from '@nestjs/swagger';
import { PayData } from 'src/entities/payData.entity';
import { UserRequestInfo } from 'src/utils/types';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';
import { toInstance } from 'src/utils/instances';

export class PayDataResponseDTO extends ResponseDTOFactory implements PayDataResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  cuit: string;
  @ApiProperty()
  cbu: string;
  @ApiProperty()
  alias: string;

  static from(payData: PayData, request: UserRequestInfo, mapper: EntityToDTOMapper): PayDataResponseDTO {
    const { id, name, cuit, cbu, alias } = payData;
    return toInstance(PayDataResponseDTO, { id, name, cuit, cbu, alias });
  }
}
