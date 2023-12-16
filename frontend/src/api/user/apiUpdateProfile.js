import axiosClient from '../axiosClient';

const apiUpdateProfile = {
    putUpdateprofile(data) {
        const url = '/api/users/update';
        return axiosClient.put(url, data);
    },
};
export default apiUpdateProfile;
