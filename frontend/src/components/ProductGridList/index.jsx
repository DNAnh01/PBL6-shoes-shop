import React, { useCallback, useEffect, useState } from 'react';
import ProductGridCard from '../ProductGridCard';
import './style-prefix.scss';
import { useSearchParams } from 'react-router-dom';
import apiBrand from '~/api/user/apiBrand';
import apiFilterPrice from '~/api/user/apiFilterPrice';
import apiProductGrid from '~/api/user/apiProductGrid';
import ReactPaginate from 'react-paginate';

export default function ProductGridList({ productSearch }) {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let [searchParams] = useSearchParams();
    const selectedBrand = searchParams.get('brand');
    const [sortCriteria, setSortCriteria] = useState('price_low');
    const [sortOrder, setSortOrder] = useState('desc');
    const [pageNumber, setPageNumber] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            let response;
            if (selectedBrand) {
                response = await apiBrand.getProductByBrand(selectedBrand, pageNumber);
                setProducts(response?.data?.content);
            } else {
                if (productSearch && productSearch.length > 0) {
                    setProducts(productSearch);
                } else {
                    response = await apiProductGrid.getAllProduct(pageNumber);
                    setProducts(response.data.content);
                    setTotalPages(response.data.totalPages);
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [selectedBrand, productSearch, pageNumber]);

    const handleSort = useCallback(
        async (criteria) => {
            try {
                setIsLoading(true);

                if (criteria === sortCriteria) {
                    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
                } else {
                    setSortCriteria(criteria);
                    setSortOrder('asc');
                }
                if (criteria === 'new') {
                    const sortedProducts = [...products].sort((a, b) => {
                        if (sortOrder === 'asc') {
                            return b.id - a.id;
                        } else {
                            return b.id - a.id;
                        }
                    });
                    setProducts(sortedProducts);
                } else if (criteria === 'price_low' || criteria === 'price_high') {
                    const priceSort = criteria === 'price_low' ? 'price_low' : 'price_high';
                    const response = await apiFilterPrice.getFilerPrice(priceSort);
                    setProducts(response.data.content);
                    setTotalPages(response.data.totalPages);
                } else if (criteria === 'discountPersent') {
                    const sortedProducts = [...products].sort((a, b) => {
                        if (sortOrder === 'desc') {
                            return a.discountPersent - b.discountPersent;
                        } else {
                            return b.discountPersent - a.discountPersent;
                        }
                    });
                    setProducts(sortedProducts);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        },
        [sortCriteria, sortOrder, products],
    );

    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        setPageNumber(selectedPage);
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        handleSort('price_low');
    }, []);

    return (
        <section>
            <div className="product-main container-layout">
                <h2 className="title">Products</h2>
                <div style={{ margin: '10px 0' }}>
                    <label>Sort by:</label>
                    <select
                        style={{ margin: '0 10px', padding: '10px', borderRadius: '5px' }}
                        onChange={(e) => handleSort(e.target.value)}
                    >
                        <option value="price_low">Price Low</option>
                        <option value="price_high">Price High</option>
                        <option value="new">New Product</option>
                        <option value="discountPersent">Discount Persent</option>
                    </select>
                </div>
                <div className="product-grid">
                    {isLoading ? (
                        <div className="brandCard-loading"></div>
                    ) : (
                        products.length > 0 &&
                        products.map((product) => <ProductGridCard key={product?.id} product={product} />)
                    )}
                </div>
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </div>
        </section>
    );
}
