// Trong apiBuyNow.js
import axiosClient from './axiosClient';

const apiBuyNow = {
    postBuyNow() {
        const url = `/payment/submitOrder?orderInfo=thanh toan`;
        return axiosClient.post(url);
    },
};

export default apiBuyNow;
