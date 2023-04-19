import { SmartChampionshipException } from './SmartChampionshipException';

export class NotFoundException extends SmartChampionshipException {
  constructor(message?: string) {
    super({ statusCode: 404, message: message ?? 'Not found' }, 404);
  }
}
