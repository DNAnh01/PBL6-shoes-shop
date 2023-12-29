import React, { useEffect, useState } from 'react';
import './style.scss';
export default function AddressCard() {
    const [maxAddress, setMaxAddress] = useState(null);

    useEffect(() => {
        const storedMaxAddress = sessionStorage.getItem('maxAddress');
        if (storedMaxAddress) {
            setMaxAddress(JSON.parse(storedMaxAddress));
        }
    }, []);
    return (
        <section>
            {maxAddress && (
                <div className="address" key={maxAddress.id}>
                    <p className="address-name">{`${maxAddress.firstName} ${maxAddress.lastName}`}</p>
                    <div className="address-item">
                        <p className="address-p">{`${maxAddress.streetAddress} ${maxAddress.city}`}</p>
                    </div>
                    <div className="address-phone">
                        <p className="address-phone-title">Phone Number:</p>
                        <p className="address-p">{maxAddress.mobile}</p>
                    </div>
                </div>
            )}
        </section>
    );
}
