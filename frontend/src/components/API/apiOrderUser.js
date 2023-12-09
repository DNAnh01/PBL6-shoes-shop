import axiosClient from './axiosClient';

const apiOrderUser = {
    getOrderUser() {
        const url = `/orders/user`;
        return axiosClient.get(url);
    },
};
export default apiOrderUser;
