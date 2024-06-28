import axios from "axios";

axios.defaults.baseURL = "https://pp5api-divingspace-f0baea7c564e.herokuapp.com/";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();

axiosReq.defaults.headers['Content-Type'] = 'multipart/form-data';
