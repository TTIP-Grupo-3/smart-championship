import { ConsoleLogger } from '@nestjs/common';
import { MethodExecutor } from 'src/executors/MethodExecutor';

export abstract class ExcecutionLogger extends MethodExecutor {
  constructor(private logger: ConsoleLogger) {
    super();
  }
}
