import React, { useEffect, useState } from 'react';
import './style.scss';
import Button from '~/pages/Button';
import CartCardHistory from '../CartCardHistory';
import apiBuyNow from '~/api/user/apiBuyNow';
import apiCart from '~/api/user/apiCart';
// import axiosClient from '~/api/axiosClient';

export default function CartHistory() {
    const [products, setProducts] = useState([]);
    const handleBuyNow = async () => {
        const currentOrderId = sessionStorage.getItem('currentOrderId');
        const formData = {
            currentOrderId: currentOrderId,
        };

        try {
            const response = await apiBuyNow.postBuyNow(formData);
            console.log(response);
            if (response) {
                const externalURL = response.data.vnpayUrl;
                window.location.href = externalURL;
            } else {
                console.error('Có lỗi khi thêm thanh toán ');
            }
        } catch (error) {
            console.error(error?.message);
        }
    };
    const fetchCarts = async () => {
        try {
            const response = await apiCart.getAllCart();
            setProducts(response.data);
        } catch (error) {
            console.error(error?.message);
        }
    };
    useEffect(() => {
        fetchCarts();
    }, []);

    return (
        <div>
            <div className="cart container-layout">
                <div className="cartRow-history">
                    <div className="cartRow-product font-15">Product</div>
                    <div className="cartRow-price font-15">Unit price</div>
                    <div className="cartRow-priceSale font-15">Sale price</div>
                    <div className="cartRow-quantity font-15">Quantity</div>
                    <div className="cartRow-money font-15">Total</div>
                </div>

                {/* Danh sách sản phẩm  */}
                {products?.cartItems?.length > 0 &&
                    products?.cartItems.map((product) => {
                        return <CartCardHistory key={product?.id} product={product} />;
                    })}
            </div>
            <div className="payment">
                <span>Tổng số tiền cần thanh toán là: {products?.totalDiscountedPrice}</span>
                <div className="payment-btn">
                    <Button text="Pay" onClick={handleBuyNow} className={'payment-btn-buy'}></Button>
                </div>
            </div>
        </div>
    );
}
