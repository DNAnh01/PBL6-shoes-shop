import axiosClient from '../axiosClient';

const apiUpdateCartItems = {
    putUpdateCartItems(id, data) {
        const url = `/api/cart_items/${id}`;
        return axiosClient.put(url, data);
    },
};
export default apiUpdateCartItems;
