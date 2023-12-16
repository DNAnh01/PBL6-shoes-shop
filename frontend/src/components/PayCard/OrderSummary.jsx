import React from 'react';
import AddressCard from '../AddressCard';
import CartHistory from '../CartHistory';
import './style.scss';

export default function OrderSummary() {
    return (
        <div className="ordersummary">
            <AddressCard />

            <CartHistory />
        </div>
    );
}
