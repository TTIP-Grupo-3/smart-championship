import { ChildEntity, OneToMany, OneToOne, RelationId } from 'typeorm';
import { TeamEnrollment } from './teamEnrollment.entity';
import { User } from './user.entity';
import { Role, UserRole } from 'src/enums/role.enum';
import { Championship } from './championship.entity';
import { Team } from './team.entity';
import { InvalidArgumentException } from 'src/exceptions/InvalidArgumentException';
import { ChampionshipTeam } from './championshipTeam.entity';
import { Player } from './player.entity';
import { NotFoundException } from '@nestjs/common';

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

  addPlayer(player: Player) {
    if (!this.team) throw new NotFoundException('Team not found');
    this.team.addPlayer(player);
  }

  setTeam(team: Team) {
    if (!!this.team) throw new InvalidArgumentException('Team already created');
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
    if (!this.team) throw new InvalidArgumentException('Team is not created');
    this.team.checkCanEnroll(championship);
  }
}
