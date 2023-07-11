import { AxiosInstance, AxiosResponse } from 'axios';
import { Match } from '../interfaces';
import { httpClient } from './httpClient';

class MatchService {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = httpClient;
  }

  getMatches(championshipId: number): Promise<AxiosResponse<Match[]>> {
    return this.httpClient.get(`championship/${championshipId}/match`);
  }
}

const API_MATCH = new MatchService();

export { API_MATCH };
