import axios from 'axios';

const httpClient = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER_URL,
});
httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // eslint-disable-next-line no-underscore-dangle
    if (error.response !== undefined && error.response.status === 401 && !originalRequest._retry) {
      // eslint-disable-next-line no-underscore-dangle
      originalRequest._retry = true;

      localStorage.clear();
      window.location.href = `${window.location.origin}/login`;

      return httpClient(originalRequest);
    }

    return Promise.reject(error);
  },
);

export { httpClient };
