import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./style.scss";

export default function ForgetPassPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordconfim, setPasswordconfim] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    // if (
    //   username === "admin" &&
    //   password === "admin" &&
    //   passwordconfim === "admin"
    // ) {
    //   toast.success("Thay đổi mật khẩu thành công");
    //   setTimeout(() => {
    //     navigate("/login");
    //   }, 2000);
    // } else {
    //   toast.error("Sai tài khoản hoặc mật khẩu chưa giống nhau");
    // }
  };

  return (
    <div className="login-control body-login">
      <ToastContainer />
      <div className="wrapper">
        <div className="form-box login">
          <h1>Forget Password</h1>
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
            <button
              type="submit"
              className="btn-resetpassword"
              onClick={handleReset}
            >
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
