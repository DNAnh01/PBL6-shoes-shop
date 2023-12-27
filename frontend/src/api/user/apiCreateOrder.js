import axiosClient from '../axiosClient';

const apiCreateOrder = {
    postCreateOrder(data) {
        const url = '/api/orders/';
        return axiosClient.post(url, data);
    },
};
export default apiCreateOrder;
