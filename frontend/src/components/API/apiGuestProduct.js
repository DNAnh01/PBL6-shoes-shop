import axiosClient from './axiosClient';
import axiosClientGuest from './axiosClientGuest';

const apiGuestProduct = {
    getAllProduct() {
        const url = '/guest/products/';
        return axiosClientGuest.get(url);
    },
};
export default apiGuestProduct;
