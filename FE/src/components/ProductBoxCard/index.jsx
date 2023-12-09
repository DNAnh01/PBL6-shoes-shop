import React from "react";
import { Link } from "react-router-dom";
import "./style-prefix.scss";

export default function ProductBoxCard({
  image,
  title,
  name,
  brand,
  price,
  salePrice,
}) {
  return (
    // <div>
    //   {/* <div className="product-minimal">
    //     <div className="product-showcase">
    //       <h2 className="title">New Arrivals</h2>
    //       <div className="showcase-wrapper has-scrollbar">
    //         <div className="showcase-container">
    //           <div className="showcase">
    //             <Link to="/about" className="showcase-img-box">
    //               <img src={shoes} alt="" width={70} className="showcase-img" />
    //             </Link>
    //             <div className="showcase-content">
    //               <Link to="/about" className="showcase-title-link">
    //                 <h4 className="showcase-title">
    //                   Giày jordan Cổ Thấp, Giày thể thao nam nữ jd pais Xám Xanh
    //                 </h4>
    //               </Link>
    //               <Link href="#" className="showcase-category">
    //                 Nike
    //               </Link>
    //               <div className="price-box">
    //                 <p className="price">$45.00</p>
    //                 <del>$12.00</del>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div> */}
    // </div>

    <div>
      <div className="product-minimal">
        <h1 className="product-minimal-title">{title}</h1>
        <div className="product-minimal-content">
          <Link to={"/about"} className="product-minimal-link">
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
              <p className="product-minimal-price-real">${price}</p>
              <del>${salePrice}</del>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
