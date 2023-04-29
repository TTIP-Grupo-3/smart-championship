import { ApiProperty } from '@nestjs/swagger';
import { AccessTokenResponse } from 'src/responses/accessToken.response';

export class AccessTokenResponseDTO implements AccessTokenResponse {
  @ApiProperty()
  access_token: string;
}
