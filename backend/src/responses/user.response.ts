import { Role } from 'src/enums/role.enum';

export interface UserResponse {
  name: string;
  username: string;
  role: Role;
}
