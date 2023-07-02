import { NotFoundException } from 'src/exceptions/NotFoundException';
import { EntityManager } from 'typeorm';
import { configService } from './config.service';
import { Championship } from 'src/entities/championship.entity';
import { TransactionService } from './transaction.service';
import { ChampionshipIdDTO } from 'src/dtos/championshipId.dto';
import { EliminationChampionship } from 'src/entities/eliminationChampionship.entity';
import { EliminationMatch } from 'src/entities/eliminationMatch.entity';

const errors = configService.get('service.errors');

export abstract class ChampionshipService {
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
      const championships = await manager.findBy(Championship, {});
      return this.filterChampionships(championships);
    }, manager);
  }

  private async findChampionship(id: number, manager: EntityManager): Promise<Championship> {
    const championship = await manager.findOneBy(Championship, { id });
    if (!this.exists(championship)) throw new NotFoundException(errors.notFoundChampionship);
    championship.enrollment.championship = championship;
    return championship;
  }

  protected abstract exists(championship?: Championship): boolean;

  private filterChampionships(championships: Array<Championship>): Array<Championship> {
    return championships.filter((championship) => this.exists(championship));
  }

  protected async setMatches(championship: Championship, manager: EntityManager): Promise<Championship> {
    if (championship instanceof EliminationChampionship) {
      championship.final = await this.findFinal(championship, manager);
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
