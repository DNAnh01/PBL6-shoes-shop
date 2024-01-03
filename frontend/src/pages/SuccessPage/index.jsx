import React from 'react';
import { ToastContainer } from 'react-toastify';
import Header from '../../layouts/UserDefaultLayout/Header';
import images from '~/assets/images';

export default function SuccessPage() {
    return (
        <>
            <Header />
            <div>
                <ToastContainer />
                <div className="container">
                    <div className="w-50 m-auto">
                        <h1 className={`my-3 text-center`}>
                            Thanh toán thành công <i className="fa fa-check" aria-hidden="true"></i>
                        </h1>

                        <div className="w-50 m-auto">
                            <img src={images.paymentSucces} alt="Payment Success" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
