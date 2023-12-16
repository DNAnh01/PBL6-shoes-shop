import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import apiGetAllOrder from '~/api/admin/apiGetAllOrder';
import './style.scss'; // Import your CSS file
import _debounce from 'lodash/debounce';
import apiOrder from '~/api/admin/apiOrder';
// ... Import các thư viện và component khác ...

export default function OrdersTable() {
    const [orders, setOrders] = useState([]);
    const [selectedOrderIds, setSelectedOrderIds] = useState([]);
    const [localStatus, setLocalStatus] = useState({});

    // Hàm xử lý khi giá trị thay đổi sau một khoảng thời gian
    const handleStatusChangeDebounced = _debounce(async () => {
        try {
            // toast.success('Đang chờ thay đổi thông tin Order');
        } catch (error) {
            console.error(error);
        }
    });

    const handleStatusChange = (newStatus, orderId) => {
        handleOrderSelect(orderId, newStatus);
        handleStatusChangeDebounced();
        try {
            apiOrder.putOrder(orderId, newStatus);

            handleStatusChangeDebounced.flush();
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const handleOrderSelect = (orderId, newStatus) => {
        const isSelected = selectedOrderIds.includes(orderId);

        // Nếu orderId đã được chọn, loại bỏ nó, ngược lại thêm vào danh sách chọn
        if (isSelected) {
            setSelectedOrderIds((prevIds) => prevIds.filter((id) => id !== orderId));
        } else {
            setSelectedOrderIds((prevIds) => [...prevIds, orderId]);
        }

        // Cập nhật trạng thái của đơn hàng
        setOrders((prevOrders) =>
            prevOrders.map((prevOrder) =>
                prevOrder.id === orderId ? { ...prevOrder, orderStatus: newStatus } : prevOrder,
            ),
        );
    };

    const fetchData = useCallback(async () => {
        try {
            const response = await apiGetAllOrder.getAllOrder();
            setOrders(response.data);

            // Khởi tạo trạng thái local cho mỗi đơn hàng
            const localStatusMap = {};
            response.data.forEach((order) => {
                localStatusMap[order.id] = order.orderStatus;
            });
            setLocalStatus(localStatusMap);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div>
            <TableContainer component={Paper} variant="outlined" className="custom-table-container">
                <Table aria-label="demo table" className="custom-table">
                    <TableHead>
                        <TableRow className="custom-header">
                            <TableCell className="custom-header-order">Image</TableCell>
                            <TableCell className="custom-header-order">Title</TableCell>
                            <TableCell className="custom-header-order">Email</TableCell>
                            <TableCell className="custom-header-order">Address</TableCell>
                            <TableCell className="custom-header-order">Order Date</TableCell>
                            <TableCell className="custom-header-order">ToTal Price</TableCell>
                            <TableCell className="custom-header-order">Status</TableCell>
                            <TableCell className="custom-header-order">Update</TableCell>
                            {/* <TableCell className="custom-header-order">Delete</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.id} className="custom-cell">
                                <TableCell align="left" scope="row" className="custom-cell-order">
                                    <div className="custom-cell-order-title" style={{ display: 'grid' }}>
                                        {order?.orderItems?.map((item) => (
                                            <img src={item.product.imageUrl} alt="" style={{ width: '3rem' }} />
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell align="left" scope="row" className="custom-cell-order">
                                    <span className="custom-cell-order-title">
                                        {order?.orderItems?.map((item) => (
                                            <div key={item.id}>
                                                Product: {item.product.title}, Quantity: {item.quantity}
                                            </div>
                                        ))}
                                    </span>
                                </TableCell>
                                <TableCell align="left" className="custom-cell-order">
                                    {order.user.email}
                                </TableCell>
                                <TableCell align="left" className="custom-cell-order">
                                    {order?.shippingAddress?.streetAddress}
                                </TableCell>
                                <TableCell align="left" className="custom-cell-order">
                                    {new Date(order.deliveryDate).toLocaleString()}
                                </TableCell>
                                <TableCell align="left" className="custom-cell-order">
                                    {order.totalDiscountedPrice} VND
                                </TableCell>
                                <TableCell align="left" className="custom-cell-order">
                                    <span className="custom-status">{order.orderStatus.toUpperCase()}</span>
                                </TableCell>
                                <TableCell align="left" className="custom-cell-order">
                                    <select
                                        value={localStatus[order.id] || ''}
                                        onChange={(e) => {
                                            const newStatus = e.target.value;
                                            const orderId = order.id;
                                            handleStatusChange(newStatus, orderId);
                                        }}
                                    >
                                        <option value="">Update</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="canceled">Canceled</option>
                                    </select>
                                </TableCell>
                                {/* <TableCell align="left" className="custom-cell-order">
                                    <button className="custom-button">Delete</button>
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <div style={{ display: 'flex', justifyContent: 'center', margin: '30px' }}>
                <button onClick={handleSaveClick} className="custom-btn-ok">
                    Lưu
                </button>
            </div> */}
        </div>
    );
}
