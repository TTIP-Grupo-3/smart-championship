import { AxiosInstance, AxiosResponse } from 'axios';
import { httpClient } from './httpClient';

class AdminEnrollmentService {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = httpClient;
  }

  getAdminEnrollments(championshipId: number): Promise<AxiosResponse<any>> {
    return this.httpClient.get(`/admin/championship/${championshipId}/enrollment`);
  }

  getAdminEnrollment(championshipId: number, id: number): Promise<AxiosResponse<any>> {
    return this.httpClient.get(`/admin/championship/${championshipId}/enrollment/${id}`);
  }

  confirmEnrollment(championshipId: number, id: number): Promise<AxiosResponse<any>> {
    return this.httpClient.patch(`/admin/championship/${championshipId}/enrollment/${id}/accept`);
  }

  rejectEnrollment(championshipId: number, id: number): Promise<AxiosResponse<any>> {
    return this.httpClient.patch(`/admin/championship/${championshipId}/enrollment/${id}/reject`);
  }
}

const API_ADMIN_ENROLLMENT = new AdminEnrollmentService();

export { API_ADMIN_ENROLLMENT };
