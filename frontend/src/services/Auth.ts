import { AxiosInstance, AxiosResponse } from 'axios';
import { LoggedUser, ProfileUser, User } from '../interfaces';
import { httpClient } from './httpClient';

class AuthService {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = httpClient;
  }

  login(user: User): Promise<AxiosResponse<LoggedUser>> {
    return this.httpClient.post('/auth/login', user);
  }

  profile(): Promise<AxiosResponse<ProfileUser>> {
    return this.httpClient.get('/auth/profile');
  }
}

const API_AUTH = new AuthService();

export { API_AUTH };
