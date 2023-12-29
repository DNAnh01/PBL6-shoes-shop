import React from 'react';
import { Link } from 'react-router-dom';
import './style-prefix.scss';
import Icon, { FacebookOutlined, InstagramOutlined } from '@ant-design/icons';

import images from '~/assets/images';
export default function Footer() {
    return (
        <section>
            <footer className="footer">
                <div className="footer-category">
                    <div className="footer-nav">
                        <div className="container">
                            <ul className="footer-nav-list">
                                <li className="footer-nav-item">
                                    <h2 className="nav-title">Popular Categories</h2>
                                </li>
                                <li className="footer-nav-item">
                                    <Link to="/product?brand=Nike" lassName="footer-nav-link">
                                        Nike
                                    </Link>
                                </li>
                                <li className="footer-nav-item">
                                    <Link to="/product?brand=Adidas" className="footer-nav-link">
                                        Adidas
                                    </Link>
                                </li>
                                <li className="footer-nav-item">
                                    <Link to="/product?brand=Puma" className="footer-nav-link">
                                        Puma
                                    </Link>
                                </li>
                                <li className="footer-nav-item">
                                    <Link to="/product?brand=Reebok" className="footer-nav-link">
                                        Reebok
                                    </Link>
                                </li>
                                <li className="footer-nav-item">
                                    <Link to="/product?brand=Convere" className="footer-nav-link">
                                        Convere
                                    </Link>
                                </li>
                            </ul>
                            <ul className="footer-nav-list">
                                <li className="footer-nav-item">
                                    <h2 className="nav-title">Products</h2>
                                </li>
                                <li className="footer-nav-item">
                                    <Link to="/hot" className="footer-nav-link">
                                        Deal Of The Day
                                    </Link>
                                </li>
                                <li className="footer-nav-item">
                                    <Link to="/hot" className="footer-nav-link">
                                        Best Seller
                                    </Link>
                                </li>
                                <li className="footer-nav-item">
                                    <Link to="/hot" className="footer-nav-link">
                                        Trending
                                    </Link>
                                </li>
                                <li className="footer-nav-item">
                                    <Link to="/hot" className="footer-nav-link">
                                        New Arrivals
                                    </Link>
                                </li>
                                <li className="footer-nav-item">
                                    <Link to="/hot" className="footer-nav-link">
                                        Top Rate
                                    </Link>
                                </li>
                            </ul>
                            <ul className="footer-nav-list">
                                <li className="footer-nav-item">
                                    <h2 className="nav-title">Contact</h2>
                                </li>
                                <li className="footer-nav-item flex">
                                    <div className="icon-box">
                                        <FacebookOutlined />
                                    </div>
                                    <Link
                                        to="https://www.facebook.com/groups/891809415594105"
                                        className="footer-nav-link"
                                    >
                                        facebook.ShoeShop.vn
                                    </Link>
                                </li>
                                <li className="footer-nav-item flex">
                                    <div className="icon-box">
                                        <InstagramOutlined />
                                    </div>
                                    <Link className="footer-nav-link">Intargram.vn</Link>
                                </li>
                                <li className="footer-nav-item flex">
                                    <div className="icon-box">
                                        <i class="fa fa-telegram" aria-hidden="true"></i>
                                    </div>
                                    <Link className="footer-nav-link">Telegram.com.vn</Link>
                                </li>
                            </ul>
                            <ul className="footer-nav-list">
                                <li className="footer-nav-item">
                                    <h2 className="nav-title">Contact</h2>
                                </li>
                                <li className="footer-nav-item flex">
                                    <div className="icon-box">
                                        <i className="fa fa-map" aria-hidden="true"></i>
                                    </div>
                                    <address className="content">
                                        54 Nguyen Luong Bang, Hoa Khanh Bac, Lien Chieu, Da Nang
                                    </address>
                                </li>
                                <li className="footer-nav-item flex">
                                    <div className="icon-box">
                                        <i className="fa fa-phone" aria-hidden="true"></i>
                                    </div>
                                    <Link className="footer-nav-link">(+84) 985048769</Link>
                                </li>
                                <li className="footer-nav-item flex">
                                    <div className="icon-box">
                                        <i className="fa fa-info" aria-hidden="true"></i>
                                    </div>
                                    <a href="mailto:kin092002@gmail.com" className="footer-nav-link">
                                        kin092002@gmail.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <div className="container">
                            <img alt="payment method" src={images.payment} className="payment-img" />
                            <p className="copyright">
                                Copyright © <Link href="#">Anon</Link> all rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </section>
    );
}
