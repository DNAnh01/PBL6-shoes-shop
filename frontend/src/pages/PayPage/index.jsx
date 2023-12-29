import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import Header from '../../layouts/UserDefaultLayout/Header';
import PayCard from '../../components/PayCard';
import { useCart } from '~/api/user/CartContext';

export default function PayPage() {
    useEffect(() => {
        const checkAuthentication = () => {
            const jwt = sessionStorage.getItem('jwt');

            if (!jwt) {
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
