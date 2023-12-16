import axiosClient from '../axiosClient';

const apiProductDetail = {
    getProductDetail(id) {
        const url = `/api/products/id/${id}`;
        return axiosClient.get(url);
    },
};
export default apiProductDetail;
