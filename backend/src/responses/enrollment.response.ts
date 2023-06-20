import { PayStatus } from 'src/enums/payStatus.enum';

export interface EnrollmentResponse {
  id: number;
  name: string;
  price: number;
  status: PayStatus;
  receipt?: string;
}
