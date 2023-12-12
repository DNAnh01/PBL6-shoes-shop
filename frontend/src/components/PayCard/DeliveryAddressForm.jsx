import { Box, Grid, TextField } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import AddressCard from '../AddressCard';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import apiCreateOrder from '../API/apiCreateOrder.js';
import { useNavigate } from 'react-router-dom';
import Button from '~/pages/Button';

export default function DeliveryAddressForm() {
    const [Firstname, setFirstname] = useState('');
    const [Lastname, setLastname] = useState('');
    const [streetAddress, setstreetAddress] = useState('');
    const [mobile, setMobile] = useState('');
    const [City, setCity] = useState('');
    const [State, setState] = useState('');
    const [Zipcode, setZipcode] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const address = {
            firstName: Firstname,
            lastName: Lastname,
            streetAddress: streetAddress,
            city: City,
            state: State,
            zipCode: parseInt(Zipcode),
            mobile: mobile,
        };
        console.log('address', address);
        try {
            const response = await apiCreateOrder.postCreateOrder(address);
            // const response = await axiosInstance.post("/admin/products/", formData);
            console.log('response:', response);
            if (response) {
                toast.success('Thêm thông tin thành công ');
                setTimeout(() => {
                    navigate('/pay?step=2');
                }, 2000);
            } else {
                toast.error('Có lỗi khi thêm thông tin');
            }
        } catch (error) {
            // console.error('Lỗi khi thực hiện yêu cầu API:', error);
            // toast.error(`Có lỗi khi thực hiện yêu cầu API: ${error.message}`);
        }
    };
    return (
        <div>
            <ToastContainer />
            <Grid container spacing={4} className="delivery-main">
                <Grid xs={12} lg={5} className="delivery">
                    <div className="delivery-btn">
                        <AddressCard />
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
                                        value={Firstname}
                                        onChange={(event) => setFirstname(event.target.value)}
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
                                        value={Lastname}
                                        onChange={(event) => setLastname(event.target.value)}
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
                                        multiline
                                        rows={4}
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
                                        value={mobile}
                                        onChange={(event) => setMobile(event.target.value)}
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
