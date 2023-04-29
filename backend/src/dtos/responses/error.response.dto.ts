import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDTO {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  message: string;
}
