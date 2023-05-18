import { AxiosInstance, AxiosResponse } from 'axios';
import { httpClient } from './httpClient';

class MatchService {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = httpClient;
  }

  getMatches(championshipId: number): Promise<AxiosResponse<any>> {
    return this.httpClient.get(`championship/${championshipId}/match`);
  }

  getMatch(championshipId: number, matchId: number): Promise<AxiosResponse<any>> {
    return this.httpClient.get(`championship/${championshipId}/match/${matchId}`);
  }
}

const API_MATCH = new MatchService();

export { API_MATCH };
