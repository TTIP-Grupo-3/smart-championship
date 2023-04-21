import { SmartChampionshipException } from './SmartChampionshipException';

export class InvalidArgumentException extends SmartChampionshipException {
  constructor(message?: string | Record<string, any>) {
    super({ statusCode: 400, message: message ?? 'Bad request' }, 400);
  }
}
