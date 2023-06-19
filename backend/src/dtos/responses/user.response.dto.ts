import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/enums/role.enum';
import { UserResponse } from 'src/responses/user.response';

export class UserResponseDTO implements UserResponse {
  @ApiProperty()
  name: string;
  @ApiProperty()
  username: string;
  @ApiProperty({ enum: Role })
  role: Role;
}
