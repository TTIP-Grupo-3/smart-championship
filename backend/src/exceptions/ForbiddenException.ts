import { SmartChampionshipException } from './SmartChampionshipException';

export class ForbiddenException extends SmartChampionshipException {
  constructor(message?: string) {
    super({ statusCode: 403, message: message ?? 'Forbidden' }, 403);
  }
}
