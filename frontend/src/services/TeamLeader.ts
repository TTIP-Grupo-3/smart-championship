import { AxiosInstance, AxiosResponse } from 'axios';
import { httpClient } from './httpClient';

class TeamLeaderService {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = httpClient;
  }

  register(userData: any): Promise<AxiosResponse<any>> {
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

  uploadReceipt(championshipId: number, enrollId: number): Promise<AxiosResponse<any>> {
    return this.httpClient.put(`/team_leader/championship/${championshipId}/enrollment/${enrollId}`);
  }
}

const API_TEAM_LEADER = new TeamLeaderService();

export { API_TEAM_LEADER };
