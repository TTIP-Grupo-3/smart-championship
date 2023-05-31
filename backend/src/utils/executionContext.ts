import { UserRequestInfo } from './types';

export function getRequest(context): UserRequestInfo {
  if (context.getType() === 'ws') return context.args[0];
  return context.switchToHttp().getRequest();
}
