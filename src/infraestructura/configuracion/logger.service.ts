import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class AppLogger extends ConsoleLogger {
  public customError(error: Error) {
    super.error(`${error.name}: ${error.message}.`, error.stack, this.context);
  }
}
