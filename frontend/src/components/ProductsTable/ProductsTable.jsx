import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames/bind';
import styles from './ProductsTable.module.scss';

import { deleteProduct, findProducts } from '~/states/Product/Action';
import Button from '../Button';
import { toast, ToastContainer } from 'react-toastify';

const cx = classNames.bind(styles);
const ProductsTable = ({ handleProductUpdate }) => {
    const dispatch = useDispatch();
    const { products } = useSelector((store) => store);
    const jwt = localStorage.getItem('jwt');
    const [selectedProduct, setSelectedProduct] = useState(null); // State to store selected product

    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState(0);

    const handleProductDelete = (productId) => {
        dispatch(deleteProduct(productId));
    };
    const handleProductUpdateClick = (product) => {
        // You can navigate to the update page or open a modal here
        // For example, set the selected product in state
        console.log(product);
        setSelectedProduct(product);
        handleProductUpdate(product);
    };

    useEffect(() => {
        const data = {
            color: [],
            size: [],
            minPrice: 0,
            maxPrice: 10000000,
            minDiscount: 0,
            brand: [],
            stock: null,
            sort: 'price_low',
            pageNumber: 0,
            pageSize: 100,
        };

        dispatch(findProducts(data));
    }, [jwt, dispatch, currentPage, products?.deletedProduct]);

    const totalPages = Math.ceil((products?.products?.totalElements || 0) / pageSize);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    return (
        <div>
            <ToastContainer />
            <TableContainer component={Paper} variant="outlined">
                <Table aria-label="demo table">
                    <TableHead className={cx('table-head')}>
                        <TableRow className={cx('head-row')}>
                            <TableCell className={cx('image')}>Image</TableCell>
                            <TableCell className={cx('brand')}>Brand</TableCell>
                            <TableCell className={cx('title')}>Title</TableCell>
                            <TableCell className={cx('description')}>Description</TableCell>
                            <TableCell className={cx('price')}>Price</TableCell>
                            <TableCell className={cx('quantity')}>Quantity</TableCell>
                            <TableCell className={cx('action')}>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody className={cx('table-body')}>
                        {products?.products?.content
                            ?.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                            .map((item) => (
                                <TableRow key={item?.id} className={cx('body-row')}>
                                    <TableCell className={cx('image')}>
                                        {<img className={cx('product-img')} src={item?.imageUrl} alt="" />}
                                    </TableCell>
                                    <TableCell className={cx('brand')}>
                                        {<img className={cx('brand-img')} src={item?.brand?.imageUrl} alt="" />}
                                    </TableCell>
                                    <TableCell className={cx('title')}>
                                        {item?.title?.length > 20 ? `${item?.title?.substring(0, 20)}...` : item?.title}
                                    </TableCell>
                                    <TableCell className={cx('description')}>
                                        {item?.description?.length > 50
                                            ? `${item?.description?.substring(0, 50)}...`
                                            : item?.description}
                                    </TableCell>
                                    <TableCell className={cx('price')}>{item?.price}</TableCell>
                                    <TableCell className={cx('quantity')}>{item?.quantity}</TableCell>
                                    <TableCell className={cx('action')}>
                                        <Button
                                            small
                                            primary
                                            rounded
                                            className={`${cx('btn')} ml-0`}
                                            onClick={() => handleProductUpdateClick(item)}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            small
                                            primary
                                            rounded
                                            className={`${cx('btn')} ml-0`}
                                            onClick={() => handleProductDelete(item?.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className={`${cx('pagination')} align-content-center d-flex justify-content-between pagination w-100`}>
                <Button small text onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
                    Previous
                </Button>
                <span>{`Page ${currentPage + 1} of ${totalPages}`}</span>
                <Button
                    small
                    text
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default ProductsTable;
