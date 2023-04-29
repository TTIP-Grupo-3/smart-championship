import { SmartChampionshipException } from 'src/exceptions/SmartChampionshipException';
import { TypeOrmExceptionMapper } from 'src/mappers/TypeOrmExceptionMapper';
import { ExceptionMapperExecutor } from './ExceptionMapperExecutor';

export class TypeOrmExceptionMapperExecutor extends ExceptionMapperExecutor<
  Error,
  SmartChampionshipException
> {
  constructor() {
    super(new TypeOrmExceptionMapper());
  }
}
