import { ChildEntity, OneToMany, OneToOne, RelationId } from 'typeorm';
import { TeamEnrollment } from './teamEnrollment.entity';
import { User } from './user.entity';
import { Role, UserRole } from 'src/enums/role.enum';
import { Championship } from './championship.entity';
import { Team } from './team.entity';
import { InvalidArgumentException } from 'src/exceptions/InvalidArgumentException';
import { ChampionshipTeam } from './championshipTeam.entity';
import { Player } from './player.entity';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { configService } from 'src/services/config.service';

const errors = configService.get('model.errors');

@ChildEntity()
export class TeamLeader extends User {
  roles: UserRole[] = [Role.TeamLeader];
  @OneToOne(() => Team, (team) => team.leader, { cascade: true })
  team: Team;
  @OneToMany(() => TeamEnrollment, (enrollment) => enrollment.teamLeader, { cascade: true })
  enrollments: Array<TeamEnrollment>;
  @RelationId('team')
  teamId: number;

  minimumTeamSize: number;

  public get players(): Array<Player> {
    this.checkTeamCreated();
    return this.team.players;
  }

  addPlayer(player: Player) {
    this.checkTeamCreated();
    this.team.addPlayer(player);
  }

  setTeam(team: Team) {
    if (!!this.team) throw new InvalidArgumentException(errors.teamAlreadyCreated);
    this.team = team;
    team.setLeader(this);
  }

  enrollTo(championship: Championship): TeamEnrollment {
    this.checkCanEnroll(championship);
    const enrollment = championship.enroll(this);
    this.enrollments.push(enrollment);
    return enrollment;
  }

  createChampionshipTeam(championship: Championship): ChampionshipTeam {
    return this.team.createChampionshipTeam(championship);
  }

  private checkCanEnroll(championship: Championship) {
    this.checkTeamCreated();
    this.team.checkCanEnroll(championship);
  }

  private checkTeamCreated() {
    if (!this.team) throw new NotFoundException(errors.teamNotCreated);
  }
}
