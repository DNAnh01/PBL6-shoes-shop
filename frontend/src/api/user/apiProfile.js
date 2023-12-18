import axiosClient from '../axiosClient';

const apiProfile = () => {
    const url = '/api/users/profile';
    return axiosClient.get(url);
};
export default apiProfile;
