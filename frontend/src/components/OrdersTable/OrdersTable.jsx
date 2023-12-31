import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import apiGetAllOrder from '~/api/admin/apiGetAllOrder';
import './style.scss';
import apiOrder from '~/api/admin/apiOrder';
import { Modal } from 'antd';

export default function OrdersTable() {
    const [orders, setOrders] = useState([]);
    console.log(orders);
    const [selectedOrderIds, setSelectedOrderIds] = useState([]);
    const [localStatus, setLocalStatus] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false); // Step 1
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const handleStatusChange = (newStatus, orderId) => {
        handleOrderSelect(orderId, newStatus);
        try {
            apiOrder.putOrder(orderId, newStatus);
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

    const getAllOrder = useCallback(async () => {
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
        getAllOrder();
    }, [getAllOrder]);

    const openModal = (orderId) => {
        console.log(orderId);
        setSelectedOrderId(orderId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedOrderId(null);
        setIsModalOpen(false);
    };
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
                            <TableCell className="custom-header-order">Order Deadline </TableCell>
                            <TableCell className="custom-header-order">ToTal Price</TableCell>
                            <TableCell className="custom-header-order">Status</TableCell>
                            <TableCell className="custom-header-order">Update</TableCell>
                            <TableCell className="custom-header-order">View</TableCell>
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
                                    {`${order?.shippingAddress?.streetAddress}, ${order?.shippingAddress?.city}`}
                                </TableCell>
                                <TableCell align="left" className="custom-cell-order">
                                    {new Date(order.orderDate).toLocaleString()}
                                </TableCell>
                                <TableCell align="left" className="custom-cell-order">
                                    {new Date(order.deliveryDate).toLocaleString()}
                                </TableCell>
                                <TableCell align="left" className="custom-cell-order">
                                    {order.totalDiscountedPrice.toLocaleString('it-IT', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
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
                                <TableCell align="left" className="custom-cell-order">
                                    <button
                                        type="button"
                                        style={{ background: 'transparent' }}
                                        onClick={(e) => openModal(order.id, e)}
                                    >
                                        <i className="fa fa-eye" aria-hidden="true"></i>
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <div className="w-[500px] h-[300px]">
                        <Modal
                            open={isModalOpen}
                            footer={[
                                <button key="cancel" onClick={closeModal} className="ant-btn">
                                    Cancel
                                </button>,
                            ]}
                            onCancel={closeModal}
                            width={950}
                            style={{ maxHeight: '60vh', overflow: 'auto' }}
                        >
                            <TableContainer component={Paper} variant="outlined" className="custom-table-container">
                                <Table aria-label="demo table" className="custom-table">
                                    <TableHead>
                                        <TableRow className="custom-header">
                                            <TableCell
                                                className="custom-header-order-user"
                                                style={{ textAlign: 'center' }}
                                            >
                                                Image
                                            </TableCell>
                                            <TableCell
                                                className="custom-header-order-user"
                                                style={{ textAlign: 'center' }}
                                            >
                                                Title
                                            </TableCell>
                                            <TableCell
                                                className="custom-header-order-user"
                                                style={{ textAlign: 'center' }}
                                            >
                                                Brand
                                            </TableCell>
                                            <TableCell
                                                className="custom-header-order-user"
                                                style={{ textAlign: 'center' }}
                                            >
                                                Size
                                            </TableCell>
                                            <TableCell
                                                className="custom-header-order-user"
                                                style={{ textAlign: 'center' }}
                                            >
                                                Quantity purchased
                                            </TableCell>
                                            <TableCell
                                                className="custom-header-order-user"
                                                style={{ textAlign: 'center' }}
                                            >
                                                Quantity remaining
                                            </TableCell>
                                            <TableCell
                                                className="custom-header-order-user"
                                                style={{ textAlign: 'center' }}
                                            >
                                                Price
                                            </TableCell>
                                            <TableCell
                                                className="custom-header-order-user"
                                                style={{ textAlign: 'center' }}
                                            >
                                                Total Price
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orders
                                            .find((order) => order.id === selectedOrderId)
                                            ?.orderItems.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell align="left" className="custom-cell-order-user-title">
                                                        <img
                                                            src={item.product.imageUrl}
                                                            alt=""
                                                            style={{ width: '70px', height: '70px' }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="left" className="custom-cell-order-user">
                                                        <span className="custom-cell-order-title">
                                                            {item.product.title}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell align="left" className="custom-cell-order-user">
                                                        <span className="custom-cell-order-title">
                                                            {item.product.brand.name}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell align="left" className="custom-cell-order-user">
                                                        <span className="custom-cell-order-title">{item.size}</span>
                                                    </TableCell>
                                                    <TableCell align="left" className="custom-cell-order-user">
                                                        <span className="custom-cell-order-title">{item.quantity}</span>
                                                    </TableCell>
                                                    <TableCell align="left" className="custom-cell-order-user">
                                                        <span className="custom-cell-order-title">
                                                            {item.product.sizes.find((size) => size.name === item.size)
                                                                ?.quantity || 0}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell align="left" className="custom-cell-order-user">
                                                        <span className="custom-cell-order-title">
                                                            {item.product.discountedPrice}
                                                        </span>
                                                    </TableCell>
                                                    <TableCell align="left" className="custom-cell-order-user">
                                                        <span className="custom-cell-order-title">
                                                            {item.discountedPrice}
                                                        </span>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Modal>
                    </div>
                </Table>
            </TableContainer>
        </div>
    );
}
