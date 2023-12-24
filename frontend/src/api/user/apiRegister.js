import axios from 'axios';

const apiRegister = {
    postRegister(data) {
        const url = 'https://pbl6-shoes-shop-production-f927.up.railway.app/auth/signup';
        return axios.post(url, data);
    },
};
export default apiRegister;
