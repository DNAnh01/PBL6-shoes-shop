import React from 'react';
import './style.scss';
export default function AddressCard({ maxAddress }) {
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
