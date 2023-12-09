import axiosClient from './axiosClient';

const apiOrder = {
    putOrder(id, newStatus) {
        // Kiểm tra id và newStatus trước khi gửi yêu cầu
        if (id && newStatus) {
            const url = `/admin/orders/${id}/${newStatus}`;
            return axiosClient.put(url);
        } else {
            // Xử lý lỗi hoặc trả về promise báo lỗi
            return Promise.reject(new Error('Invalid id or newStatus'));
        }
    },
};

export default apiOrder;
