import { UserResponse } from './user.response';

export interface AccessTokenResponse extends UserResponse {
  access_token: string;
}
