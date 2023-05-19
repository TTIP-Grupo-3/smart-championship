import { Column, Entity, OneToMany, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';
import { ChampionshipPlayer } from './championshipPlayer.entity';
import { ChampionshipTeam } from './championshipTeam.entity';
import { Match } from './match.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Championship {
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

  abstract matches: Array<Match>;

  abstract findMatch(id: number): Match | null;

  public get room() {
    return `championship-${this.id}`;
  }

  public get matchTeams() {
    return this.matches.flatMap((match) => match.teams);
  }
}
