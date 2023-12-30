import Header from '../../layouts/UserDefaultLayout/Header';
import BrandList from '../../components/BrandList';
import { useCart } from '~/api/user/CartContext';
import { useEffect, useState } from 'react';
import apiProductGrid from '~/api/user/apiProductGrid';
import ProductGridList from '~/components/ProductGridList';
import Footer from '~/layouts/UserDefaultLayout/Footer';

export default function ProductPage() {
    const { cartItems } = useCart();
    const [valueSearch, setValueSearch] = useState('');
    const [products, setProducts] = useState();
    const [productSearch, setProductSearch] = useState();
    const [pageNumber] = useState('0');
    const pageSize = 100;
    const fetchData = async () => {
        const response = await apiProductGrid.getAllProduct(pageNumber, pageSize);
        setProducts(response?.data?.content);
    };
    const handleSearchChange = (e) => {
        const searchValue = e.target.value;
        setValueSearch(searchValue);
    };
    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        const filteredProducts =
            products?.length > 0 &&
            products?.filter((product) => {
                const title = product?.title.toLowerCase();
                return title.includes(valueSearch.toLowerCase());
            });
        setProductSearch(filteredProducts);
    }, [products, valueSearch]);

    return (
        <>
            <Header cartItems={cartItems} />
            <div className="header-search-container container-layout">
                <input
                    type="text"
                    name="search"
                    className="search-field"
                    placeholder="Enter your product name..."
                    value={valueSearch}
                    onChange={handleSearchChange}
                    autoComplete="off"
                />
                <button className="search-btn">
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
            <BrandList />
            <ProductGridList productSearch={productSearch} />
            <Footer />
        </>
    );
}
