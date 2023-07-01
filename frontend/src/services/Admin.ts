import { AxiosInstance, AxiosResponse } from 'axios';
import { AdminChampionship, ChampionshipCreated, CreateChampionship } from '../interfaces';
import { httpClient } from './httpClient';

class AdminService {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = httpClient;
  }

  createChampionship(championshipData: CreateChampionship): Promise<AxiosResponse<ChampionshipCreated>> {
    return this.httpClient.post('/admin/championship', championshipData);
  }

  getAdminChampionships(): Promise<AxiosResponse<AdminChampionship[]>> {
    return this.httpClient.get('/admin/championship');
  }

  getToStartMatches(championshipId: number): Promise<AxiosResponse<any>> {
    return this.httpClient.get(`/admin/championship/${championshipId}/match`);
  }

  getAdminChampionship(id: number): Promise<AxiosResponse<AdminChampionship>> {
    return this.httpClient.get(`/admin/championship/${id}`);
  }

  addMatchDates(championshipId: number, matchDates: any[]) {
    return this.httpClient.put(`/admin/championship/${championshipId}/match`, { matchDates: matchDates });
  }

  editChampionship(
    id: number,
    championshipData: CreateChampionship,
  ): Promise<AxiosResponse<AdminChampionship>> {
    return this.httpClient.patch(`/admin/championship/${id}`, championshipData);
  }

  startChampionship(id: number): Promise<AxiosResponse<AdminChampionship>> {
    return this.httpClient.patch(`/admin/championship/${id}/start`);
  }
}

const API_ADMIN = new AdminService();

export { API_ADMIN };
