import { ValidationPipe } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

export const wsValidationPipe = new ValidationPipe({
  transform: true,
  exceptionFactory: (errors) => new WsException(errors),
});
