import { ApiProperty } from '@nestjs/swagger';
import { AccessTokenResponse } from 'src/responses/accessToken.response';
import { UserResponseDTO } from './user.response.dto';
import { User } from 'src/entities/user.entity';
import { UserRequestInfo } from 'src/utils/types';
import { toInstance } from 'src/utils/instances';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';

export class AccessTokenResponseDTO extends UserResponseDTO implements AccessTokenResponse {
  @ApiProperty()
  access_token: string;

  static from(user: User, request: UserRequestInfo, mapper: EntityToDTOMapper): AccessTokenResponseDTO {
    const { name, username, role, access_token } = user;
    return toInstance(AccessTokenResponseDTO, { name, username, role, access_token });
  }
}
