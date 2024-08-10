import axios from 'axios';

axios.defaults.baseURL =
  'https://pp5api-divingspace-f0baea7c564e.herokuapp.com/';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 403:
          window.location = '/403';
          break;
        case 500:
          window.location = '/500';
          break;
        default:
          break;
      }
    } else if (error.request) {
      // The request was made but no response was received
    }
    return Promise.reject(error);
  }
);
