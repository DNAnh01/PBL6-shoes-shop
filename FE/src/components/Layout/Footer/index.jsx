import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./style-prefix.scss";
import pay from "../../../images/payment.png";

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
                  <Link href="#" className="footer-nav-link">
                    Nike
                  </Link>
                </li>
                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Adidas
                  </Link>
                </li>
                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Puma
                  </Link>
                </li>
                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Reebok
                  </Link>
                </li>
                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Converse
                  </Link>
                </li>
              </ul>
              <ul className="footer-nav-list">
                <li className="footer-nav-item">
                  <h2 className="nav-title">Products</h2>
                </li>
                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Deal Of The Day
                  </Link>
                </li>
                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Best Seller
                  </Link>
                </li>
                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Trending
                  </Link>
                </li>
                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    New Arrivals
                  </Link>
                </li>
                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Top Rate
                  </Link>
                </li>
              </ul>
              <ul className="footer-nav-list">
                <li className="footer-nav-item">
                  <h2 className="nav-title">Our Company</h2>
                </li>
                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Delivery
                  </Link>
                </li>
                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Legal Notice
                  </Link>
                </li>
                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Terms and conditions
                  </Link>
                </li>
                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    About us
                  </Link>
                </li>
                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Secure payment
                  </Link>
                </li>
              </ul>
              <ul className="footer-nav-list">
                <li className="footer-nav-item">
                  <h2 className="nav-title">Services</h2>
                </li>
                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Shop with Shoes
                  </Link>
                </li>
                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Promotions & offers
                  </Link>
                </li>
                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Pay
                  </Link>
                </li>
                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    Orders & shipping
                  </Link>
                </li>
                <li className="footer-nav-item">
                  <Link href="#" className="footer-nav-link">
                    General information
                  </Link>
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
                  <a
                    href="mailto:kin092002@gmail.com"
                    className="footer-nav-link"
                  >
                    kin092002@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="container">
              <img src={pay} alt="payment method" className="payment-img" />
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
