import axiosClient from '../axiosClient';

const apiDelProduct = {
    deleteProduct(productId) {
        const url = `/api/admin/products/${productId}/delete`;
        return axiosClient.delete(url);
    },
};
export default apiDelProduct;
