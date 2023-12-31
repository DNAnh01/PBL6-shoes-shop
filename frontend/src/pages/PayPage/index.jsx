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
                toast.error('You need to log in to access this page');
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
