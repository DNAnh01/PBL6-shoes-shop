import React from 'react';
import ProductBoxCard from '../ProductBoxCard';

import images from '~/assets/images';

export default function ProductBoxList() {
    const productData = [
        {
            title: 'Best Seller',
            products: [
                {
                    image: images.shoes1,
                    title: 'Giày Jordan Cổ Thấp',
                    brand: 'Adidas',
                    price: 500000,
                    salePrice: 700000,
                },
                {
                    image: images.shoes4,
                    title: 'Giày Jordan Cổ Thấp',
                    brand: 'Nike',
                    price: 500000,
                    salePrice: 700000,
                },
            ],
        },
        {
            title: 'Trending',
            products: [
                {
                    image: images.shoes2,
                    title: 'Giày Jordan Cổ Thấp',
                    brand: 'Nike',
                    price: 500000,
                    salePrice: 700000,
                },
                {
                    image: images.shoes7,
                    title: 'Giày Jordan Cổ Thấp',
                    brand: 'Nike',
                    price: 500000,
                    salePrice: 700000,
                },
            ],
        },
        {
            title: 'New Arrivals',
            products: [
                {
                    image: images.shoes4,
                    title: 'Giày Jordan Cổ Thấp',
                    brand: 'Nike',
                    price: 500000,
                    salePrice: 700000,
                },
                {
                    image: images.shoes4,
                    title: 'Giày Jordan Cổ Thấp',
                    brand: 'Nike',
                    price: 500000,
                    salePrice: 700000,
                },
            ],
        },
        {
            title: 'Top Rate',
            products: [
                {
                    image: images.shoes3,
                    title: 'Giày Jordan Cổ Thấp',
                    brand: 'Nike',
                    price: 500000,
                    salePrice: 700000,
                },
                {
                    image: images.shoes4,
                    title: 'Giày Jordan Cổ Thấp',
                    brand: 'Nike',
                    price: 500000,
                    salePrice: 700000,
                },
                {
                    image: images.shoes4,
                    title: 'Giày Jordan Cổ Thấp',
                    brand: 'Nike',
                    price: 500000,
                    salePrice: 700000,
                },
                {
                    image: images.shoes4,
                    title: 'Giày Jordan Cổ Thấp',
                    brand: 'Nike',
                    price: 500000,
                    salePrice: 700000,
                },
            ],
        },
    ];

    return (
        <section>
            <div className="product-box container-layout">
                {productData.map((category) => (
                    <div key={category.title}>
                        <h2 className="product-minimal-title">{category.title}</h2>
                        <div className="category-products">
                            {category.products.slice(0, 3).map((product, index) => (
                                <ProductBoxCard
                                    key={index}
                                    image={product.image}
                                    title={product.title}
                                    brand={product.brand}
                                    price={product.price}
                                    salePrice={product.salePrice}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
