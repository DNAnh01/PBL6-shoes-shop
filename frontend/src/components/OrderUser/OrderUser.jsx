import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiOrderUser from '~/api/user/apiOrderUser';
import './style.scss';

export default function OrderUser() {
    const [toggleDetail, setToggleDetail] = useState(false);
    const [userOrders, setUserOrders] = useState([]);
    const [orderDetail, setOrderDetail] = useState([]);

    const getOrderHistory = async () => {
        try {
            const response = await apiOrderUser.getOrderUser();

            setUserOrders(response.data);
        } catch (error) {
            console.error('Error fetching order data:', error);
            // Handle the error, e.g., show a toast error message
        }
    };

    useEffect(() => {
        getOrderHistory();
    }, []);
    return (
        <div>
            {userOrders.length > 0 ? (
                <TableContainer
                    component={Paper}
                    variant="outlined"
                    className="custom-table-container container-layout"
                >
                    <Table aria-label="demo table" className="custom-table">
                        <TableHead>
                            <TableRow className="custom-header">
                                <TableCell className="custom-header-order-user" style={{ textAlign: 'center' }}>
                                    Email
                                </TableCell>
                                <TableCell className="custom-header-order-user" style={{ textAlign: 'center' }}>
                                    Address
                                </TableCell>
                                <TableCell className="custom-header-order-user" style={{ textAlign: 'center' }}>
                                    Phone
                                </TableCell>
                                <TableCell className="custom-header-order-user" style={{ textAlign: 'center' }}>
                                    Date
                                </TableCell>
                                <TableCell className="custom-header-order-user" style={{ textAlign: 'center' }}>
                                    ToTal Price
                                </TableCell>
                                <TableCell className="custom-header-order-user" style={{ textAlign: 'center' }}>
                                    Status
                                </TableCell>
                                <TableCell className="custom-header-order-user" style={{ textAlign: 'center' }}>
                                    Detail
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userOrders.length > 0 &&
                                userOrders.map((order, index) => (
                                    <TableRow key={index} className="custom-cell">
                                        <TableCell align="left" scope="row" className="custom-cell-order-user-title">
                                            <span className="custom-cell-order-title">{order.user.email}</span>
                                        </TableCell>

                                        <TableCell align="left" className="custom-cell-order-user">
                                            <span className="custom-cell-order-title">{`${order.shippingAddress.streetAddress}, ${order.shippingAddress.city}`}</span>
                                        </TableCell>
                                        <TableCell align="left" className="custom-cell-order-user">
                                            <span className="custom-cell-order-title">{order.user.mobile}</span>
                                        </TableCell>

                                        <TableCell align="left" className="custom-cell-order-user">
                                            <span className="custom-cell-order-title">
                                                {format(new Date(order.orderDate), 'dd/MM/yyyy hh:mm:ss')}
                                            </span>
                                        </TableCell>
                                        <TableCell align="left" className="custom-cell-order-user">
                                            <span className="custom-cell-order-title">
                                                {order.totalDiscountedPrice.toLocaleString('it-IT', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}
                                            </span>
                                        </TableCell>
                                        <TableCell align="left" className="custom-cell-order-user">
                                            <span className="custom-status">{order?.orderStatus}</span>
                                        </TableCell>
                                        <TableCell
                                            onClick={() => {
                                                setToggleDetail((prev) => !prev);
                                                setOrderDetail(order?.orderItems);
                                            }}
                                            align="left"
                                            className="custom-cell-order-user"
                                        >
                                            <button type="button" style={{ background: 'transparent' }}>
                                                <i className="fa fa-eye" aria-hidden="true"></i>
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <img
                    src="https://dl.dropboxusercontent.com/scl/fi/kna31jdkojgdfo81lxhmt/e8d986243b69af8a5323e3a4c41402b3.png?rlkey=7klaetgqboc4yt62dwtp9a9jt&dl=0"
                    alt="No products"
                    style={{ display: 'block', margin: 'auto', width: '40%', height: 'auto' }}
                />
            )}
            {toggleDetail ? (
                <div>
                    <h1 className="orderDetail container-layout">Chi tiết đơn hàng</h1>
                    <TableContainer
                        component={Paper}
                        variant="outlined"
                        className="custom-table-container container-layout"
                    >
                        <Table aria-label="demo table" className="custom-table">
                            <TableHead>
                                <TableRow className="custom-header">
                                    <TableCell className="custom-header-order-user" style={{ textAlign: 'center' }}>
                                        Image
                                    </TableCell>
                                    <TableCell className="custom-header-order-user" style={{ textAlign: 'center' }}>
                                        Title
                                    </TableCell>
                                    <TableCell className="custom-header-order-user" style={{ textAlign: 'center' }}>
                                        Brand
                                    </TableCell>
                                    <TableCell className="custom-header-order-user" style={{ textAlign: 'center' }}>
                                        Size
                                    </TableCell>
                                    <TableCell className="custom-header-order-user" style={{ textAlign: 'center' }}>
                                        Quantity
                                    </TableCell>
                                    <TableCell className="custom-header-order-user" style={{ textAlign: 'center' }}>
                                        Price
                                    </TableCell>
                                    <TableCell className="custom-header-order-user" style={{ textAlign: 'center' }}>
                                        Total Price
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderDetail.length > 0 &&
                                    orderDetail.map((order, index) => (
                                        <TableRow key={index} className="custom-cell">
                                            <TableCell
                                                align="left"
                                                scope="row"
                                                className="custom-cell-order-user-title"
                                            >
                                                <Link to={`/product/${order.product.id}`}>
                                                    <img
                                                        src={order.product.imageUrl}
                                                        alt=""
                                                        style={{ width: '70px', height: '70px' }}
                                                    />
                                                </Link>
                                            </TableCell>

                                            <TableCell align="left" className="custom-cell-order-user">
                                                <Link to={`/product/${order.product.id}`}>
                                                    <span className="custom-cell-order-title">
                                                        {order.product.title}
                                                    </span>
                                                </Link>
                                            </TableCell>
                                            <TableCell align="left" className="custom-cell-order-user">
                                                <span className="custom-cell-order-title">
                                                    {order.product.brand.name}
                                                </span>
                                            </TableCell>
                                            <TableCell align="left" className="custom-cell-order-user">
                                                <span className="custom-cell-order-title">{order.size}</span>
                                            </TableCell>
                                            <TableCell align="left" className="custom-cell-order-user">
                                                <span className="custom-cell-order-title">{order.quantity}</span>
                                            </TableCell>
                                            <TableCell align="left" className="custom-cell-order-user">
                                                <span className="custom-cell-order-title">
                                                    {order.product.discountedPrice}
                                                </span>
                                            </TableCell>
                                            <TableCell align="left" className="custom-cell-order-user">
                                                <span className="custom-cell-order-title">{order.discountedPrice}</span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            ) : (
                ''
            )}
        </div>
    );
}
