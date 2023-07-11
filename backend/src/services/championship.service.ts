import { NotFoundException } from 'src/exceptions/NotFoundException';
import { EntityManager, FindOptionsRelations } from 'typeorm';
import { configService } from './config.service';
import { Championship } from 'src/entities/championship.entity';
import { TransactionService } from './transaction.service';
import { ChampionshipIdDTO } from 'src/dtos/championshipId.dto';
import { EliminationChampionship } from 'src/entities/eliminationChampionship.entity';
import { EliminationMatch } from 'src/entities/eliminationMatch.entity';
import { ScoreChampionship } from 'src/entities/scoreChampionship.entity';
import { ScoreMatch } from 'src/entities/scoreMatch.entity';

const errors = configService.get('service.errors');

export abstract class ChampionshipService {
  protected relations: FindOptionsRelations<Championship> = {};

  constructor(protected readonly transactionService: TransactionService) {}

  async getChampionship(
    getChampionshipDTO: ChampionshipIdDTO,
    manager?: EntityManager,
  ): Promise<Championship> {
    return await this.transactionService.transaction(async (manager) => {
      const { championshipId } = getChampionshipDTO;
      const championship = await this.findChampionship(championshipId, manager);
      return await this.setMatches(championship, manager);
    }, manager);
  }

  async getChampionships(manager?: EntityManager): Promise<Array<Championship>> {
    return await this.transactionService.transaction(async (manager) => {
      const championships = await manager.find(Championship, {
        relations: this.relations,
        loadEagerRelations: false,
      });
      return this.filterChampionships(championships);
    }, manager);
  }

  private found(championship?: Championship): boolean {
    return !!championship && this.exists(championship);
  }

  private checkFound(championship?: Championship) {
    if (!this.found(championship)) throw new NotFoundException(errors.notFoundChampionship);
  }

  private async findChampionship(id: number, manager: EntityManager): Promise<Championship> {
    const championship = await manager.findOne(Championship, {
      where: { id },
      relations: {
        enrollment: { teamEnrollments: { teamLeader: true }, payData: true },
        teams: { players: true },
      },
      loadEagerRelations: false,
    });
    this.checkFound(championship);
    championship.enrollment.championship = championship;
    return championship;
  }

  protected exists(championship: Championship): boolean {
    return true;
  }

  private filterChampionships(championships: Array<Championship>): Array<Championship> {
    return championships.filter((championship) => this.exists(championship));
  }

  protected async setMatches(championship: Championship, manager: EntityManager): Promise<Championship> {
    if (championship instanceof EliminationChampionship) {
      championship.final = await this.findFinal(championship, manager);
    } else if (championship instanceof ScoreChampionship) {
      championship.matches = await manager.findBy(ScoreMatch, { championship: { id: championship.id } });
    }
    return championship;
  }

  private async findFinal(
    championship: EliminationChampionship,
    manager: EntityManager,
  ): Promise<EliminationMatch> {
    const relations = ['status'];
    const finals = await manager.getTreeRepository(EliminationMatch).findTrees({ relations });
    const final = finals.find(({ championshipId }) => championshipId === championship.id);
    if (final) final.setParents();
    return final;
  }
}
