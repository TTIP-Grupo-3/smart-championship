import { OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { Entity } from 'typeorm';
import { Card, CardType } from './card.entity';
import { Goal } from './goal.entity';
import { ChampionshipTeam } from './championshipTeam.entity';

@Entity()
export class TeamStatus {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToMany(() => Card, (card) => card.status, { eager: true, cascade: true })
  cards: Array<Card>;
  @OneToMany(() => Goal, (goal) => goal.status, { eager: true, cascade: true })
  goals: Array<Goal>;
  @ManyToOne(() => ChampionshipTeam, { nullable: true, eager: true, createForeignKeyConstraints: false })
  team: ChampionshipTeam | null;

  public get reds(): Array<Card> {
    return this.cards.filter((card) => card.type === CardType.RED);
  }

  public get yellows(): Array<Card> {
    return this.cards.filter((card) => card.type === CardType.YELLOW);
  }

  constructor(team: ChampionshipTeam | null) {
    this.team = team;
  }

  goal(goal: Goal) {
    this.goals.push(goal);
    goal.setStatus(this);
  }

  card(card: Card) {
    this.cards.push(card);
    card.setStatus(this);
  }
}
