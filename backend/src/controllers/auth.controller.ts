import { Controller, Request, Post, UseGuards, UsePipes, Body, Get, UseInterceptors } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from 'src/guards/localAuth.guard';
import {
  ApiUnauthorizedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { validationPipe } from 'src/pipes/validation.pipe';
import { ErrorResponseDTO } from 'src/dtos/responses/error.response.dto';
import { LoginDTO } from 'src/dtos/login.dto';
import { AccessTokenResponseDTO } from 'src/dtos/responses/accessToken.response.dto';
import { JwtAuthGuard } from 'src/guards/jwtAuth.guard';
import { UserResponseDTO } from 'src/dtos/responses/user.response.dto';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';

@Controller('auth')
@ApiTags('Authentication')
@UsePipes(validationPipe)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ type: AccessTokenResponseDTO, status: 201 })
  @ApiUnauthorizedResponse({ type: ErrorResponseDTO })
  @UseInterceptors(new TransformInterceptor(AccessTokenResponseDTO))
  @Post('login')
  async login(@Body() user: LoginDTO, @Request() req) {
    return await this.authService.login(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Profile' })
  @ApiResponse({ type: UserResponseDTO, status: 200 })
  @ApiUnauthorizedResponse({ type: ErrorResponseDTO })
  @ApiForbiddenResponse({ type: ErrorResponseDTO })
  @UseInterceptors(new TransformInterceptor(UserResponseDTO))
  @Get('profile')
  async profile(@Request() req) {
    return await this.authService.profile(req.user);
  }
}
