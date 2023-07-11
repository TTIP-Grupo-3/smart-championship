import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/enums/role.enum';
import { UserResponse } from 'src/responses/user.response';
import { ResponseDTOFactory } from './factories/response.dto.factory';
import { User } from 'src/entities/user.entity';
import { UserRequestInfo } from 'src/utils/types';
import { toInstance } from 'src/utils/instances';
import { EntityToDTOMapper } from 'src/mappers/EntityToDTOMapper';

export class UserResponseDTO extends ResponseDTOFactory implements UserResponse {
  @ApiProperty()
  name: string;
  @ApiProperty()
  username: string;
  @ApiProperty({ enum: Role })
  role: Role;

  static from(user: User, request: UserRequestInfo, mapper: EntityToDTOMapper): UserResponseDTO {
    const { name, username, role } = user;
    return toInstance(UserResponseDTO, { name, username, role });
  }
}
