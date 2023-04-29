import { Controller, Request, Post, UseGuards, UsePipes, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from 'src/guards/localAuth.guard';
import { ApiUnauthorizedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { validationPipe } from 'src/pipes/validation.pipe';
import { ErrorResponseDTO } from 'src/dtos/responses/error.response.dto';
import { LoginDTO } from 'src/dtos/login.dto';
import { AccessTokenResponseDTO } from 'src/dtos/responses/accessToken.response.dto';

@Controller('auth')
@ApiTags('Authentication')
@UsePipes(validationPipe)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ type: AccessTokenResponseDTO, status: 201 })
  @ApiUnauthorizedResponse({ type: ErrorResponseDTO })
  @Post('login')
  async login(@Body() user: LoginDTO, @Request() req) {
    return await this.authService.login(req.user);
  }
}
