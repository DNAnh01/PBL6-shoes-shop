import React, { useState } from 'react';
import AddressCard from '../AddressCard';
import CartHistory from '../CartHistory';
import './style.scss';

export default function OrderSummary() {
    const [selectedAddress, setSelectedAddress] = useState(null);

    // Hàm để nhận địa chỉ được chọn từ AddressList
    const handleSelectAddress = (address) => {
        setSelectedAddress(address);
    };

    return (
        <div className="ordersummary">
            {/* Truyền hàm handleSelectAddress xuống AddressList để nhận địa chỉ được chọn */}
            {/* AddressList không được hiển thị ở đây */}
            {/* <AddressList onSelectAddress={handleSelectAddress} /> */}

            {/* Truyền địa chỉ đã chọn xuống AddressCard */}
            <AddressCard address={selectedAddress} />

            <CartHistory />
        </div>
    );
}
