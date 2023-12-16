import axiosClient from '../axiosClient';

const apiOrderUser = {
    getOrderUser() {
        const url = `/api/orders/user`;
        return axiosClient.get(url);
    },
};
export default apiOrderUser;
