import { Popconfirm } from 'antd';
import chroma from 'chroma-js';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { toast } from 'react-toastify';
export default function CartCard({ product, onIncreaseQuantity, onDeCreaseQuantity, onDelete }) {
    const [quantityDefault, setQuantityDefault] = useState(product?.quantity);
    const [newQuantity, setNewQuantity] = useState(product.quantity);
    const hexColorCode = product?.product.color;
    const color = chroma(hexColorCode).css();
    const sizeObject = product.product.sizes.find((size) => size.name === product.size);
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
        if (quantityDefault < sizeObject.quantity) {
            const newQuantity = quantityDefault + 1;
            setQuantityDefault(newQuantity);
            setNewQuantity(newQuantity);
            onIncreaseQuantity();
        } else {
            toast.warning('Maximum quantity reached');
        }
    };
    const handleDelete = () => {
        onDelete();
    };
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
                            <span className="color-main-text">Color</span>
                            <div className="color-display" style={{ backgroundColor: color }}></div>
                            <span className="cartList-content-color-p color-main-text">Size: {product?.size}</span>
                        </div>
                    </div>
                </div>
                <div className="cartList-price">
                    <span className="color-main-text">
                        {product?.product?.discountedPrice.toLocaleString('it-IT', {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </span>
                </div>
                <div className="cartList-priceSale">
                    <span className="color-main-text">
                        {product?.product?.price.toLocaleString('it-IT', {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </span>
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
                    <span className="color-main-text">
                        {(quantityDefault * Number(product?.product?.discountedPrice)).toLocaleString('it-IT', {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </span>
                </div>
                <div className="cartList-operation">
                    <button style={{ backgroundColor: 'transparent', fontSize: '18px' }} onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </>
    );
}
