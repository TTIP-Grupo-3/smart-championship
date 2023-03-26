/* eslint-disable @typescript-eslint/no-empty-function */
import { MethodDecoratorTarget } from 'src/utils/decorators';

export abstract class MethodExecutor {
  before<S>(target: MethodDecoratorTarget<S>, propertyKey: string, ...args: any[]): any {}
  after<T, S, R>(
    berforeResult: T,
    result: R,
    target: MethodDecoratorTarget<S>,
    propertyKey: string,
    ...args: any[]
  ): void {}
  onError<T, S>(
    berforeResult: T,
    error: any,
    target: MethodDecoratorTarget<S>,
    propertyKey: string,
    ...args: any[]
  ): void {}
}
