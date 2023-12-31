import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import './style.scss';

export default function ForgetPassPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const [passwordconfim, setPasswordconfim] = useState('');

    const handleReset = async () => {
        if (username === 'user@gmail.com' && password === 'demoA@1234' && passwordconfim === 'demoA@1234') {
            toast.success('Password changed successfully');
            setTimeout(() => {
                navigate('/login');
            }, 500);
        } else {
            toast.error('Wrong account or different password');
        }
    };

    return (
        <div className="login-control body-login">
            <ToastContainer />
            <div className="wrapper">
                <div className="form-box login">
                    <h1 className="form-box-title">Forget Password</h1>
                    <form>
                        <div className="input-box">
                            <input
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                required
                            />
                            <label>Username or Number Phone</label>
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                            <label>New Password</label>
                        </div>
                        <div className="input-box">
                            <input
                                type="password"
                                value={passwordconfim}
                                onChange={(event) => setPasswordconfim(event.target.value)}
                                required
                            />
                            <label>Confirm Password</label>
                        </div>
                        <button type="submit" className="btn-resetpassword" onClick={handleReset}>
                            RESET PASSWORD
                        </button>
                        <div className="login-register">
                            <p>
                                If you already have an Account?
                                <Link to="/login" className="login-link">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
