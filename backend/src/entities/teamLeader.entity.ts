import { ChildEntity, OneToMany, OneToOne } from 'typeorm';
import { TeamEnrollment } from './teamEnrollment.entity';
import { User } from './user.entity';
import { Role, UserRole } from 'src/enums/role.enum';
import { Championship } from './championship.entity';
import { Team } from './team.entity';

@ChildEntity()
export class TeamLeader extends User {
  roles: UserRole[] = [Role.TeamLeader];
  @OneToOne(() => Team, (team) => team.leader, { cascade: true })
  team: Team;
  @OneToMany(() => TeamEnrollment, (enrollment) => enrollment.teamLeader, { cascade: true })
  enrollments: Array<TeamEnrollment>;

  enrollTo(championship: Championship): TeamEnrollment {
    const enrollment = championship.enroll(this);
    this.enrollments.push(enrollment);
    return enrollment;
  }
}
