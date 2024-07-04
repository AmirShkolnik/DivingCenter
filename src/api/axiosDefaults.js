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
    localStorage.setItem('tokenExpiry', new Date().getTime() + (response.data.expires_in * 1000));
    return response.data.access;
  } catch (error) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('tokenExpiry');
    throw error;
  }
};

const createResponseInterceptor = (axiosInstance) => {
  const interceptor = axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        axiosInstance.interceptors.response.eject(interceptor);
        try {
          const newToken = await handleTokenRefresh();
          error.config.headers.Authorization = `Bearer ${newToken}`;
          return axiosInstance(error.config);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        } finally {
          createResponseInterceptor(axiosInstance);
        }
      }
      return Promise.reject(error);
    }
  );
};

createResponseInterceptor(axiosReq);
createResponseInterceptor(axiosRes);