import { SmartChampionshipException } from './SmartChampionshipException';

export class UnauthorizedException extends SmartChampionshipException {
  constructor(message?: string) {
    super({ statusCode: 401, message: message ?? 'Unauthorized' }, 401);
  }
}
