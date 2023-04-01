import { Column, ManyToOne, OneToMany, Unique } from 'typeorm';
import { Entity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Championship } from './championship.entity';
import { ChampionshipPlayer } from './championshipPlayer.entity';
import { EliminationChampionship } from './eliminationChampionship.entity';

@Entity()
@Unique(['name', 'championship'])
export class ChampionshipTeam {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToMany(() => ChampionshipPlayer, (player) => player.team, { eager: true, cascade: true })
  players: Array<ChampionshipPlayer>;
  @ManyToOne(() => EliminationChampionship, (championship) => championship.teams, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  championship: Championship;
}
