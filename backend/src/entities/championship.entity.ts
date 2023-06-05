import { Column, Entity, OneToMany, PrimaryGeneratedColumn, TableInheritance } from 'typeorm';
import { ChampionshipPlayer } from './championshipPlayer.entity';
import { ChampionshipTeam } from './championshipTeam.entity';
import { Match } from './match.entity';
import { ChampionshipStatus } from 'src/enums/championshipStatus.enum';
import { ChampionshipType } from 'src/enums/championshipType.enum';
import { InvalidArgumentException } from 'src/exceptions/InvalidArgumentException';
import { EditChampionshipInfo } from 'src/utils/types';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Championship {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToMany(() => ChampionshipTeam, (team) => team.championship, { eager: true })
  teams: Array<ChampionshipTeam>;
  @OneToMany(() => ChampionshipPlayer, (player) => player.championship, {
    createForeignKeyConstraints: false,
  })
  players: Array<ChampionshipPlayer>;
  @Column({ nullable: false })
  date: Date;
  @Column({ nullable: true })
  start: Date;
  @Column({ nullable: true })
  end: Date;
  @Column()
  size: number;
  @Column()
  price: number;
  @Column()
  duration: number;
  @Column()
  teamSize: number;

  abstract type: ChampionshipType;

  abstract matches: Array<Match>;

  abstract findMatch(id: number): Match | null;

  public get room() {
    return `championship-${this.id}`;
  }

  public get matchTeams() {
    return this.matches.flatMap((match) => match.teams);
  }

  public get status(): ChampionshipStatus {
    if (this.end) {
      return ChampionshipStatus.FINISHED;
    } else if (this.start) {
      return ChampionshipStatus.STARTED;
    } else {
      return ChampionshipStatus.TOSTART;
    }
  }

  edit({ name, date, size, price, duration, teamSize }: EditChampionshipInfo) {
    if (this.status !== ChampionshipStatus.TOSTART) throw new InvalidArgumentException();
    this.name = name ?? this.name;
    this.date = date ?? this.date;
    this.size = size ?? this.size;
    this.price = price ?? this.price;
    this.duration = duration ?? this.duration;
    this.teamSize = teamSize ?? this.teamSize;
  }
}
