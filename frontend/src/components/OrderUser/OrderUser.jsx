import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import './style.scss';
import apiOrderUser from '../API/apiOrderUser';

export default function OrderUser() {
    const [userOrders, setUserOrders] = useState([]);
    console.log(userOrders);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Assuming apiOrderByID.getOrderByID(id) returns a promise
                const response = await apiOrderUser.getOrderUser();

                // Assuming the response.data contains the relevant order information
                setUserOrders(response.data);
            } catch (error) {
                console.error('Error fetching order data:', error);
                // Handle the error, e.g., show a toast error message
            }
        };

        fetchData(); // Call fetchData when the component mounts
    }, []);
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    return (
        <div>
            <TableContainer component={Paper} variant="outlined" className="custom-table-container container-layout">
                <Table aria-label="demo table" className="custom-table">
                    <TableHead>
                        <TableRow className="custom-header">
                            {/* <TableCell className="custom-header-order-user" style={{ textAlign: 'center' }}>
                                Image
                            </TableCell> */}
                            <TableCell className="custom-header-order-user" style={{ textAlign: 'center' }}>
                                Title
                            </TableCell>
                            <TableCell className="custom-header-order-user" style={{ textAlign: 'center' }}>
                                Address
                            </TableCell>
                            <TableCell className="custom-header-order-user" style={{ textAlign: 'center' }}>
                                Mobile
                            </TableCell>
                            <TableCell className="custom-header-order-user" style={{ textAlign: 'center' }}>
                                Order Date
                            </TableCell>
                            <TableCell className="custom-header-order-user" style={{ textAlign: 'center' }}>
                                ToTal Price
                            </TableCell>
                            <TableCell className="custom-header-order-user" style={{ textAlign: 'center' }}>
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userOrders.length > 0 &&
                            userOrders.map((order) =>
                                // Assuming an order can have multiple items
                                order.orderItems.map((item) => (
                                    <TableRow key={item.id} className="custom-cell">
                                        {/* <TableCell align="left" className="custom-cell-order-user">
                                            <img src={item.product.imageUrl} alt=""></img>
                                        </TableCell> */}
                                        <TableCell align="left" scope="row" className="custom-cell-order-user-title">
                                            <span className="custom-cell-order-title">{item.product.title}</span>
                                        </TableCell>

                                        {/* Map over addresses array */}
                                        {order.user.addresses.map((address) => (
                                            <>
                                                <TableCell
                                                    key={address.id}
                                                    align="left"
                                                    className="custom-cell-order-user"
                                                >
                                                    {`${address.streetAddress} ${address.city}`}
                                                </TableCell>
                                                <TableCell align="left" className="custom-cell-order-user">
                                                    {order.user.mobile}
                                                </TableCell>
                                            </>
                                        ))}

                                        <TableCell align="left" className="custom-cell-order-user">
                                            {formatDate(order.orderDate)}
                                        </TableCell>
                                        <TableCell align="left" className="custom-cell-order-user">
                                            {item.discountedPrice}
                                        </TableCell>
                                        <TableCell align="left" className="custom-cell-order-user">
                                            <span className="custom-status">{order.orderStatus}</span>
                                        </TableCell>
                                    </TableRow>
                                )),
                            )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
