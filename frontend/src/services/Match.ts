import { AxiosInstance, AxiosResponse } from 'axios';
import { httpClient } from './httpClient';

class MatchService {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = httpClient;
  }

  getMatches(championshipId: number, type: string): Promise<AxiosResponse<any>> {
    return this.httpClient.get(`championship/${type}/${championshipId}/match`);
  }

  getMatch(championshipId: number, matchId: number, type: string): Promise<AxiosResponse<any>> {
    return this.httpClient.get(`championship/${type}/${championshipId}/match/${matchId}`);
  }
}

const API_MATCH = new MatchService();

export { API_MATCH };
