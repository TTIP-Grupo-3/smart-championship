import { Column, ManyToOne, OneToMany, RelationId, Unique } from 'typeorm';
import { Entity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Championship } from './championship.entity';
import { ChampionshipPlayer } from './championshipPlayer.entity';
import { Team } from './team.entity';

@Entity()
@Unique(['name', 'championship'])
export class ChampionshipTeam {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToMany(() => ChampionshipPlayer, (player) => player.team, { eager: true, cascade: true })
  players: Array<ChampionshipPlayer>;
  @ManyToOne(() => Championship, (championship) => championship.teams, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  championship: Championship;
  @ManyToOne(() => Team, (team) => team.championshipTeams, { createForeignKeyConstraints: false })
  team: Team;
  @RelationId('team')
  teamId: number;

  logo: string;

  public get filename(): string {
    return `${this.teamId}.png`;
  }

  static from(team: Team, championship: Championship): ChampionshipTeam {
    const championshipTeam = new ChampionshipTeam();
    championshipTeam.name = team.name;
    championshipTeam.championship = championship;
    championshipTeam.team = team;
    championshipTeam.players = team.players.map((player) =>
      player.createChampionshipPlayer(championship, championshipTeam),
    );
    championshipTeam.logo = team.logo;
    return championshipTeam;
  }
}
