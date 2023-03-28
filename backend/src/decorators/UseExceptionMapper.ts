import { ExceptionMapperExecutor } from 'src/executors/ExceptionMapperExecutor';
import {
  Class,
  DescriptorMethodDecorator,
  Instanciable,
  InstanciableArray,
  TargetClassDecorator,
} from 'src/utils/types';
import { ExecutorDecoratorFactory } from './ExecutorDecoratorFactory';

export function UseExceptionMapper<Source extends Error, Target extends Error>(
  mapper: ExceptionMapperExecutor<Source, Target>,
): TargetClassDecorator;
export function UseExceptionMapper<Source extends Error, Target extends Error>(
  mapper: Class<ExceptionMapperExecutor<Source, Target>>,
): TargetClassDecorator;
export function UseExceptionMapper<Source extends Error, Target extends Error>(
  mapper: Instanciable<ExceptionMapperExecutor<Source, Target>>,
): TargetClassDecorator {
  const mappers = [mapper] as InstanciableArray<ExceptionMapperExecutor<Source, Target>>;
  return ExecutorDecoratorFactory.classDecorator(MethodUseExceptionMapper, ...mappers);
}

export function MethodUseExceptionMapper<Source extends Error, Target extends Error>(
  mapper: ExceptionMapperExecutor<Source, Target>,
): DescriptorMethodDecorator;
export function MethodUseExceptionMapper<Source extends Error, Target extends Error>(
  mapper: Class<ExceptionMapperExecutor<Source, Target>>,
): DescriptorMethodDecorator;
export function MethodUseExceptionMapper<Source extends Error, Target extends Error>(
  ...mappers: InstanciableArray<ExceptionMapperExecutor<Source, Target>>
): DescriptorMethodDecorator {
  return ExecutorDecoratorFactory.methodDecorator(...mappers);
}
