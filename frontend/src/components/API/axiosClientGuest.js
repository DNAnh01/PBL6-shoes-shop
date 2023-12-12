import axios from 'axios';

const axiosClientGuest = axios.create({
    baseURL: 'https://pbl6-shoes-shop-production-0dfd.up.railway.app/api',
});

// Add a request interceptor
axiosClientGuest.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
axiosClientGuest.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    },
);

export default axiosClientGuest;
