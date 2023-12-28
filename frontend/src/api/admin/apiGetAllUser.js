import axiosClient from '../axiosClient';

const apiGetAllUser = {
    getAllUser() {
        const url = '/api/admin/user/all';
        return axiosClient.get(url);
    },
};
export default apiGetAllUser;
