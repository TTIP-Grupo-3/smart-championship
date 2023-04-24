import { OneToMany } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { Entity } from 'typeorm';
import { Card, CardType } from './card.entity';
import { Goal } from './goal.entity';
import { ChampionshipTeam } from './championshipTeam.entity';
import { InvalidArgumentException } from 'src/exceptions/InvalidArgumentException';

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
    if (!this.canAddCard(card)) throw new InvalidArgumentException("This player can't receive card");
    this.cards.push(card);
    card.setStatus(this);
  }

  private canAddCard(card: Card): boolean {
    return this.cards.every(
      ({ type, player }) =>
        card.player.id !== player.id || (type === CardType.YELLOW && card.type === CardType.RED),
    );
  }
}
