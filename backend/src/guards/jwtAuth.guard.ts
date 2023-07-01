import { ConsoleLogger, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { IdDTO } from 'src/dtos/id.dto';
import { UnauthorizedException } from 'src/exceptions/UnauthorizedException';
import { UsersService } from 'src/services/user.service';
import { UserPayload } from 'src/utils/types';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  @Inject()
  private jwtService: JwtService;
  @Inject()
  private configService: ConfigService;
  @Inject()
  private userService: UsersService;
  private readonly logger: ConsoleLogger = new ConsoleLogger();

  async canActivate(context: ExecutionContext) {
    if (context.getType() === 'ws') return await this.wsCanActivate(context);
    const result = await (super.canActivate(context) as Promise<boolean>);
    const request = context.switchToHttp().getRequest();
    if (result) request.userDTO = plainToInstance(IdDTO, { id: request.user.id });
    return result;
  }

  private async wsCanActivate(context: any): Promise<boolean> {
    try {
      const token = this.getToken(context);
      const payload = this.jwtService.verify<UserPayload>(token, this.configService.get('JWT_SECRET'));
      await this.setUser(context, payload);
      return true;
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException();
    }
  }

  private getToken(context): string {
    const { token } = context.args[0].handshake.auth;
    if (!token) throw new UnauthorizedException();
    return context.args[0].handshake.auth.token.split(' ')[1];
  }

  private async setUser(context, { username }: UserPayload) {
    const user = await this.userService.findOne(username);
    if (!user) throw new UnauthorizedException();
    context.args[0].user = user;
    context.args[0].userDTO = plainToInstance(IdDTO, { id: user.id });
    return user;
  }
}
