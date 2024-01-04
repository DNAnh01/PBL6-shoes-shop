import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './ProductsTable.module.scss';
import Button from '../Button';
import { toast, ToastContainer } from 'react-toastify';
import apiProductGrid from '~/api/user/apiProductGrid';
import ReactPaginate from 'react-paginate';
import apiDelProduct from '~/api/admin/apiDelProduct';

const pageSize = 5;
const cx = classNames.bind(styles);
const ProductsTable = ({ handleProductUpdate }) => {
    const [products, setProducts] = useState([]);
    console.log(products);
    const [pageCount, setPageCount] = useState(null);
    const handleGetAllProduct = async (pageNumber) => {
        try {
            const res = await apiProductGrid.getAllProduct(pageNumber, pageSize);
            setProducts(res.data.content);
            setPageCount(res.data.totalPages);
        } catch (error) {
            console.log('No Product');
        }
    };
    const handleProductDelete = async (productId) => {
        try {
            const response = await apiDelProduct.deleteProduct(productId);
            if (response) {
                handleGetAllProduct();
            } else {
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    const handleProductUpdateClick = (product) => {
        handleProductUpdate(product);
    };
    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        handleGetAllProduct(Number(selectedPage));
    };
    useEffect(() => {
        handleGetAllProduct();
    }, []);

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
                            <TableCell className={cx('price')}>WarehousePrice</TableCell>
                            <TableCell className={cx('price')}>Price</TableCell>
                            <TableCell className={cx('quantity')}>Quantity</TableCell>
                            <TableCell className={cx('action')}>Action</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody className={cx('table-body')}>
                        {products.map((item) => (
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
                                <TableCell className={cx('price')}>
                                    {item.warehousePrice.toLocaleString('it-IT', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                </TableCell>
                                <TableCell className={cx('price')}>
                                    {item?.price.toLocaleString('it-IT', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                </TableCell>
                                <TableCell className={cx('quantity')}>
                                    {item?.sizes.map((size) => (
                                        <div>
                                            <span>
                                                Size {size.name} : {size.quantity}
                                            </span>
                                        </div>
                                    ))}
                                </TableCell>
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
            <div style={{ margin: '30px 0' }}>
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    pageCount={pageCount}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </div>
        </div>
    );
};

export default ProductsTable;
