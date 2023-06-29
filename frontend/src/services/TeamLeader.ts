import { AxiosInstance, AxiosResponse } from 'axios';
import { LeaderEnrollment, LoggedUser } from '../interfaces';
import { httpClient } from './httpClient';

class TeamLeaderService {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = httpClient;
  }

  register(userData: any): Promise<AxiosResponse<LoggedUser>> {
    return this.httpClient.post('/team_leader', userData);
  }

  enrollToChampionship(championshipId: number): Promise<AxiosResponse<any>> {
    return this.httpClient.post(`/team_leader/championship/${championshipId}/enrollment`);
  }

  championshipsToEnroll(): Promise<AxiosResponse<any>> {
    return this.httpClient.get('/team_leader/championship');
  }

  championshipToEnroll(id: number): Promise<AxiosResponse<any>> {
    return this.httpClient.get(`/team_leader/championship/${id}`);
  }

  getTeamLeader(): Promise<AxiosResponse<LeaderEnrollment>> {
    return this.httpClient.get('/team_leader');
  }

  uploadReceipt(championshipId: number, enrollId: number, formdata: FormData): Promise<AxiosResponse<any>> {
    return this.httpClient.put(
      `/team_leader/championship/${championshipId}/enrollment/${enrollId}`,
      formdata,
    );
  }
}

const API_TEAM_LEADER = new TeamLeaderService();

export { API_TEAM_LEADER };