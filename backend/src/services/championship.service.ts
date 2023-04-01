import { Injectable } from '@nestjs/common';
import { UseExceptionMapper } from 'src/decorators/UseExceptionMapper';
import { EliminationChampionship } from 'src/entities/eliminationChampionship.entity';
import { EliminationMatch } from 'src/entities/eliminationMatch.entity';
import { TeamStatus } from 'src/entities/teamStatus.entity';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { TypeOrmExceptionMapperExecutor } from 'src/executors/TypeOrmExceptionMapperExecutor';
import { ChampionshipResponse } from 'src/responses/championship.response';
import { MatchResponse } from 'src/responses/match.response';
import { PhaseResponse } from 'src/responses/phase.response';
import { TeamStatusResponse } from 'src/responses/teamStatus.response';
import { EntityManager } from 'typeorm';
import { DataSource } from 'typeorm';
import { configService } from './config.service';

const errors = configService.get('service.errors');

@Injectable()
@UseExceptionMapper(TypeOrmExceptionMapperExecutor)
export class ChampionshipService {
  constructor(private readonly dataSource: DataSource) {}

  async getChampionship(id: number): Promise<ChampionshipResponse> {
    return await this.dataSource.transaction(async (manager) => {
      const championship = await this.findChampionship(manager, id);
      return this.mapChampionship(championship);
    });
  }

  private async findChampionship(manager: EntityManager, id: number): Promise<EliminationChampionship> {
    const finals = await manager
      .getTreeRepository(EliminationMatch)
      .findTrees({ relations: ['championshipFinal', 'status'] });
    const final = finals.find(({ championshipFinal }) => championshipFinal?.id === id);
    if (!final) throw new NotFoundException(errors.notFoundChampionship);
    final.championshipFinal.final = final;
    return final.championshipFinal;
  }

  private mapChampionship(championship: EliminationChampionship): ChampionshipResponse {
    const { id, name, final } = championship;
    return { id, name, ...this.mapPhases(final.phases) };
  }

  private mapPhases(phases: Array<Array<EliminationMatch>>): PhaseResponse {
    if (phases.length === 0) {
      return null;
    } else {
      return {
        matches: phases[0].map((match) => this.mapMatch(match)),
        next: this.mapPhases(phases.slice(1)),
      };
    }
  }

  private mapMatch(match: EliminationMatch): MatchResponse {
    const {
      id,
      status: { localStatus, visitingStatus },
    } = match;
    return { id, local: this.mapTeamStatus(localStatus), visiting: this.mapTeamStatus(visitingStatus) };
  }

  private mapTeamStatus(status: TeamStatus): TeamStatusResponse {
    const { team, goals, reds, yellows } = status;
    return { name: team.name, goals: goals.length, cards: { red: reds.length, yellow: yellows.length } };
  }
}
