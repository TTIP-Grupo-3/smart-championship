import { ValidationPipe } from '@nestjs/common';
import { ValidationException } from 'src/exceptions/ValidationException';

export const wsValidationPipe = new ValidationPipe({
  transform: true,
  exceptionFactory: (errors) => new ValidationException(errors),
});
