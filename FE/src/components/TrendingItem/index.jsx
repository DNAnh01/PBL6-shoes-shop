import React from 'react';
import './style-prefix.scss';
import trending from '../../images/banner-2.jpg';
import Button from '~/pages/Button';

export default function TrendingItem() {
    return (
        <div className="banner container-layout">
            <div className="container-trending">
                <div className="slider-container has-scrollbar">
                    <div className="slider-item">
                        <img src={trending} alt="women's latest fashion sale" className="banner-img" />
                        <div className="banner-content">
                            <p className="banner-subtitle">Trending item</p>
                            <p className="banner-text">
                                starting at $ <b>20</b>.00
                            </p>
                            <Button text="Shop Now" to="/cart">
                                Shop Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
