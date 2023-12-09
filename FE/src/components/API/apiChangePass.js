import axiosClient from './axiosClient';

const apiChangePass = {
    postChangepass(data) {
        const url = '/users/change-password';
        return axiosClient.post(url, data);
    },
};
export default apiChangePass;
