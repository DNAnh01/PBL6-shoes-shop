import React, { useEffect, useState } from 'react';
import apiProfile from '../API/apiProfile';
import './style.scss';
export default function AddressCard() {
    const [profiles, setProfiles] = useState([]);
    console.log(profiles);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await apiProfile.getProfile();
                setProfiles(response.data);
            } catch (error) {
                // toast.error(error?.message);
            }
        };
        // Call the fetchProductGrid function
        fetchProfile();
    }, []);
    return (
        <section>
            <div className="address">
                <p className="address-name">{`${profiles.firstName} ${profiles.lastName}`}</p>

                {profiles.addresses &&
                    profiles.addresses.map((address) => (
                        <div key={address.id} className="address-item">
                            <p className="address-p">{`${address.streetAddress} ${address.city}`}</p>
                        </div>
                    ))}
                <div className="address-phone">
                    <p className="address-phone-title">Phone Number:</p>
                    <p className="address-p">{profiles.mobile}</p>
                </div>
            </div>
        </section>
    );
}
