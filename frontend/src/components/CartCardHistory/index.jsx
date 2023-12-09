import chroma from 'chroma-js';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.scss';
export default function CartCardHistory({
    product,
    // onIncreaseQuantity,
    // onDeCreaseQuantity,
    onDelete,
    onUpdate,
}) {
    const [quantityDefault, setQuantityDefault] = useState(product?.quantity);
    const [quantityNew, setQuantityNew] = useState(quantityDefault);
    // console.log(quantityNew);
    // console.log(quantityDefault);
    const hexColorCode = product?.product.color;
    const colorName = chroma(hexColorCode).name();
    // console.log(product);
    // useEffect(() => {
    //   onIncreaseQuantity(price, quantity);
    // }, []);
    console.log(product);
    return (
        <>
            <div className="cartList-history" role="list">
                <div className="cartList-detail ">
                    <Link to={`/product/${product?.product.id}`} className="cartList-detail-link">
                        <img src={product?.product.imageUrl} alt="" className="cartList-detail-img" />
                    </Link>
                    <div className="cartList-content">
                        <Link to={`/product/${product?.product.id}`} className="cartList-content-link">
                            <span className="cartList-content-span">{product?.product.title}</span>
                        </Link>
                        <Link
                            to={`/product?brand=${product?.product?.brand?.name}`}
                            className="cartList-content-catogery"
                        >
                            {product?.product?.brand?.name}
                        </Link>
                        <div className="cartList-content-color">
                            <span>Color</span>
                            <div className="color-display" style={{ backgroundColor: colorName }}></div>
                            <span className="cartList-content-color-p">Size: {product?.size}</span>
                        </div>
                    </div>
                </div>
                <div className="cartList-price">
                    <span className="font-15">{product?.product.discountedPrice + ' '}VND</span>
                </div>
                <div className="cartList-priceSale">
                    <span className="font-15">{product?.product.price + ' '}VND</span>
                </div>
                <div className="cartHistory-Quantity">
                    <input type="number" className="cartHistory-input" value={quantityDefault} />
                </div>
                <div className="cartList-money">
                    <span className="font-15">
                        {quantityDefault * Number(product.product.discountedPrice) + ' '}VND
                    </span>
                </div>
            </div>
        </>
    );
}
