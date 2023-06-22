import { ApiProperty } from '@nestjs/swagger';
import { PayStatus } from 'src/enums/payStatus.enum';
import { EnrollmentResponse } from 'src/responses/enrollment.response';

export class EnrollmentResponseDTO implements EnrollmentResponse {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  price: number;
  @ApiProperty({ enum: PayStatus })
  status: PayStatus;
  @ApiProperty({ required: false, nullable: true })
  receipt?: string;
}
