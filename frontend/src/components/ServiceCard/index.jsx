import React from 'react';
import { Link } from 'react-router-dom';

import images from '~/assets/images';

import './style.scss';
export default function ServiceCard() {
    return (
        <>
            <div className="service">
                <h1 className="service-title">Hello, How can we help you?</h1>
                <div className="service-category">
                    <h2 className="service-category-title">Category</h2>
                    <div className="service-category-item">
                        <Link to="/">
                            <div className="service-category-item-abc">
                                <div className="service-category-icon-item">
                                    <img src={images.icon1} alt="" />
                                </div>
                                <div className="service-category-text">Shop with Shoes</div>
                            </div>
                        </Link>
                        <Link to="/profile">
                            <div className="service-category-item-abc">
                                <div className="service-category-icon-item">
                                    <img src={images.icon2} alt="" />
                                </div>
                                <div className="service-category-text">Personal information</div>
                            </div>
                        </Link>
                        <Link to="/cart">
                            <div className="service-category-item-abc">
                                <div className="service-category-icon-item">
                                    <img src={images.icon3} alt="" />
                                </div>
                                <div className="service-category-text">Pay</div>
                            </div>
                        </Link>
                        <Link to="/order">
                            <div className="service-category-item-abc">
                                <div className="service-category-icon-item">
                                    <img src={images.icon4} alt="" />
                                </div>
                                <div className="service-category-text">Orders and shipping</div>
                            </div>
                        </Link>
                        <div className="service-category-item-abc">
                            <div className="service-category-icon-item">
                                <img src={images.icon5} alt="" />
                            </div>
                            <div className="service-category-text">General information</div>
                        </div>
                    </div>
                </div>
                <div className="service-question">
                    <h5 className="service-question-title">Frequently asked questions</h5>
                    <div className="service-question-content">
                        <div className="service-question-item">How to contact customer care (CSKH)?</div>
                        <div className="service-question-item">Privacy Policy?</div>
                        <div className="service-question-item">Terms of purchase?</div>
                        <div className="service-question-item">Why can't I pay for my order?</div>
                        <div className="service-question-item">Why is my account locked/restricted?</div>
                        <div className="service-question-item">Online payment instructions</div>
                        <div className="service-question-item">How to verify information?</div>
                        <div className="service-question-item">How to check purchase history?</div>
                    </div>
                </div>
            </div>
        </>
    );
}
