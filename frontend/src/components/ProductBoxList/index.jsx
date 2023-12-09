import React from 'react';
import ProductBoxCard from '../ProductBoxCard';
import shoes1 from '../../images/shoes4.png';
import shoes2 from '../../images/shoes5.png';
import shoes3 from '../../images/shoes1.png';
import shoes4 from '../../images/shoes8.png';

export default function ProductBoxList() {
    return (
        <section>
            <div className="product-box container-layout">
                <ProductBoxCard
                    image={shoes1}
                    title="Best Seller"
                    name="Giày Jordan Cổ Thấp"
                    brand="Adidas"
                    price={4.99}
                    salePrice={5.99}
                />
                <ProductBoxCard
                    image={shoes2}
                    title="Trending"
                    name="Giày Jordan Cổ Thấp"
                    brand="Nike"
                    price={4.99}
                    salePrice={5.99}
                />
                <ProductBoxCard
                    image={shoes3}
                    title="New Arrivals"
                    name="Giày Jordan Cổ Thấp"
                    brand="Gucci"
                    price={5.99}
                    salePrice={6.99}
                />
                <ProductBoxCard
                    image={shoes4}
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
