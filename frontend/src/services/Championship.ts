import { AxiosInstance, AxiosResponse } from 'axios';
import { httpClient } from './httpClient';

class ChampionshipService {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = httpClient;
  }

  getChampionships(): Promise<AxiosResponse<any>> {
    return this.httpClient.get('/championship');
  }
}

const API = new ChampionshipService();

export { API };
