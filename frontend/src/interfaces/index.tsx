import { Dispatch, SetStateAction } from 'react';

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

export interface InspectorMatchProps {
  idMatch: number;
  setSelected: Dispatch<SetStateAction<null>>;
  championshipId: number | null;
  type: string;
}
