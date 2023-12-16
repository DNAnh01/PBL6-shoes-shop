import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import classNames from 'classnames/bind';
import styles from './LoginPage.module.scss';
import apiLogin from '~/api/user/apiLogin';

const cx = classNames.bind(styles);
const getTokenFromLocalStorage = () => {
    return localStorage.getItem('token');
};
export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const storedToken = getTokenFromLocalStorage();
        if (storedToken) {
        }
    }, [rememberMe]);

    const handleSignin = async () => {
        try {
            const formData = {
                email: username,
                password,
            };
            const response = await apiLogin.postLogin(formData);
            if (response) {
                localStorage.setItem('token', response?.data?.jwt);
                localStorage.setItem('user', JSON.stringify(formData));
                localStorage.setItem('jwt', response?.data?.jwt);
                if (response?.data?.role === 'admin') {
                    toast.success('Đang vào trang admin');
                    setTimeout(() => {
                        navigate('/admin/dashboard');
                    }, 2000);
                } else if (response?.data?.role === 'user') {
                    toast.success('Đang vào trang chủ');
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                }
            }
        } catch (error) {
            console.log(error?.message);
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
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                            <label>Password</label>
                        </div>

                        <div className={cx('remember-forgot')}>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                />
                                <label>Remember me</label>
                            </div>

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
                    </form>
                </div>
            </div>
        </div>
    );
}
