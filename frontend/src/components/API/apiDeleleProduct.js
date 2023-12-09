import axiosClient from "./axiosClient";

const apiDelproduct = {
  delProduct(id) {
    const url = `/admin/products/${id}/delete`;
    return axiosClient.delete(url);
  },
};
export default apiDelproduct;