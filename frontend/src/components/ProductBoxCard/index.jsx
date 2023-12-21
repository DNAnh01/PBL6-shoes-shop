import React from 'react';
import { Link } from 'react-router-dom';
import './style-prefix.scss';

export default function ProductBoxCard({ image, name, brand, price, salePrice }) {
    return (
        <div>
            <div className="product-minimal">
                <div className="product-minimal-content">
                    <Link to={'/about'} className="product-minimal-link">
                        <img src={image} alt="" className="product-minimal-image"></img>
                    </Link>
                    <div className="product-minimal-detail">
                        <h2 className="product-minimal-name">
                            <Link to="/about" className="product-minimal-name-link">
                                {name}
                            </Link>
                        </h2>
                        <Link to="/#" className="product-minimal-category">
                            {brand}
                        </Link>
                        <div className="product-minimal-price">
                            <p className="product-minimal-price-real">
                                {price.toLocaleString('it-IT', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </p>
                            <del>
                                {salePrice.toLocaleString('it-IT', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </del>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
