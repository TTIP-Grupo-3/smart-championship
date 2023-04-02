import {
  DescriptorMethodDecorator,
  GenericFunction,
  MetadataEntry,
  MethodComposer,
  MethodDecoratorTarget,
} from 'src/utils/types';

export class DecoratorFactory {
  static methodDecorator<T = any, R = any>(func: MethodComposer<T>): DescriptorMethodDecorator<T, R> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const ThisClass = this;
    return (target, propertyKey, descriptor) => {
      const entries = ThisClass.getMetadata(descriptor.value);
      descriptor.value = ThisClass.generateNamedFunction(func, target, propertyKey, descriptor);
      ThisClass.defineMetadata(descriptor.value, entries);
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
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const ThisClass = this;
    return DecoratorFactory.methodDecorator(function (fn, thisArg, target, propertyKey, ...args) {
      try {
        before(target, propertyKey, ...args);
        const result = fn.call(thisArg, ...args);
        if (result instanceof Promise) {
          return ThisClass.composePromise(result, after, onError, target, propertyKey, ...args);
        }
        after(result, target, propertyKey, ...args);
        return result;
      } catch (error) {
        onError(error, target, propertyKey, ...args);
      }
    });
  }

  private static composePromise<T, S>(
    result: Promise<T>,
    after: (value: T, target: MethodDecoratorTarget<S>, propertyKey: string, ...args: any[]) => void,
    onError: (reason: any, target: MethodDecoratorTarget<S>, propertyKey: string, ...args: any[]) => void,
    target: MethodDecoratorTarget<S>,
    propertyKey: string,
    ...args: any[]
  ): Promise<T> {
    return Promise.allSettled([result]).then(([asyncResult]: [PromiseSettledResult<T>]) => {
      if (asyncResult.status === 'rejected') {
        onError(asyncResult.reason, target, propertyKey, ...args);
      } else {
        after(asyncResult.value, target, propertyKey, ...args);
        return asyncResult.value;
      }
    });
  }

  private static generateNamedFunction<T, R = any>(
    func: MethodComposer<T>,
    target: MethodDecoratorTarget<R> | undefined,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<GenericFunction<T>>,
  ) {
    const fn = descriptor.value;
    return {
      [fn.name]: function <T>(this: T, ...args: any[]) {
        return func(fn, this, target, propertyKey, ...args);
      },
    }[descriptor.value.name];
  }

  private static getMetadata<T>(target: T): Array<MetadataEntry> {
    const keys = Reflect.getMetadataKeys(target);
    return keys.map((key) => ({ key, value: Reflect.getMetadata(key, target) }));
  }

  private static defineMetadata<T>(target: T, entries: Array<MetadataEntry>): void {
    entries.forEach(({ key, value }) => Reflect.defineMetadata(key, value, target));
  }
}
