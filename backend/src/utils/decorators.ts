import { MethodExecutor } from 'src/executors/MethodExecutor';
import { getInstances } from './instances';
import { GenericFunction, InstanciableArray } from './types';

type MetadataEntry = { key: any; value: any };
export type MethodDecoratorTarget<T> = { constructor: T };

export type DescriptorMethodDecorator = <T, R>(
  target: MethodDecoratorTarget<R> | undefined,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<GenericFunction<T>>,
) => TypedPropertyDescriptor<GenericFunction<T>>;

export type MethodComposer<T, R extends any[] = any[], S = any> = (
  fn: GenericFunction<T, R> | undefined,
  thisArg: any,
  target: MethodDecoratorTarget<S> | undefined,
  propertyKey: string,
  ...args: R
) => T;

export const createClassDecorator = (
  methodDecoratorFactory: (...executors: InstanciableArray<MethodExecutor>) => DescriptorMethodDecorator,
  ...executors: InstanciableArray<MethodExecutor>
) => {
  const executorInstances = getInstances<MethodExecutor>(MethodExecutor, executors);
  return function <T extends { new (...args: any[]): any }>(target: T) {
    for (const key of Object.getOwnPropertyNames(target.prototype)) {
      let descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);
      if (key !== 'constructor' && descriptor) {
        descriptor = methodDecoratorFactory(...executorInstances)({ constructor: target }, key, descriptor);
        Object.defineProperty(target.prototype, key, descriptor);
      }
    }
    return target;
  };
};

export const createFunctionDecorator = <T = any>(func: MethodComposer<T>) => {
  return <R>(
    target: MethodDecoratorTarget<R> | undefined,
    propertyKey: string,
    descriptor?: TypedPropertyDescriptor<GenericFunction<T>>,
  ): TypedPropertyDescriptor<GenericFunction<T>> => {
    const entries = getMetadata(descriptor.value);
    descriptor.value = generateNamedFunction(func, target, propertyKey, descriptor);
    defineMetadata(descriptor.value, entries);
    return descriptor;
  };
};

export function methodExecutionDecorator<T, S>(
  before: (target: MethodDecoratorTarget<S>, propertyKey: string, ...args: any[]) => void = () => undefined,
  after = (result: T, target: MethodDecoratorTarget<S>, propertyKey: string, ...args: any[]): void =>
    undefined,
  errorHandler = (
    error: any,
    target: MethodDecoratorTarget<S>,
    propertyKey: string,
    ...args: any[]
  ): void => {
    throw error;
  },
) {
  return createFunctionDecorator(function (fn, thisArg, target, propertyKey, ...args) {
    try {
      before(target, propertyKey, ...args);
      let result = fn.call(thisArg, ...args);
      if (result instanceof Promise) {
        result = composePromise(result, after, errorHandler, target, propertyKey, ...args);
      }
      after(result, target, propertyKey, ...args);
      return result;
    } catch (error) {
      errorHandler(error, target, propertyKey, ...args);
    }
  });
}

export function methodExecutorDecorator(...executors: InstanciableArray<MethodExecutor>) {
  const executorInstances = getInstances<MethodExecutor>(MethodExecutor, executors);
  let beforeResults;
  return methodExecutionDecorator(
    (target, propertyKey, ...args) => {
      beforeResults = executorInstances.map((executor) => executor.before(target, propertyKey, ...args));
    },
    (result, target, propertyKey, ...args) => {
      executorInstances.forEach((executor, index) =>
        executor.after(beforeResults[index], result, target, propertyKey, ...args),
      );
    },
    (error, target, propertyKey, ...args) => {
      executorInstances.forEach((executor, index) =>
        executor.onError(beforeResults[index], error, target, propertyKey, ...args),
      );
    },
  );
}

export function composePromise<T, S>(
  result: Promise<T>,
  thenCallback: (value: T, target: MethodDecoratorTarget<S>, propertyKey: string, ...args: any[]) => T,
  catchCallback: (reason: any, target: MethodDecoratorTarget<S>, propertyKey: string, ...args: any[]) => T,
  target: MethodDecoratorTarget<S>,
  propertyKey: string,
  ...args: any[]
): Promise<T> {
  return Promise.allSettled([result]).then(([asyncResult]: [PromiseSettledResult<T>]) => {
    if (asyncResult.status === 'rejected') {
      return catchCallback(asyncResult.reason, target, propertyKey, ...args);
    } else {
      return thenCallback(asyncResult.value, target, propertyKey, ...args);
    }
  });
}

function generateNamedFunction<T, R = any>(
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

function getMetadata<T>(target: T): Array<MetadataEntry> {
  const keys = Reflect.getMetadataKeys(target);
  return keys.map((key) => ({ key, value: Reflect.getMetadata(key, target) }));
}

function defineMetadata<T>(target: T, entries: Array<MetadataEntry>): void {
  entries.forEach(({ key, value }) => Reflect.defineMetadata(key, value, target));
}
