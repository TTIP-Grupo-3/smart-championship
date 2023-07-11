import { AxiosInstance, AxiosResponse } from 'axios';
import {
  LeaderEnrollment,
  LoggedUser,
  Player,
  TeamEnrollment,
  TeamLeaderTournament,
  EnrollChampionship,
  TeamLeaderData,
  PlayerCreate,
} from '../interfaces';
import { httpClient } from './httpClient';

class TeamLeaderService {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = httpClient;
  }

  register(userData: TeamLeaderData): Promise<AxiosResponse<LoggedUser>> {
    return this.httpClient.post('/team_leader', userData);
  }

  enrollToChampionship(championshipId: number): Promise<AxiosResponse<EnrollChampionship>> {
    return this.httpClient.post(`/team_leader/championship/${championshipId}/enrollment`);
  }

  championshipsToEnroll(): Promise<AxiosResponse<TeamLeaderTournament[]>> {
    return this.httpClient.get('/team_leader/championship');
  }

  championshipToEnroll(id: number): Promise<AxiosResponse<TeamLeaderTournament>> {
    return this.httpClient.get(`/team_leader/championship/${id}`);
  }

  getTeamLeader(): Promise<AxiosResponse<LeaderEnrollment>> {
    return this.httpClient.get('/team_leader');
  }

  createTeam(dataTeam: FormData): Promise<AxiosResponse<TeamEnrollment>> {
    return this.httpClient.post('/team_leader/team', dataTeam);
  }

  getPlayers(): Promise<AxiosResponse<Player[]>> {
    return this.httpClient.get(`/team_leader/player`);
  }

  deletePlayers(ids: number[]): Promise<AxiosResponse<Player>> {
    return this.httpClient.delete(`/team_leader/player`, { data: { ids: ids } });
  }
  createPlayer(dataPlayer: PlayerCreate): Promise<AxiosResponse<Player>> {
    return this.httpClient.post(`/team_leader/player`, dataPlayer);
  }

  getEnrollment(championshipId: number, enrollmentId: number): Promise<AxiosResponse<any>> {
    return this.httpClient.get(`/team_leader/championship/${championshipId}/enrollment/${enrollmentId}`);
  }

  uploadReceipt(
    championshipId: number,
    enrollId: number,
    formdata: FormData,
  ): Promise<AxiosResponse<EnrollChampionship>> {
    return this.httpClient.put(
      `/team_leader/championship/${championshipId}/enrollment/${enrollId}`,
      formdata,
    );
  }
}

const API_TEAM_LEADER = new TeamLeaderService();

export { API_TEAM_LEADER };
