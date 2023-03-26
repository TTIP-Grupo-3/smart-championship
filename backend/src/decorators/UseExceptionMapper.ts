import { ExceptionMapperExecutor } from 'src/executors/ExceptionMapperExecutor';
import { Class, Instanciable, InstanciableArray } from 'src/utils/types';
import {
  createClassExecutorDecorator,
  DescriptorMethodDecorator,
  methodExecutorDecorator,
  TargetClassDecorator,
} from '../utils/decorators';

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
  return createClassExecutorDecorator(MethodUseExceptionMapper, ...mappers);
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
  return methodExecutorDecorator(...mappers);
}
