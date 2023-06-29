import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ChampionshipTeam } from './championshipTeam.entity';
import { TeamLeader } from './teamLeader.entity';
import { Player } from './player.entity';
import { Championship } from './championship.entity';
import { InvalidArgumentException } from 'src/exceptions/InvalidArgumentException';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToOne(() => TeamLeader, (leader) => leader.team)
  @JoinColumn()
  leader: TeamLeader;
  @OneToMany(() => Player, (player) => player.team, { eager: true, cascade: true })
  players: Array<Player>;
  @OneToMany(() => ChampionshipTeam, (championshipTeam) => championshipTeam.team)
  championshipTeams: Array<ChampionshipTeam>;

  logo: string;

  setLeader(leader: TeamLeader) {
    if (!!this.leader) throw new InvalidArgumentException('Team has leader');
    this.leader = leader;
  }

  public get filename(): string {
    return `${this.id}.png`;
  }

  createChampionshipTeam(championship: Championship): ChampionshipTeam {
    return ChampionshipTeam.from(this, championship);
  }

  checkCanEnroll(championship: Championship) {
    if (!this.canEnroll(championship)) throw new InvalidArgumentException('Need more players');
  }

  private canEnroll(championship: Championship): boolean {
    return this.players.length >= championship.teamSize;
  }
}
