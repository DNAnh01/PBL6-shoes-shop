import axiosClient from './axiosClient';

const apiUpdateProduct = {
    putUpdateProduct(id, data) {
        const url = `/admin/products/${id}/update`;
        return axiosClient.put(url, data);
    },
};
export default apiUpdateProduct;
