import { ExceptionMapperExecutor } from 'src/executors/ExceptionMapperExecutor';
import { Instanciable, InstanciableArray } from 'src/utils/types';
import { createClassDecorator, methodExecutorDecorator } from '../utils/decorators';

export function UseExceptionMapper<Source extends Error, Target extends Error>(
  mapper: Instanciable<ExceptionMapperExecutor<Source, Target>>,
) {
  const mappers = [mapper] as InstanciableArray<ExceptionMapperExecutor<Source, Target>>;
  return createClassDecorator(MapExceptions, ...mappers);
}

export const MapExceptions = <Source extends Error, Target extends Error>(
  ...mappers: InstanciableArray<ExceptionMapperExecutor<Source, Target>>
) => {
  return methodExecutorDecorator(...mappers);
};
