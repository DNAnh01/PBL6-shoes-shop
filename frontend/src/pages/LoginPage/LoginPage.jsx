import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import classNames from 'classnames/bind';
import styles from './LoginPage.module.scss';
import apiLogin from '~/api/user/apiLogin';

const cx = classNames.bind(styles);
const getTokenFromsessionStorage = () => {
    return sessionStorage.getItem('jwt');
};
export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const storedToken = getTokenFromsessionStorage();
        if (storedToken) {
        }
    }, []);

    const handleSignin = async () => {
        try {
            const formData = {
                email: username,
                password,
            };
            const response = await apiLogin.postLogin(formData);
            console.log(response);
            if (response.status === 201) {
                sessionStorage.setItem('jwt', response?.data?.jwt);
                if (response?.data?.role === 'admin') {
                    toast.success('Entering the admin page');
                    setTimeout(() => {
                        navigate('/admin/dashboard');
                        window.location.reload();
                    }, 1000);
                } else if (response?.data?.role === 'user') {
                    toast.success('Going to the home page');
                    setTimeout(() => {
                        navigate('/');
                        window.location.reload();
                    }, 1000);
                }
            }
        } catch (error) {
            toast.error('You entered the wrong password or account', error?.message);
        }
    };
    return (
        <div className={cx('body-login')}>
            <ToastContainer />
            <div className={cx('wrapper')}>
                <div className={cx('form-box login')}>
                    <h1 className={cx('form-box-title')}>Welcome Back!</h1>
                    <form id="login-form">
                        <div className={cx('input-box')}>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                required
                            />
                            <label>Username</label>
                        </div>
                        <div className={cx('input-box')}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                            <label>Password</label>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ background: 'transparent' }}
                                className={cx('toggle-password-button')}
                            >
                                <i className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true"></i>
                            </button>
                        </div>

                        <div className={cx('remember-forgot')}>
                            <Link to={'/forgetpassword'}>Forget Password</Link>
                        </div>
                        <button type="button" onClick={handleSignin} className={`${cx('btn')} ${cx('btn-login')}`}>
                            LOGIN
                        </button>
                        <div className={cx('login-register')}>
                            <p>
                                Don't have an account?
                                <Link to={'/register'} className={cx('register-link')}>
                                    Register
                                </Link>
                            </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Link to="/">
                                <button className="home-login" style={{ background: 'transparent' }}>
                                    <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
                                    Back to home
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
