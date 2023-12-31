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
                toast.error('You need to log in to access this page');
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
