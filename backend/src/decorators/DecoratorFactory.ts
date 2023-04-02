import {
  DescriptorMethodDecorator,
  GenericFunction,
  MetadataEntry,
  MethodComposer,
  MethodDecoratorTarget,
} from 'src/utils/types';
import { isAsyncFunction } from 'util/types';

export type ExecutionArgs<T, S> = {
  before: (target: MethodDecoratorTarget<S>, propertyKey: string, ...args: any[]) => void;
  after: (value: T, target: MethodDecoratorTarget<S>, propertyKey: string, ...args: any[]) => void;
  onError: (reason: any, target: MethodDecoratorTarget<S>, propertyKey: string, ...args: any[]) => void;
  fn: GenericFunction<T>;
  thisArg: any;
  target: MethodDecoratorTarget<S>;
  propertyKey: string;
  args: any[];
};

export class DecoratorFactory {
  static methodDecorator<T = any, R = any>(func: MethodComposer<T>): DescriptorMethodDecorator<T, R> {
    return (target, propertyKey, descriptor) => {
      const entries = this.getMetadata(descriptor.value);
      descriptor.value = this.generateNamedFunction(func, target, propertyKey, descriptor) as any;
      this.defineMetadata(descriptor.value, entries);
      return descriptor;
    };
  }

  static methodExecutionDecorator<T, S>(
    before = (target: MethodDecoratorTarget<S>, propertyKey: string, ...args: any[]): void => undefined,
    after = (result: T, target: MethodDecoratorTarget<S>, propertyKey: string, ...args: any[]): void =>
      undefined,
    onError = (error: any, target: MethodDecoratorTarget<S>, propertyKey: string, ...args: any[]): void => {
      throw error;
    },
  ): DescriptorMethodDecorator<T, S> {
    return DecoratorFactory.methodDecorator((fn, thisArg, target, propertyKey, ...args) => {
      const executionArgs = { before, after, onError, fn, thisArg, target, propertyKey, args };
      return isAsyncFunction(fn) ? this.asyncExecution(executionArgs) : this.syncExecution(executionArgs);
    });
  }

  private static async asyncExecution<T, S>(executionArgs: ExecutionArgs<T, S>) {
    const { before, after, onError, fn, thisArg, target, propertyKey, args } = executionArgs;
    try {
      before(target, propertyKey, ...args);
      const result = await fn.call(thisArg, ...args);
      after(result, target, propertyKey, ...args);
      return result;
    } catch (error) {
      onError(error, target, propertyKey, ...args);
    }
  }

  private static syncExecution<T, S>(executionArgs: ExecutionArgs<T, S>) {
    const { before, after, onError, fn, thisArg, target, propertyKey, args } = executionArgs;
    try {
      before(target, propertyKey, ...args);
      const result = fn.call(thisArg, ...args);
      after(result, target, propertyKey, ...args);
      return result;
    } catch (error) {
      onError(error, target, propertyKey, ...args);
    }
  }

  private static generateNamedFunction<T, R = any>(
    func: MethodComposer<T>,
    target: MethodDecoratorTarget<R> | undefined,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<GenericFunction<T>>,
  ) {
    return isAsyncFunction(descriptor.value)
      ? this.generateAsyncNamedFunction(func, target, propertyKey, descriptor)
      : this.generateSyncNamedFunction(func, target, propertyKey, descriptor);
  }
  static generateSyncNamedFunction<T, R>(
    func: MethodComposer<T>,
    target: MethodDecoratorTarget<R>,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<GenericFunction<T>>,
  ) {
    const fn = descriptor.value;
    return {
      [fn.name]: function <T>(this: T, ...args: any[]) {
        return func(fn, this, target, propertyKey, ...args);
      },
    }[fn.name];
  }

  static generateAsyncNamedFunction<T, R>(
    func: MethodComposer<T>,
    target: MethodDecoratorTarget<R>,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<GenericFunction<T>>,
  ) {
    const fn = descriptor.value;
    return {
      [fn.name]: async function <T>(this: T, ...args: any[]) {
        return await func(fn, this, target, propertyKey, ...args);
      },
    }[fn.name];
  }

  private static getMetadata<T>(target: T): Array<MetadataEntry> {
    const keys = Reflect.getMetadataKeys(target);
    return keys.map((key) => ({ key, value: Reflect.getMetadata(key, target) }));
  }

  private static defineMetadata<T>(target: T, entries: Array<MetadataEntry>): void {
    entries.forEach(({ key, value }) => Reflect.defineMetadata(key, value, target));
  }
}
