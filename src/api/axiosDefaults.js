import axios from "axios";

axios.defaults.baseURL = "https://pp5api-divingspace-f0baea7c564e.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();

const setAuthorizationHeader = (config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

axiosReq.interceptors.request.use(setAuthorizationHeader);
axiosRes.interceptors.request.use(setAuthorizationHeader);

const handleTokenRefresh = async () => {
  try {
    const response = await axios.post("/dj-rest-auth/token/refresh/");
    localStorage.setItem('authToken', response.data.access);
    return response.data.access;
  } catch (error) {
    localStorage.removeItem('authToken');
    throw error;
  }
};

axiosReq.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const newToken = await handleTokenRefresh();
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return axiosReq(error.config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

axiosRes.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const newToken = await handleTokenRefresh();
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return axiosRes(error.config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);