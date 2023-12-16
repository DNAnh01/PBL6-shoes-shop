import axiosClient from '../axiosClient';

const apiReviewDetail = {
    getReviewDetail(id) {
        const url = `/api/reviews/product/${id?.id}`;
        return axiosClient.get(url);
    },
};
export default apiReviewDetail;
