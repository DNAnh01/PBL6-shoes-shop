import axiosClient from '../axiosClient';

const apiCreateReview = {
    postCreateReview(data) {
        const url = '/api/reviews/create';
        return axiosClient.post(url, data);
    },
};
export default apiCreateReview;
