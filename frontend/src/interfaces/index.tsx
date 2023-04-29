export enum Cards {
  RED = 'RED',
  YELLOW = 'YELLOW',
}

export enum MatchStatus {
  TOSTART = 'TOSTART',
  STARTED = 'STARTED',
  FINISHED = 'FINISHED',
}

export interface User {
  username: string;
  password: string;
}
