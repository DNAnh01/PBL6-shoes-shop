import React, { useEffect, useState } from 'react';
import './style.scss';
export default function AddressCard({ address, isSelected, firstName, lastName, mobile }) {
    return (
        <section>
            <div className={`address ${isSelected ? 'selected' : ''}`}>
                <p className="address-name">{`${firstName} ${lastName}`}</p>
                {/* <p className="address-p">{`${address?.streetAddress} - ${address?.city}`}</p> */}
                <p className="address-p">{`${address?.streetAddress} ${address?.city}`}</p>
                <div className="address-phone">
                    <p className="address-phone-title">Phone Number:</p>
                    <p className="address-p">{mobile}</p>
                </div>
            </div>
        </section>
    );
}
