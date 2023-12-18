import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import OrderUser from '~/components/OrderUser/OrderUser';
import Header from '../../layouts/UserDefaultLayout/Header';
import { useCart } from '~/api/user/CartContext';

export default function OrderPage() {
    useEffect(() => {
        const checkAuthentication = () => {
            // Kiểm tra nếu không có token, user, jwt
            const token = sessionStorage.getItem('jwt');
            const user = sessionStorage.getItem('user');
            const jwt = sessionStorage.getItem('jwt');

            if (!token || !user || !jwt) {
                // Hiển thị toast.error và chuyển hướng đến trang đăng nhập
                toast.error('Bạn cần đăng nhập để truy cập trang này');
            }
        };
        checkAuthentication();
    }, []);

    const { cartItems } = useCart();
    return (
        <>
            <Header cartItems={cartItems} />
            <OrderUser />
        </>
    );
}
