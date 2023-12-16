import axiosClient from '../axiosClient';

const apiAddProduct = {
    postAddProduct(data) {
        console.log(data);
        const url = '/api/admin/products/';
        return axiosClient.post(url, data);
    },
};
export default apiAddProduct;
