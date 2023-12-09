import axiosClient from './axiosClient';

const apiCart = {
    getAllCart() {
        const url = '/cart/';
        return axiosClient.get(url);
    },
};
export default apiCart;
