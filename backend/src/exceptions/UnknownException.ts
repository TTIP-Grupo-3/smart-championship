import { SmartChampionshipException } from './SmartChampionshipException';

export class UnknownException extends SmartChampionshipException {
  constructor(message?: string) {
    super({ statusCode: 400, message: message ?? 'Bad request' }, 400);
  }
}
