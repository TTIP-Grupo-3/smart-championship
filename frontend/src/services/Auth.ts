import { AxiosInstance, AxiosResponse } from 'axios';
import { User } from '../interfaces';
import { httpClient } from './httpClient';

class AuthService {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = httpClient;
  }

  login(user: User): Promise<AxiosResponse<any>> {
    return this.httpClient.post('/auth/login', user);
  }
}

const API_AUTH = new AuthService();

export { API_AUTH };