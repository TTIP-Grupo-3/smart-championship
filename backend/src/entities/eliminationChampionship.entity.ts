import { InvalidArgumentException } from 'src/exceptions/InvalidArgumentException';
import { configService } from 'src/services/config.service';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ChampionshipTeam } from './championshipTeam.entity';
import { Championship } from './championship.entity';
import { EliminationMatch } from './eliminationMatch.entity';
import { ChampionshipPlayer } from './championshipPlayer.entity';

const errors = configService.get('model.errors');

@Entity()
export class EliminationChampionship extends Championship {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToMany(() => ChampionshipTeam, (team) => team.championship, { eager: true })
  teams: Array<ChampionshipTeam>;
  @OneToMany(() => ChampionshipPlayer, (player) => player.championship, {
    createForeignKeyConstraints: false,
  })
  players: Array<ChampionshipPlayer>;
  @OneToOne(() => EliminationMatch, { cascade: true })
  @JoinColumn()
  final: EliminationMatch;

  public get phases(): Array<Array<EliminationMatch>> {
    return this.final.phases;
  }

  public get room() {
    return `championship-${this.id}`;
  }

  matches(): Array<EliminationMatch> {
    return this.final.toArray();
  }

  findMatch(id: number): EliminationMatch {
    return this.final.findMatch(id);
  }

  generateMatches() {
    if (!this.isGenerable()) throw new InvalidArgumentException(errors.invalidArgument);
    let baseMatches: Array<EliminationMatch> | Array<ChampionshipTeam> = this.unsortedTeams();
    this.levels().forEach(() => {
      const locals = baseMatches.slice(0, length / 2);
      const visitings = baseMatches.slice(length / 2);
      baseMatches = locals.map((local, index) =>
        new EliminationMatch().initialize(local, visitings[index]),
      );
      if (baseMatches.length === 0) this.final = baseMatches[0];
    });
  }

  private isGenerable() {
    const sqrt = Math.sqrt(this.teams.length);
    return this.teams.length > 1 && sqrt - Math.floor(sqrt) === 0;
  }

  private levels() {
    return Array(Math.sqrt(this.teams.length) + 1);
  }

  private unsortedTeams() {
    return [...this.teams].sort(() => 0.5 - Math.random());
  }
}
