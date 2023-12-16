import React from 'react';
import ProductBoxCard from '../ProductBoxCard';

import images from '~/assets/images';

export default function ProductBoxList() {
    return (
        <section>
            <div className="product-box container-layout">
                <ProductBoxCard
                    image={images.shoes1}
                    title="Best Seller"
                    name="Giày Jordan Cổ Thấp"
                    brand="Adidas"
                    price={4.99}
                    salePrice={5.99}
                />
                <ProductBoxCard
                    image={images.shoes2}
                    title="Trending"
                    name="Giày Jordan Cổ Thấp"
                    brand="Nike"
                    price={4.99}
                    salePrice={5.99}
                />
                <ProductBoxCard
                    image={images.shoes3}
                    title="New Arrivals"
                    name="Giày Jordan Cổ Thấp"
                    brand="Gucci"
                    price={5.99}
                    salePrice={6.99}
                />
                <ProductBoxCard
                    image={images.shoes4}
                    title="Top Rate"
                    name="Giày Jordan Cổ Thấp"
                    brand="Adidas"
                    price={4.99}
                    salePrice={5.5}
                />
            </div>
        </section>
    );
}
