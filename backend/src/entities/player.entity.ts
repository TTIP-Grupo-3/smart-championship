import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChampionshipPlayer } from './championshipPlayer.entity';
import { Team } from './team.entity';

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
}
