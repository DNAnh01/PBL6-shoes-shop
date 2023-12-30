import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style-prefix.scss';
import { FacebookOutlined, InstagramOutlined } from '@ant-design/icons';

import images from '~/assets/images';
import apiProductGrid from '~/api/user/apiProductGrid';
export default function Footer() {
    const [brands, setBrands] = useState([]);
    const [pageNumber] = useState('0');
    const pageSize = 100;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiProductGrid.getAllProduct(pageNumber, pageSize);
                const uniqueBrands = filterUniqueBrands(response?.data?.content);
                setBrands(uniqueBrands);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [pageNumber]);
    const filterUniqueBrands = (brands) => {
        const uniqueBrandNames = new Set();
        const uniqueBrands = [];
        brands.forEach((brand) => {
            const brandName = brand?.brand?.name;

            if (!uniqueBrandNames.has(brandName)) {
                uniqueBrandNames.add(brandName);
                uniqueBrands.push(brand);
            }
        });

        return uniqueBrands;
    };
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
                                {brands.map((brand) => (
                                    <li key={brand?.brand?.id} className="footer-nav-item">
                                        <Link to={`/product?brand=${brand?.brand?.name}`} className="footer-nav-link">
                                            {brand?.brand?.name}
                                        </Link>
                                    </li>
                                ))}
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
                                        facebook.ShoesShop.vn
                                    </Link>
                                </li>
                                <li className="footer-nav-item flex">
                                    <div className="icon-box">
                                        <InstagramOutlined />
                                    </div>
                                    <Link className="footer-nav-link">instagram.vn</Link>
                                </li>
                                <li className="footer-nav-item flex">
                                    <div className="icon-box">
                                        <i class="fa fa-telegram" aria-hidden="true"></i>
                                    </div>
                                    <Link className="footer-nav-link">telegram.com.vn</Link>
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
