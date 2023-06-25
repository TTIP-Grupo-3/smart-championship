import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ChampionshipTeam } from './championshipTeam.entity';
import { TeamLeader } from './teamLeader.entity';
import { Player } from './player.entity';

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

  public get filename(): string {
    return `${this.id}.png`;
  }
}
