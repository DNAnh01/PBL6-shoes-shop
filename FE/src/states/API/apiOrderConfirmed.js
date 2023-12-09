import axiosClient from './axiosClient';

const apiOrderConfirmed = {
    putOrderConfirmed(id) {
        const url = `/admin/orders/${id}/confirmed`;
        return axiosClient.put(url);
    },
};
export default apiOrderConfirmed;
