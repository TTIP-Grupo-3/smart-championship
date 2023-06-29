import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChampionshipPlayer } from './championshipPlayer.entity';
import { Team } from './team.entity';
import { Championship } from './championship.entity';
import { ChampionshipTeam } from './championshipTeam.entity';
import { InvalidArgumentException } from 'src/exceptions/InvalidArgumentException';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  number: number;
  @Column()
  dni: number;
  @ManyToOne(() => Team, (team) => team.players)
  team: Team;
  @OneToMany(() => ChampionshipPlayer, (championshipPlayer) => championshipPlayer.player)
  championshipPlayers: Array<ChampionshipPlayer>;

  setTeam(team: Team) {
    if (!!this.team) throw new InvalidArgumentException('Player already in team');
    this.team = team;
  }

  createChampionshipPlayer(championship: Championship, team: ChampionshipTeam): ChampionshipPlayer {
    return ChampionshipPlayer.from(this, championship, team);
  }
}
