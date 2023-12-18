import React from 'react';
import ProfileCard from '~/components/ProfileCard';
import Header from '../../layouts/UserDefaultLayout/Header';
import { useCart } from '~/api/user/CartContext';

export default function ProfilePage() {
    const { cartItems } = useCart();
    return (
        <>
            <Header cartItems={cartItems} />
            <ProfileCard />
        </>
    );
}
