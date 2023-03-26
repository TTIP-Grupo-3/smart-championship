import { Mapper } from 'src/mappers/Mapper';
import { MethodDecoratorTarget } from 'src/utils/decorators';
import { MethodExecutor } from './MethodExecutor';

export class ExceptionMapperExecutor<
  SourceError extends Error,
  TargetError extends Error,
> extends MethodExecutor {
  constructor(private mapper: Mapper<SourceError, TargetError>) {
    super();
  }

  onError<T, S>(
    berforeResult: T,
    error: any,
    target: MethodDecoratorTarget<S>,
    propertyKey: string,
    ...args: any[]
  ): void {
    throw this.mapper.map(error);
  }
}
