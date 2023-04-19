import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { Entity } from 'typeorm';
import { ChampionshipPlayer } from './championshipPlayer.entity';
import { TeamStatus } from './teamStatus.entity';

@Entity()
export class Goal {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  minute: number;
  @ManyToOne(() => ChampionshipPlayer, { createForeignKeyConstraints: false, eager: true })
  player: ChampionshipPlayer;
  @ManyToOne(() => TeamStatus, (status) => status.goals)
  status: TeamStatus;

  setStatus(status: TeamStatus) {
    this.status = status;
  }
}
