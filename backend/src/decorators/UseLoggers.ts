import { ExcecutionLogger } from 'src/loggers/ExecutionLogger';
import {
  createClassExecutorDecorator,
  DescriptorMethodDecorator,
  methodExecutorDecorator,
  TargetClassDecorator,
} from 'src/utils/decorators';
import { Class, InstanciableArray } from 'src/utils/types';

export function UseLoggers(...loggers: Array<ExcecutionLogger>): TargetClassDecorator;
export function UseLoggers(...loggers: Array<Class<ExcecutionLogger>>): TargetClassDecorator;
export function UseLoggers(...loggers: InstanciableArray<ExcecutionLogger>): TargetClassDecorator {
  return createClassExecutorDecorator(MethodUseLoggers, ...loggers);
}

export function MethodUseLoggers(...loggers: Array<ExcecutionLogger>): DescriptorMethodDecorator;
export function MethodUseLoggers(...loggers: Array<Class<ExcecutionLogger>>): DescriptorMethodDecorator;
export function MethodUseLoggers(
  ...loggers: InstanciableArray<ExcecutionLogger>
): DescriptorMethodDecorator {
  return methodExecutorDecorator(...loggers);
}
