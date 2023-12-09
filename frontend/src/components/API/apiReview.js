import axiosClient from "./axiosClient";

const apiCreateReview = {
  postCreateReview(data) {
    const url = "/reviews/create";
    return axiosClient.post(url, data);
  },
};
export default apiCreateReview;
