import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';
import { MatchStatus } from './matchStatus.entity';
import { Goal } from './goal.entity';
import { Card } from './card.entity';
import { Championship } from './championship.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Match {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => MatchStatus, { eager: true, cascade: true })
  @JoinColumn()
  status: MatchStatus;

  abstract championship: Championship;

  public get room() {
    return `match-${this.id}`;
  }

  public get teams() {
    return this.status.teams;
  }

  setDate(date?: Date) {
    this.status.setDate(date);
  }

  goal(goal: Goal, local: boolean) {
    this.status.goal(goal, local);
  }

  card(card: Card, local: boolean) {
    this.status.card(card, local);
  }

  start() {
    this.status.startMatch();
  }

  end() {
    return this.status.endMatch();
  }

  initialized(): boolean {
    return this.status.hasDate();
  }

  reviewable(): boolean {
    return this.status.reviewable();
  }
}
