import axios from 'axios';

const api_instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export default api_instance;
