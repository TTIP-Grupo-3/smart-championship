import { Column } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';
import { ChampionshipPlayer } from './championshipPlayer.entity';
import { TeamStatus } from './teamStatus.entity';

export enum CardType {
  YELLOW = 'YELLOW',
  RED = 'RED',
}

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  type: CardType;
  @Column()
  minute: number;
  @ManyToOne(() => ChampionshipPlayer, { createForeignKeyConstraints: false, eager: true })
  player: ChampionshipPlayer;
  @ManyToOne(() => TeamStatus, (status) => status.cards)
  status: TeamStatus;

  setStatus(status: TeamStatus) {
    this.status = status;
  }
}
