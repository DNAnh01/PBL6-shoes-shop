import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import classNames from 'classnames/bind';
import styles from './LoginPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '~/states/Auth/Action';

const cx = classNames.bind(styles);
const getTokenFromLocalStorage = () => {
    return localStorage.getItem('token');
};
export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const dispatch = useDispatch();
    const { auth } = useSelector((store) => store);
    const navigate = useNavigate();
    useEffect(() => {
        console.log(rememberMe);
        const storedToken = getTokenFromLocalStorage();
        if (storedToken) {
            // Token exists, you can perform any additional actions if needed
            console.log('Token exists:', storedToken);
            // You can use the token as needed, for example, include it in your HTTP headers for API requests
            // axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
    }, [rememberMe]);

    const handleSignin = async () => {
        try {
            const formData = {
                email: username,
                password,
            };

            await dispatch(login(formData));

            localStorage.setItem('user', JSON.stringify(formData));
            if (auth?.user?.role === 'admin') {
                toast.success('Đang vào trang admin');
                setTimeout(() => {
                    navigate('/admin');
                }, 2000);
            } else if (auth?.user?.role === 'user') {
                toast.success('Đang vào trang chủ');
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        } catch (error) {
            // toast.error(error?.message);
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
