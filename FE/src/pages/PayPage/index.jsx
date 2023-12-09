import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import Header from '../../components/Layout/Header';
import PayCard from '../../components/PayCard';
import { useCart } from '../../contexts/CartContext';

export default function PayPage() {
    useEffect(() => {
        const checkAuthentication = () => {
            // Kiểm tra nếu không có token, user, jwt
            const token = localStorage.getItem('jwt');
            const user = localStorage.getItem('user');
            const jwt = localStorage.getItem('jwt');

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
            <PayCard />
        </>
    );
}
