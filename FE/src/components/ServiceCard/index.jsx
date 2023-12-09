import React from "react";
import icon1 from "../../images/icons/icon1.png";
import icon2 from "../../images/icons/icon2.png";
import icon3 from "../../images/icons/icon3.png";
import icon4 from "../../images/icons/icon4.png";
import icon5 from "../../images/icons/icon5.png";
import "./style.scss";
export default function ServiceCard() {
  return (
    <>
      <div className="service">
        <h1 className="service-title">
          Xin chào, Chúng tôi có thể giúp gì cho bạn ?
        </h1>
        <div className="service-category">
          <h2 className="service-category-title">Danh Mục</h2>
          <div className="service-category-item">
            <div className="service-category-item-abc">
              <div className="service-category-icon-item">
                <img src={icon1} alt="" />
              </div>
              <div className="service-category-text">Mua sắm cùng Shoes</div>
            </div>
            <div className="service-category-item-abc">
              <div className="service-category-icon-item">
                <img src={icon2} alt="" />
              </div>
              <div className="service-category-text">
                Khuyến mãi &amp; ưu đãi
              </div>
            </div>
            <div className="service-category-item-abc">
              <div className="service-category-icon-item">
                <img src={icon3} alt="" />
              </div>
              <div className="service-category-text">Thanh toán</div>
            </div>
            <div className="service-category-item-abc">
              <div className="service-category-icon-item">
                <img src={icon4} alt="" />
              </div>
              <div className="service-category-text">
                Đơn hàng &amp; vận chuyển
              </div>
            </div>
            <div className="service-category-item-abc">
              <div className="service-category-icon-item">
                <img src={icon5} alt="" />
              </div>
              <div className="service-category-text">Thông tin chung</div>
            </div>
          </div>
        </div>
        <div className="service-question">
          <h5 className="service-question-title">Câu hỏi thường gặp</h5>
          <div className="service-question-content">
            <div className="service-question-item">
              Làm sao để liên hệ chăm sóc khách hàng (CSKH)?
            </div>
            <div className="service-question-item">Chính sách bảo mật?</div>
            <div className="service-question-item">Điều khoản mua hàng?</div>
            <div className="service-question-item">
              Tại sao tôi không thể thanh toán đơn hàng?
            </div>
            <div className="service-question-item">
              Tại sao tài khoản của tôi bị khóa/bị giới hạn?
            </div>
            <div className="service-question-item">
              Hướng dẫn thanh toán Online
            </div>
            <div className="service-question-item">Cách xác minh thông tin</div>
            <div className="service-question-item">
              Cách kiểm tra lịch sử mua hàng
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
