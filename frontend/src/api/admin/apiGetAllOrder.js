import axiosClient from '../axiosClient';

const apiGetAllOrder = {
    getAllOrder() {
        const url = '/api/admin/orders/';
        return axiosClient.get(url);
    },
};
export default apiGetAllOrder;
