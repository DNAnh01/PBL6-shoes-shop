import axiosClient from '../axiosClient';

const apiCart = {
    getAllCart() {
        const url = '/api/cart/';
        return axiosClient.get(url);
    },
};
export default apiCart;
