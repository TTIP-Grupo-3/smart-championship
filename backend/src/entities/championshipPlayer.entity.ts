import { Column } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';
import { Championship } from './championship.entity';
import { ChampionshipTeam } from './championshipTeam.entity';
import { EliminationChampionship } from './eliminationChampionship.entity';

@Entity()
export class ChampionshipPlayer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  number: number;
  @ManyToOne(() => ChampionshipTeam, (team) => team.players, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  team: ChampionshipTeam;
  @ManyToOne(() => EliminationChampionship, (championship) => championship.players, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  championship: Championship;
}
