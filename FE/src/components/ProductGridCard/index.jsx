import React from 'react';
import { Link } from 'react-router-dom';

const ProductGridCard = ({ product }) => {
    return (
        <div className="showcase-productGrid">
            <div className="showcase-grid">
                <p className="showcase-badge">{`${product?.discountPersent}%`}</p>
                <div className="showcase-actions">
                    <Link to={`/product/${product.id}`} className="btn-action">
                        <i className="fa fa-eye" aria-hidden="true"></i>
                    </Link>
                    <button className="btn-action">
                        <i className="fa fa-repeat" aria-hidden="true"></i>
                    </button>
                    <Link to="/cart" className="btn-action">
                        <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                    </Link>
                </div>
                <Link to={`/product/${product?.id}`} className="showcase-grid-link">
                    <img src={product?.imageUrl} alt="" width={300} className="product-img default" />
                </Link>
            </div>
            <div className="showcase-content">
                <Link to={`/product?brand=${product?.brand?.name}`} className="showcase-category-grid">
                    {product?.brand?.name}
                </Link>
                <Link to={`/product/${product?.id}`} className="showcase-title-grid">
                    <h3 className="showcase-title">{product?.title}</h3>
                </Link>
                <div className="showcase-rating">
                    {/* Hiển thị đánh giá dựa trên số sao */}
                    {Array.from({ length: product?.ratings }).map((_, index) => (
                        <i key={index} className="fa fa-star" aria-hidden="true"></i>
                    ))}
                    {product?.halfRating && <i className="fa fa-star-half-o" aria-hidden="true"></i>}
                </div>
                <div className="price-box">
                    <p className="price">${product?.discountedPrice}</p>
                    <p className="deal">${product?.price}</p>
                </div>
            </div>
        </div>
    );
};
export default ProductGridCard;
