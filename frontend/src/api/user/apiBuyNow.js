// Trong apiBuyNow.js

import axiosClient from '../axiosClient';

const apiBuyNow = {
    postBuyNow(data) {
        const url = `/api/payment/submitOrder`;
        return axiosClient.post(url, data);
    },
};

export default apiBuyNow;
