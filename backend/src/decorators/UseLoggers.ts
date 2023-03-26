import { ExcecutionLogger } from 'src/loggers/ExecutionLogger';
import { createClassDecorator, methodExecutorDecorator } from 'src/utils/decorators';
import { Class, InstanciableArray } from 'src/utils/types';

export function UseLoggers(...loggers: Array<ExcecutionLogger>);
export function UseLoggers(...loggers: Array<Class<ExcecutionLogger>>);
export function UseLoggers(...loggers: InstanciableArray<ExcecutionLogger>) {
  return createClassDecorator(MethodUseLoggers, ...loggers);
}

export const MethodUseLoggers = (...loggers: InstanciableArray<ExcecutionLogger>) => {
  return methodExecutorDecorator(...loggers);
};
