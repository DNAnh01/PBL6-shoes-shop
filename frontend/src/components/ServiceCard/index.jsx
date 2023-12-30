import React from 'react';
import { Link } from 'react-router-dom';

import images from '~/assets/images';

import './style.scss';
export default function ServiceCard() {
    return (
        <>
            <div className="service">
                <h1 className="service-title">Xin chào, Chúng tôi có thể giúp gì cho bạn ?</h1>
                <div className="service-category">
                    <h2 className="service-category-title">Danh Mục</h2>
                    <div className="service-category-item">
                        <Link to="/">
                            <div className="service-category-item-abc">
                                <div className="service-category-icon-item">
                                    <img src={images.icon1} alt="" />
                                </div>
                                <div className="service-category-text">Mua sắm cùng Shoes</div>
                            </div>
                        </Link>
                        <Link to="/profile">
                            <div className="service-category-item-abc">
                                <div className="service-category-icon-item">
                                    <img src={images.icon2} alt="" />
                                </div>
                                <div className="service-category-text">Thông tin cá nhân</div>
                            </div>
                        </Link>
                        <Link to="/cart">
                            <div className="service-category-item-abc">
                                <div className="service-category-icon-item">
                                    <img src={images.icon3} alt="" />
                                </div>
                                <div className="service-category-text">Thanh toán</div>
                            </div>
                        </Link>
                        <Link to="/order">
                            <div className="service-category-item-abc">
                                <div className="service-category-icon-item">
                                    <img src={images.icon4} alt="" />
                                </div>
                                <div className="service-category-text">Đơn hàng và vận chuyển</div>
                            </div>
                        </Link>
                        <div className="service-category-item-abc">
                            <div className="service-category-icon-item">
                                <img src={images.icon5} alt="" />
                            </div>
                            <div className="service-category-text">Thông tin chung</div>
                        </div>
                    </div>
                </div>
                <div className="service-question">
                    <h5 className="service-question-title">Câu hỏi thường gặp</h5>
                    <div className="service-question-content">
                        <div className="service-question-item">Làm sao để liên hệ chăm sóc khách hàng (CSKH)?</div>
                        <div className="service-question-item">Chính sách bảo mật?</div>
                        <div className="service-question-item">Điều khoản mua hàng?</div>
                        <div className="service-question-item">Tại sao tôi không thể thanh toán đơn hàng?</div>
                        <div className="service-question-item">Tại sao tài khoản của tôi bị khóa/bị giới hạn?</div>
                        <div className="service-question-item">Hướng dẫn thanh toán Online</div>
                        <div className="service-question-item">Cách xác minh thông tin</div>
                        <div className="service-question-item">Cách kiểm tra lịch sử mua hàng</div>
                    </div>
                </div>
            </div>
        </>
    );
}
