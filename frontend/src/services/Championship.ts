import { AxiosInstance, AxiosResponse } from 'axios';
import { httpClient } from './httpClient';

class Championship {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = httpClient;
  }

  getChampionship(): Promise<AxiosResponse<any>> {
    return this.httpClient.get('/championship');
  }
}

const API = new Championship();

export { API };
