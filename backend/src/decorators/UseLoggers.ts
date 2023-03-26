import { ExcecutionLogger } from 'src/loggers/ExecutionLogger';
import { Class, DescriptorMethodDecorator, InstanciableArray, TargetClassDecorator } from 'src/utils/types';
import { ExecutorDecoratorFactory } from './ExecutorDecoratorFactory';

export function UseLoggers(...loggers: Array<ExcecutionLogger>): TargetClassDecorator;
export function UseLoggers(...loggers: Array<Class<ExcecutionLogger>>): TargetClassDecorator;
export function UseLoggers(...loggers: InstanciableArray<ExcecutionLogger>): TargetClassDecorator {
  return ExecutorDecoratorFactory.classDecorator(MethodUseLoggers, ...loggers);
}

export function MethodUseLoggers(...loggers: Array<ExcecutionLogger>): DescriptorMethodDecorator;
export function MethodUseLoggers(...loggers: Array<Class<ExcecutionLogger>>): DescriptorMethodDecorator;
export function MethodUseLoggers(
  ...loggers: InstanciableArray<ExcecutionLogger>
): DescriptorMethodDecorator {
  return ExecutorDecoratorFactory.methodDecorator(...loggers);
}
