import { AxiosInstance, AxiosResponse } from 'axios';
import { httpClient } from './httpClient';

class AdminService {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = httpClient;
  }

  createChampionship(championshipData: any): Promise<AxiosResponse<any>> {
    return this.httpClient.post('/admin/championship', championshipData);
  }

  getAdminChampionships(): Promise<AxiosResponse<any>> {
    return this.httpClient.get('/admin/championship');
  }

  getAdminChampionship(id: number): Promise<AxiosResponse<any>> {
    return this.httpClient.get(`/admin/championship/${id}`);
  }

  editChampionship(id: number, championshipData: any): Promise<AxiosResponse<any>> {
    return this.httpClient.patch(`/admin/championship/${id}`, championshipData);
  }

  startChampionships(id: number): Promise<AxiosResponse<any>> {
    return this.httpClient.get(`/admin/championship/${id}/start`);
  }
}

const API_ADMIN = new AdminService();

export { API_ADMIN };
