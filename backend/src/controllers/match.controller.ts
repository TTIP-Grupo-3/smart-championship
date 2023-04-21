import { Controller, Get, Param, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorResponseDTO } from 'src/dtos/responses/error.response.dto';
import { PartialMatchResponseDTO } from 'src/dtos/responses/partialMatch.response.dto';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { MatchService } from 'src/services/match.service';

@Controller('championship/:championshipId/match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @ApiOperation({ summary: 'Get championship matches' })
  @ApiResponse({ type: PartialMatchResponseDTO, status: 200, isArray: true })
  @ApiNotFoundResponse({ type: ErrorResponseDTO })
  @UseInterceptors(new TransformInterceptor(PartialMatchResponseDTO))
  @Get()
  async matches(@Param('championshipId', ParseIntPipe) championshipId: number) {
    return await this.matchService.matches(championshipId);
  }
}
