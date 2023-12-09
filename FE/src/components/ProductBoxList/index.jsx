import React from "react";
import ProductBoxCard from "../ProductBoxCard";
import shoes from "../../images/shoes4.png";

export default function ProductBoxList() {
  return (
    <section>
      <div className="product-box container-layout">
        <ProductBoxCard
          image={shoes}
          title="Best Seller"
          name="Giày Jordan Cổ Thấp,"
          brand="Adidas"
          price={4.99}
          salePrice={5.99}
        />
        <ProductBoxCard
          image={shoes}
          title="Trending"
          name="Giày Jordan Cổ Thấp,"
          brand="Nike"
          price={4.99}
          salePrice={5.99}
        />
        <ProductBoxCard
          image={shoes}
          title="New Arrivals"
          name="Giày Jordan Cổ Thấp,"
          brand="Gucci"
          price={5.99}
          salePrice={6.99}
        />
        <ProductBoxCard
          image={shoes}
          title="Top Rate"
          name="Giày Jordan Cổ Thấp,"
          brand="Adidas"
          price={4.99}
          salePrice={5.5}
        />
      </div>
    </section>
  );
}
