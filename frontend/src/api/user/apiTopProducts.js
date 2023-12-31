import axiosClient from '../axiosClient';

const apiTopProducts = {
    getTopNewProducts() {
        const url = `/api/products/get-top-new-products`;
        return axiosClient.get(url);
    },
    getTopSellingProducts() {
        const url = `/api/products/get-top-selling-products`;
        return axiosClient.get(url);
    },
    getTopRatingProducts() {
        const url = `/api/products/get-top-rating-products`;
        return axiosClient.get(url);
    },
};

export default apiTopProducts;
