import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './RegisterPage.module.scss';
import { getUser, register } from '~/states/Auth/Action';
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);
const RegisterPage = () => {
    const [password, setPassword] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    // const jwt = localStorage.getItem('jwt');
    // const { auth } = useSelector((store) => store);

    const navigate = useNavigate();

    // useEffect(() => {
    //     if (jwt) {
    //         dispatch(getUser(jwt));
    //     }
    // }, [jwt, auth.jwt, dispatch]);

    // function validatePassword(password) {
    //     // Biểu thức chính quy kiểm tra mật khẩu
    //     // const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

    //     return passwordRegex.test(password);
    // }
    // const validateEmail = (email) => {
    //     // Biểu thức chính quy kiểm tra định dạng email
    //     // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     return emailRegex.test(email);
    // };

    const handleSubmit = async () => {
        // if (!password || !lastName || !firstName || !phone || !email) {
        //     toast.error('Please fill in all required fields');
        //     return;
        // }
        // // Kiểm tra định dạng email
        // if (!validateEmail(email)) {
        //     toast.error('Please enter a valid email address');
        //     return;
        // }
        // // Kiểm tra mật khẩu
        // if (!validatePassword(password)) {
        //     toast.error('Password must contain at least 8 characters, one uppercase letter, and one digit');
        //     return;
        // }

        try {
            const formData = {
                password,
                lastName,
                firstName,
                phone,
                email,
                role: 'user',
            };
            dispatch(register(formData));
            navigate('/login');
        } catch (error) {
            // toast.error(error?.message);
        }
    };

    return (
        <div className={`${cx('register-control')} ${cx('body-register')}`}>
            <ToastContainer />
            <div className={cx('wrapper-register')}>
                <div className={`${cx('form-box')} ${cx('register')}`}>
                    <h2>Register</h2>
                    <form>
                        <div className={cx('input-register')}>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                                autoComplete="off"
                            />
                            <label>Email</label>
                        </div>
                        <div className={cx('input-register')}>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                autoComplete="off"
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                            <label>Password</label>
                        </div>
                        <div className={cx('input-register')}>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={lastName}
                                autoComplete="off"
                                onChange={(event) => setLastName(event.target.value)}
                                required
                            />
                            <label>Last name</label>
                        </div>
                        <div className={cx('input-register')}>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={firstName}
                                autoComplete="off"
                                onChange={(event) => setFirstName(event.target.value)}
                                required
                            />
                            <label>First name</label>
                        </div>
                        <div className={cx('input-register')}>
                            <input
                                type="number"
                                id="phone"
                                name="phone"
                                value={phone}
                                autoComplete="off"
                                onChange={(event) => setPhone(event.target.value)}
                                required
                            />
                            <label>Phone Number</label>
                        </div>
                        <button className={cx('btn-register')} type="button" onClick={handleSubmit} id="btn-login">
                            REGISTER
                        </button>
                        <div className={cx('login-register')}>
                            <p>
                                If you already have an Account?
                                <Link to="/login" className={cx('login-link')}>
                                    Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
