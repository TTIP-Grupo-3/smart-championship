import { ApiProperty } from '@nestjs/swagger';
import { AccessTokenResponse } from 'src/responses/accessToken.response';
import { UserResponseDTO } from './user.response.dto';

export class AccessTokenResponseDTO extends UserResponseDTO implements AccessTokenResponse {
  @ApiProperty()
  access_token: string;
}
