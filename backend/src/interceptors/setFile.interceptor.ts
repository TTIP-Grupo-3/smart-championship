import { BadRequestException, CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { configService } from 'src/services/config.service';

const errors = configService.get('controller.errors');

export class SetFileInterceptor implements NestInterceptor {
  private extensionRegex = /(image\/png|image\/jpg|image\/jpeg)$/;

  intercept<R>(context: ExecutionContext, next: CallHandler): Observable<R> {
    const request = context.switchToHttp().getRequest();
    const file: Express.Multer.File = request.file;
    if (!this.extensionRegex.test(file.mimetype)) throw new BadRequestException([errors.wrongExtension]);
    request.body[file.fieldname] = file;
    return next.handle();
  }
}
