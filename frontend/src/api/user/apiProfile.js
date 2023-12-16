import axiosClient from '../axiosClient';

const apiProfile = {
    getProfile() {
        const url = '/api/users/profile';
        return axiosClient.get(url);
    },
};
export default apiProfile;
