export enum Role {
  Admin = 'admin',
  Reviewer = 'reviewer',
  All = 'all',
}

export type UserRole = Role.Admin | Role.Reviewer;
