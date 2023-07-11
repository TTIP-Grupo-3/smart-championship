import { AxiosInstance, AxiosResponse } from 'axios';
import { Championship, ChampionshipTournament } from '../interfaces';
import { httpClient } from './httpClient';

class ChampionshipService {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = httpClient;
  }

  getChampionships(): Promise<AxiosResponse<Championship[]>> {
    return this.httpClient.get('/championship');
  }

  getChampionshipId(id: number): Promise<AxiosResponse<ChampionshipTournament>> {
    return this.httpClient.get(`/championship/${id}`);
  }
}

const API = new ChampionshipService();

export { API };
