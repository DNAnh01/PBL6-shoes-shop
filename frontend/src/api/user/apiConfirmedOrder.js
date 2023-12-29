import axiosClient from '../axiosClient';

const apiConfirmedOrder = {
    postConfirmedOrder(data) {
        const url = `/api/payment/confirmOrder`;
        return axiosClient.post(url, data);
    },
};

export default apiConfirmedOrder;
