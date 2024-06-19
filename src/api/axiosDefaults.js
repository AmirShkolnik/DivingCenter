import axios from "axios";

axios.defaults.baseURL = "https://pp5api-divingspace-f0baea7c564e.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;