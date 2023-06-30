import { Dispatch, SetStateAction } from 'react';

export type ChampionshipTournament = ChampionshipScore | ChampionshipElimination;

export enum CardsType {
  RED = 'RED',
  YELLOW = 'YELLOW',
}

export enum TypeChampionship {
  ELIMINATION = 'elimination',
  SCORE = 'score',
}

export enum MatchStatus {
  TOSTART = 'TOSTART',
  STARTED = 'STARTED',
  FINISHED = 'FINISHED',
}

export enum Role {
  ADMIN = 'admin',
  REVIEWER = 'reviewer',
  LEADER = 'team_leader',
}
export interface User {
  [key: string]: string;
  username: string;
  password: string;
}

export interface InspectorMatchProps {
  idMatch: number;
  setSelected: Dispatch<SetStateAction<null>>;
  championshipId: number | null;
  type: string;
}

export interface AdminChampionship {
  id: number;
  name: string;
  type: string;
  date: string;
  teamSize: number;
  start: string;
  end: string;
  size: number;
  enrolled: number;
  price: number;
  duration: number;
  status: MatchStatus;
}

export interface ChampionshipCreated {
  name: string;
  type: TypeChampionship;
  date: string;
  size: number;
  price: number;
  duration: number;
  teamSize: number;
}
export interface Enrollment {
  id: number;
  championship: string;
  price: number;
  status: string;
}

export interface EnrollmentReceipt extends Enrollment {
  receipt: string;
}

export interface LoggedUser {
  name: string;
  username: string;
  role: Role;
  access_token: string;
}

export interface ProfileUser {
  name: string;
  username: string;
  role: string;
}

export interface Championship {
  id: number;
  name: string;
  type: TypeChampionship;
  date: string;
  teamSize: number;
}

interface Match {
  id: number;
  date: string;
  start: string;
  end: string;
  status: MatchStatus;
  local: Team;
  visiting: Team;
}

interface Cards {
  red: number;
  yellow: number;
}
interface Team {
  name: string;
  logo: string;
  goals: number;
  cards: Cards;
}

export interface ChampionshipElimination {
  id: number;
  name: string;
  type: TypeChampionship;
  matches: Match[];
  next: {
    matches: Match[];
  };
}

export interface ChampionshipScore {
  type: string;
  id: number;
  name: string;
  matches: Match[];
}

export interface LeaderEnrollment {
  id: number;
  name: string;
  minimumSize: number;
  team: TeamEnrollment;
  enrollments: Enrollment[];
}

export interface TeamEnrollment {
  id: number;
  name: string;
  logo: string;
  players: Player[];
}

export interface Player {
  id: number;
  name: string;
  number: number;
  dni: number;
}
