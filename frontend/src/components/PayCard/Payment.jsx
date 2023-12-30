import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import apiCart from '~/api/user/apiCart';
import apiConfirmedOrder from '~/api/user/apiConfirmedOrder';
import images from '../../assets/images/index.js';

export default function Payment({ paymentTime, transactionId }) {
    const [products, setProducts] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();
    const fetchCarts = async () => {
        try {
            const response = await apiCart.getAllCart();
            setProducts(response.data);
        } catch (error) {
            console.error(error?.message);
        }
    };
    const confirmOrder = async () => {
        const form = {
            currentOrderId: sessionStorage.getItem('currentOrderId'),
        };
        try {
            const res = await apiConfirmedOrder.postConfirmedOrder(form);
            console.log(res);
            if (res.status === 200) {
                toast.success('Xác nhận đơn hàng thành công');
                sessionStorage.removeItem('currentOrderId');
                setTimeout(() => {
                    navigate('/pay?step=4');
                    window.location.reload();
                }, 500);
            }
        } catch (error) {
            console.log(error);
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
            <ToastContainer />
            <div className="container">
                <div className="w-50 m-auto">
                    <h1 className={`my-3 text-${isSuccess ? 'success' : 'danger'} text-center`}>
                        {isSuccess ? (
                            <>
                                Thanh toán thành công <i className="fa fa-check" aria-hidden="true"></i>
                            </>
                        ) : (
                            <>
                                Thanh toán thất bại <i className="fa fa-times" aria-hidden="true"></i>
                            </>
                        )}
                    </h1>
                    {isSuccess ? (
                        <div className="w-50 m-auto">
                            <img src={images.paymentSucces} alt="Payment Success" className="img-fluid" />
                        </div>
                    ) : (
                        <div className="m-auto" style={{ width: '30%' }}>
                            <img src={images.paymentFail} alt="Payment Failure" className="img-fluid" />
                        </div>
                    )}
                    <h2 className="my-2">Chi tiết đơn hàng</h2>
                    <table className="table table-bordered">
                        <tbody>
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
                        </tbody>
                    </table>
                    {!isSuccess && (
                        <div className="div-payment">
                            <button className="button-payment" onClick={() => navigate('/pay?step=1')}>
                                Pay Again
                            </button>
                            <button className="button-payment" onClick={() => navigate('/')}>
                                Go Home
                            </button>
                        </div>
                    )}
                    {isSuccess && (
                        <div className="div-payment">
                            <button className="button-payment" onClick={confirmOrder}>
                                Confirm
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
