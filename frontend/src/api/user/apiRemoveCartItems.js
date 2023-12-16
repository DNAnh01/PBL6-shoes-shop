import axiosClient from '../axiosClient';

const apiRemoveCartItems = {
    delRemoveCartItems(id) {
        const url = `/api/cart_items/${id}`;
        return axiosClient.delete(url);
    },
};
export default apiRemoveCartItems;
