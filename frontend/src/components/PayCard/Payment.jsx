import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiCart from '~/api/user/apiCart';

export default function Payment({ paymentTime, transactionId }) {
    const [products, setProducts] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    console.log(products);
    const fetchCarts = async () => {
        try {
            const response = await apiCart.getAllCart();
            setProducts(response.data);
        } catch (error) {
            console.error(error?.message);
        }
    };
    // API cart
    useEffect(() => {
        // Gọi hàm fetchCarts
        const urlParams = new URLSearchParams(window.location.search);
        const result = urlParams.get('result');
        setIsSuccess(result === 'success');
        fetchCarts();
    }, []);

    return (
        <div>
            <div className="container">
                <div className="w-50 m-auto">
                    <h1 className={`my-3 text-${isSuccess ? 'success' : 'failure'} text-center`}>
                        {isSuccess ? 'Thanh toán thành công' : 'Thanh toán thất bại'}
                    </h1>
                    <h2 className="my-2">Chi tiết đơn hàng</h2>
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <td>Mã giao dịch:</td>
                                <td>
                                    <span>{transactionId}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Thông tin đơn hàng:</td>
                                <td>
                                    {products?.cartItems?.map((item, index) => (
                                        <div key={index}>
                                            <p>{`Product   ${index + 1}: ${item?.product?.title} - Size: ${item?.size}
                                             - Quantity: ${item?.quantity}`}</p>
                                        </div>
                                    ))}
                                </td>
                            </tr>
                            <tr>
                                <td>Tổng tiền:</td>
                                <td>
                                    <span>{products.totalDiscountedPrice}</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Thời gian thanh toán:</td>
                                <td>
                                    <span>{paymentTime}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button>
                        <Link to="/pay?step=1">Pay Again</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}
