import axiosClient from '../axiosClient';

const apiOrderShipped = {
    putOrderShipped(id) {
        const url = `/api/admin/orders/${id}/shipped`;
        return axiosClient.put(url);
    },
};
export default apiOrderShipped;
