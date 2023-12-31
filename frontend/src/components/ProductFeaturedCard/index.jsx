import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './style.scss';
import Button from '../../components/Button';
import images from '~/assets/images';
import { toast } from 'react-toastify';

export default function ProductFeaturedCard(product) {
    console.log(product);
    const navigate = useNavigate();
    const handleAddtocart = async () => {
        toast.success('Thêm sản phẩm vào giỏ thành công');
        setTimeout(() => {
            navigate(`/cart`);
        }, 500);
    };
    return (
        <section>
            <div className="product-featured-content">
                <Link to={`/product/${product?.product?.productId}`} className="product-featured-link">
                    <img src={product?.product?.productImageUrl} alt="" className="product-featured-image"></img>
                </Link>
                <div className="product-featured-detail">
                    <div className="product-featured-rating">
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                        <i className="fa fa-star" aria-hidden="true"></i>
                    </div>
                    <h2 className="product-featured-name">
                        <Link to={`/product/${product?.product?.productId}`} className="product-featured-name-link">
                            {product?.product.productName}
                        </Link>
                    </h2>
                    <Link to={`/product?brand=${product?.product.brandName}`} className="product-featured-category">
                        {product?.product.brandName}
                    </Link>
                    <div className="product-featured-price">
                        <p className="product-featured-price-real">
                            {product?.product.productDiscountedPrice.toLocaleString('it-IT', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                        </p>
                        <del>
                            {product?.product.productPrice.toLocaleString('it-IT', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                        </del>
                    </div>
                    <Button text="ADD TO CART" onClick={handleAddtocart}></Button>
                    <div className="product-featured-status">
                        <p>
                            already sold: <b>15</b>
                        </p>

                        <p>
                            {' '}
                            available: <b>{product?.product?.productQuantity}</b>{' '}
                        </p>
                    </div>
                    <div className="product-featured-countdown-box">
                        <p className="product-featured-countdown-desc">Hurry Up! Offer ends in:</p>
                        <div className="product-featured-countdown">
                            <div className="product-featured-countdown-content">
                                <p className="product-featured-display-number">360</p>
                                <p className="product-featured-display-text">Days</p>
                            </div>
                            <div className="product-featured-countdown-content">
                                <p className="product-featured-display-number">24</p>
                                <p className="product-featured-display-text">Hours</p>
                            </div>
                            <div className="product-featured-countdown-content">
                                <p className="product-featured-display-number">59</p>
                                <p className="product-featured-display-text">Min</p>
                            </div>
                            <div className="product-featured-countdown-content">
                                <p className="product-featured-display-number">00</p>
                                <p className="product-featured-display-text">Sec</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
