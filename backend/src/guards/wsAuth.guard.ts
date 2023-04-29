import { CanActivate, ConsoleLogger, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/services/user.service';
import { UnauthorizedException } from 'src/exceptions/UnauthorizedException';
import { UserPayload } from 'src/utils/types';

@Injectable()
export class WsAuthGuard implements CanActivate {
  private readonly logger: ConsoleLogger = new ConsoleLogger();

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private userService: UsersService,
  ) {}

  async canActivate(context: any): Promise<boolean> {
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
    return user;
  }
}
