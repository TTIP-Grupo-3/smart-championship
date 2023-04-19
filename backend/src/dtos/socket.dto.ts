import { IsBoolean, IsOptional } from 'class-validator';

export class SocketDTO {
  @IsBoolean()
  @IsOptional()
  unsubscribe?: boolean;
}
