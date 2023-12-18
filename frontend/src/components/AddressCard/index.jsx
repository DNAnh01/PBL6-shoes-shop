import React, { useEffect, useState } from 'react';
import apiProfile from '~/api/user/apiProfile';
import './style.scss';
export default function AddressCard() {
    const [profiles, setProfiles] = useState([]);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await apiProfile();
                setProfiles(response.data);
            } catch (error) {
                // toast.error(error?.message);
            }
        };
        // Call the fetchProductGrid function
        fetchProfile();
    }, []);

    const getMaxAddress = () => {
        if (!profiles.addresses || profiles.addresses.length === 0) {
            return null;
        }

        // Tìm địa chỉ có id lớn nhất
        const maxAddress = profiles.addresses.reduce((max, address) => {
            return address.id > max.id ? address : max;
        }, profiles.addresses[0]);

        return maxAddress;
    };

    const maxAddress = getMaxAddress();
    return (
        <section>
            <div className="address">
                <p className="address-name">{`${profiles.firstName} ${profiles.lastName}`}</p>

                {/* {profiles.addresses &&
                    profiles.addresses.map((address) => (
                        <div key={address.id} className="address-item">
                            <p className="address-p">{`${address.streetAddress} ${address.city}`}</p>
                        </div>
                    ))} */}
                {maxAddress && (
                    <div key={maxAddress.id} className="address-item">
                        <p className="address-p">{`${maxAddress.streetAddress} ${maxAddress.city}`}</p>
                    </div>
                )}
                <div className="address-phone">
                    <p className="address-phone-title">Phone Number:</p>
                    <p className="address-p">{profiles.mobile}</p>
                </div>
            </div>
        </section>
    );
}
