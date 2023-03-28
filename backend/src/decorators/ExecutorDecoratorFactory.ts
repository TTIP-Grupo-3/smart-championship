import { MethodExecutor } from 'src/executors/MethodExecutor';
import { Class, DescriptorMethodDecorator, InstanciableArray, TargetClassDecorator } from 'src/utils/types';
import { DecoratorFactory } from './DecoratorFactory';
import { Instanciator } from './Instanciator';

export class ExecutorDecoratorFactory {
  static instanciator = new Instanciator();

  static classDecorator<T extends Class<any>>(
    methodDecoratorFactory: (...executors: InstanciableArray<MethodExecutor>) => DescriptorMethodDecorator,
    ...executors: InstanciableArray<MethodExecutor>
  ): TargetClassDecorator<T> {
    const executorInstances = this.instanciator.getInstances<MethodExecutor>(MethodExecutor, executors);
    return function (target) {
      for (const key of Object.getOwnPropertyNames(target.prototype)) {
        let descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);
        if (key !== 'constructor' && descriptor) {
          descriptor = methodDecoratorFactory(...executorInstances)(
            { constructor: target },
            key,
            descriptor,
          );
          Object.defineProperty(target.prototype, key, descriptor);
        }
      }
      return target;
    };
  }

  static methodDecorator<T = any, R = any>(
    ...executors: InstanciableArray<MethodExecutor>
  ): DescriptorMethodDecorator<T, R> {
    const executorInstances = this.instanciator.getInstances<MethodExecutor>(MethodExecutor, executors);
    let beforeResults: any[];
    return DecoratorFactory.methodExecutionDecorator(
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
}
