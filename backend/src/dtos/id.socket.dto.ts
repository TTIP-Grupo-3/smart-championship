import { IsNotEmpty, IsNumber } from 'class-validator';
import { SocketDTO } from './socket.dto';

export class IdSocketDTO extends SocketDTO {
  @IsNumber()
  @IsNotEmpty()
  id?: number;
}
