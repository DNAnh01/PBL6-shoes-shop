import axiosClient from './axiosClient';

const apiProfile = {
    getProfile() {
        const url = '/users/profile';
        return axiosClient.get(url);
    },
};
export default apiProfile;
