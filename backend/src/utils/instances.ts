import { plainToInstance } from 'class-transformer';
import { Class } from './types';

export function toInstance<T, V>(cls: Class<T>, plain: V): T;
export function toInstance<T, V>(cls: Class<T>, plain: V[]): T[];
export function toInstance<T, V>(cls: Class<T>, plain: V | V[]): T | T[] {
  return plainToInstance(cls, plain, { exposeDefaultValues: true });
}
