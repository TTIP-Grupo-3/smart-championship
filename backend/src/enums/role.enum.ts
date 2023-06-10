export enum Role {
  Admin = 'admin',
  Reviewer = 'reviewer',
  All = 'all',
  TeamLeader = 'team_leader',
}

export type UserRole = Role.Admin | Role.Reviewer | Role.TeamLeader;
