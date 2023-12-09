import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '~/pages/Button';
import AddressCard from '../AddressCard';
import apiProfile from '../API/apiProfile';

export default function AddressList() {
    const [profiles, setProfiles] = useState([]);
    console.log(profiles);
    const [fullName, setFullName] = useState('');
    const [defaultAddress, setDefaultAddress] = useState(null);
    const [selectedAddressId, setSelectedAddressId] = useState(null);

    console.log(defaultAddress);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await apiProfile.getProfile();
                setProfiles(response.data);
                setFullName(response.data.firstName + ' ' + response.data.lastName);
                // Check if addresses is an array and not empty
                if (response) {
                    // Set the first address as the default address
                    setDefaultAddress(response.data.addresses[0]);
                }
            } catch (error) {
                // toast.error(error?.message);
            }
        };
        // Call the fetchProductGrid function
        fetchProfile();
    }, []);

    const handleSetDefaultAddress = (address) => {
        setDefaultAddress(address);
        setSelectedAddressId(address?.id);
    };

    return (
        <div>
            <h1 className="address-title">Default Address:</h1>
            <p className="address-id">{selectedAddressId && `Selected Address ID: ${selectedAddressId}`}</p>
            {profiles.addresses &&
                profiles.addresses.map((address, index) => (
                    <div key={index}>
                        <AddressCard
                            address={address}
                            isSelected={selectedAddressId === address?.id}
                            firstName={profiles.firstName}
                            lastName={profiles.lastName}
                            mobile={profiles.mobile}
                        />
                        <Button text="Set as Default" onClick={() => handleSetDefaultAddress(address)}></Button>
                    </div>
                ))}
        </div>
    );
}
