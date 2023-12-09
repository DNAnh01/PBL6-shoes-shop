import React from 'react';
import ProfileCard from '~/components/ProfileCard';
import Header from '../../components/Layout/Header';
import { useCart } from '../../contexts/CartContext';

export default function ProfilePage() {
    const { cartItems } = useCart();
    return (
        <>
            <Header cartItems={cartItems} />
            <ProfileCard />
        </>
    );
}
