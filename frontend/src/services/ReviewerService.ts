import { AxiosInstance, AxiosResponse } from 'axios';
import { httpClient } from './httpClient';

class ReviewerService {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = httpClient;
  }

  getReviewableMatches(championshipId: number): Promise<AxiosResponse<any>> {
    return this.httpClient.get(`/reviewer/championship/${championshipId}/match`);
  }

  getReviewableMatch(championshipId: number, matchId: number): Promise<AxiosResponse<any>> {
    return this.httpClient.get(`reviewer/championship/${championshipId}/match/${matchId}`);
  }
}

const API_REVIEWER = new ReviewerService();

export { API_REVIEWER };
