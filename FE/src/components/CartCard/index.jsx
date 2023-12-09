import { Popconfirm } from 'antd';
import chroma from 'chroma-js';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style.scss';
export default function CartCard({ product, onIncreaseQuantity, onDeCreaseQuantity, onDelete }) {
    const [quantityDefault, setQuantityDefault] = useState(product?.quantity);
    const [newQuantity, setNewQuantity] = useState(product.quantity);
    // console.log(quantityNew);
    // console.log(quantityDefault);
    const hexColorCode = product?.product.color;
    const color = chroma(hexColorCode).css();

    const handleDecreaseQuantity = () => {
        if (quantityDefault === 1) {
            setQuantityDefault(1);
        } else {
            const newQuantity = quantityDefault - 1;
            setQuantityDefault(newQuantity);
            setNewQuantity(newQuantity);
        }
        onDeCreaseQuantity();
    };

    const handleIncreaseQuantity = () => {
        const newQuantity = quantityDefault + 1;
        setQuantityDefault(newQuantity);
        setNewQuantity(newQuantity);
        onIncreaseQuantity();
    };
    const handleDelete = () => {
        onDelete();
    };
    console.log(product);
    return (
        <>
            <div className="cartList" role="list">
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
                            <div className="color-display" style={{ backgroundColor: color }}></div>
                            <span className="cartList-content-color-p">Size: {product?.size}</span>
                        </div>
                    </div>
                </div>
                <div className="cartList-price">
                    <span className="font-15">{product?.product?.discountedPrice + ' '}VND</span>
                </div>
                <div className="cartList-priceSale">
                    <span className="font-15">{product?.product?.price + ' '}VND</span>
                </div>
                <div className="cartList-quantity">
                    {newQuantity === 1 ? (
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            okText="Yes"
                            onConfirm={handleDelete}
                            cancelText="No"
                        >
                            <button className="cartList-decrease">-</button>
                        </Popconfirm>
                    ) : (
                        <>
                            <button className="cartList-decrease" onClick={handleDecreaseQuantity}>
                                -
                            </button>
                        </>
                    )}
                    <input type="number" className="cartList-input" value={quantityDefault} />
                    <button className="cartList-increase" onClick={handleIncreaseQuantity}>
                        +
                    </button>
                </div>
                <div className="cartList-money">
                    <span className="font-15">
                        {quantityDefault * Number(product?.product?.discountedPrice) + ' '}
                        VND
                    </span>
                </div>
                <div className="cartList-operation">
                    <Button
                        style={{ backgroundColor: 'transparent', color: '#000', borderColor: 'transparent' }}
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </>
    );
}
