import { Box, Grid, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useState } from 'react';
import AddressCard from '../AddressCard';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Button from '~/pages/Button';
import apiCreateOrder from '~/api/user/apiCreateOrder';
import apiProfile from '~/api/user/apiProfile';

export default function DeliveryAddressForm() {
    const [streetAddress, setstreetAddress] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [phone, setPhone] = useState('');
    const [City, setCity] = useState('');
    const [State, setState] = useState('');
    const [Zipcode, setZipcode] = useState('');
    const [profiles, setProfiles] = useState([]);
    const navigate = useNavigate();

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
    const handleSelectAddress = (selectedId) => {
        console.log(selectedId);
        // Tìm địa chỉ cụ thể dựa trên selectedId và cập nhật các trường TextField
        const selectedAddress = profiles.addresses.find((address) => address.id === selectedId);
        if (selectedAddress) {
            setfirstName(selectedAddress.firstName);
            setlastName(selectedAddress.lastName);
            setPhone(selectedAddress.mobile);
            setstreetAddress(selectedAddress.streetAddress);
            setCity(selectedAddress.city);
            setState(selectedAddress.state);
            setZipcode(selectedAddress.zipCode.toString());
        }
    };
    const handleButtonClick = () => {
        const maxAddress = getMaxAddress();
        if (maxAddress) {
            handleSelectAddress(maxAddress.id);
        }
        sessionStorage.setItem('maxAddress', JSON.stringify(maxAddress));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (phone.length !== 10) {
            toast.warning('Số điện thoại không hợp lệ');
            return;
        }
        const nameRegex = /^[a-zA-ZÀ-Ỹà-ỹ ]+$/;
        if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
            toast.warning('Họ và Tên chỉ được chứa chữ cái và không có số hoặc ký tự đặc biệt');
            return;
        }

        const address = {
            firstName: firstName,
            lastName: lastName,
            mobile: phone,
            streetAddress: streetAddress,
            city: City,
            state: State,
            zipCode: parseInt(Zipcode),
        };
        try {
            const response = await apiCreateOrder.postCreateOrder(address);
            if (response.status === 201) {
                sessionStorage.setItem('currentOrderId', response.data.id);
                toast.success('Thêm thông tin thành công ');
                sessionStorage.setItem('maxAddress', JSON.stringify(address));
                setTimeout(() => {
                    navigate('/pay?step=2');
                    window.location.reload();
                }, 500);
            } else {
                toast.error('Có lỗi khi thêm thông tin');
            }
        } catch (error) {}
    };

    return (
        <div>
            <ToastContainer />
            <Grid container spacing={4} className="delivery-main">
                <Grid xs={12} lg={5} className="delivery">
                    <div className="delivery-btn">
                        <Button onClick={handleButtonClick} text="Render Max Address" />
                        <AddressCard maxAddress={maxAddress} onSelectAddress={handleSelectAddress} />
                    </div>
                </Grid>
                <Grid xs={12} lg={7}>
                    <Box className="delivery-box">
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="firstName"
                                        name="firstName"
                                        label="First Name"
                                        fullWidth
                                        autoComplete="given-name"
                                        style={{ fontSize: '18px' }}
                                        value={firstName}
                                        onChange={(event) => setfirstName(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="lastName"
                                        name="lastName"
                                        label="Last Name"
                                        fullWidth
                                        autoComplete="given-name"
                                        value={lastName}
                                        onChange={(event) => setlastName(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="address"
                                        name="address"
                                        label="Address"
                                        fullWidth
                                        autoComplete="given-name"
                                        value={streetAddress}
                                        onChange={(event) => setstreetAddress(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="phone"
                                        name="phone"
                                        label="Phone Number"
                                        fullWidth
                                        autoComplete="given-name"
                                        value={phone}
                                        onChange={(event) => setPhone(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="city"
                                        name="city"
                                        label="City"
                                        fullWidth
                                        autoComplete="given-name"
                                        value={City}
                                        onChange={(event) => setCity(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="state"
                                        name="state"
                                        label="State"
                                        fullWidth
                                        autoComplete="given-name"
                                        value={State}
                                        onChange={(event) => setState(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="zipCode"
                                        name="zipCode"
                                        label="ZipCode"
                                        fullWidth
                                        autoComplete="given-name"
                                        value={Zipcode}
                                        onChange={(event) => setZipcode(event.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button type="submit" text="Deliver Here"></Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}
