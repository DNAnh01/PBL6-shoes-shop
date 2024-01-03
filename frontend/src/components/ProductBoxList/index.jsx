import React, { useEffect, useState } from 'react';
import ProductBoxCard from '../ProductBoxCard';
import apiTopProducts from '~/api/user/apiTopProducts';

export default function ProductBoxList() {
    const [topNewProductsData, setTopNewProductsData] = useState([]);
    const [topSellingProductsData, setTopSellingProductsData] = useState([]);
    const [topRatingProductsData, setTopRatingProductsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let resTopNewProducts = await apiTopProducts.getTopNewProducts();
                let resTopSellingProducts = await apiTopProducts.getTopSellingProducts();
                let resTopRatingProducts = await apiTopProducts.getTopRatingProducts();

                setTopNewProductsData(resTopNewProducts.data);
                setTopSellingProductsData(resTopSellingProducts.data);
                setTopRatingProductsData(resTopRatingProducts.data);
            } catch (error) {
                console.log({ error });
            }
        };

        fetchData();
    }, []);
    const productData = [
        {
            title: 'Top 3 New Products',
            products: [...topNewProductsData],
        },
        {
            title: 'Top 3 Selling Products',
            products: [...topSellingProductsData],
        },
        {
            title: 'Top 3 Rating Products',
            products: [...topRatingProductsData],
        },
    ];
    return (
        <section>
            <div className="product-box container-layout">
                {productData.map((category) => (
                    <div key={category.title} className="product-box-content">
                        <h2 className="product-minimal-title">{category.title}</h2>
                        <div className="category-products">
                            {category.products.slice(0, 3).map((product, index) => (
                                <ProductBoxCard
                                    key={index}
                                    id={product?.productId}
                                    image={product?.productImageUrl}
                                    title={product?.productName}
                                    brandId={product?.brandId}
                                    brandName={product?.brandName}
                                    price={product?.productDiscountedPrice}
                                    discountedPrice={product?.productPrice}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
