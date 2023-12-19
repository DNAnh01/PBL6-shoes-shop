// Trong apiBuyNow.js

import axiosClient from '../axiosClient';

const apiBuyNow = {
    postBuyNow() {
        const url = `/api/payment/submitOrder`;
        return axiosClient.post(url);
    },
};

export default apiBuyNow;
