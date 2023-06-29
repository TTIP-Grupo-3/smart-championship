import { AxiosInstance, AxiosResponse } from 'axios';
import { AdminChampionship, ChampionshipCreated } from '../interfaces';
import { httpClient } from './httpClient';

class AdminService {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = httpClient;
  }

  createChampionship(championshipData: any): Promise<AxiosResponse<ChampionshipCreated>> {
    return this.httpClient.post('/admin/championship', championshipData);
  }

  getAdminChampionships(): Promise<AxiosResponse<AdminChampionship[]>> {
    return this.httpClient.get('/admin/championship');
  }

  getAdminChampionship(id: number): Promise<AxiosResponse<AdminChampionship>> {
    return this.httpClient.get(`/admin/championship/${id}`);
  }

  editChampionship(id: number, championshipData: any): Promise<AxiosResponse<AdminChampionship>> {
    return this.httpClient.patch(`/admin/championship/${id}`, championshipData);
  }

  startChampionship(id: number): Promise<AxiosResponse<AdminChampionship>> {
    return this.httpClient.patch(`/admin/championship/${id}/start`);
  }
}

const API_ADMIN = new AdminService();

export { API_ADMIN };
