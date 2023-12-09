import axiosClient from './axiosClient';
import axiosClientGuest from './axiosClientGuest';

const apiProductDetail = {
    getProductDetail(id) {
        const url = `/guest/products/id/${id}`;
        return axiosClientGuest.get(url);
    },
};
export default apiProductDetail;
