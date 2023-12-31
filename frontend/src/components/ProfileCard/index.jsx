import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Button from '~/pages/Button';
import apiProfile from '~/api/user/apiProfile';
import './style.scss';
import apiUpdateProfile from '~/api/user/apiUpdateProfile';
import apiChangePass from '~/api/user/apiChangePass';
import img from '../../assets/images/index.js';
export default function ProfileCard() {
    const [profiles, setProfiles] = useState([]);
    const [defaultAddress, setDefaultAddress] = useState(null);

    const checksessionStorage = () => {
        if (!sessionStorage.getItem('jwt')) {
            navigate('/login');
            return false;
        }
        return true;
    };
    const fetchProfile = async () => {
        if (!checksessionStorage()) {
            return;
        }
        try {
            const response = await apiProfile();
            setProfiles(response.data);
            // Check if addresses is an array and not empty
            if (Array.isArray(response.data.addresses) && response.data.addresses.length > 0) {
                // Set the first address as the default address
                setDefaultAddress(response.data.addresses[0]);
            }
        } catch (error) {
            toast.error(' An error occurred while retrieving personal information');
        }
    };
    useEffect(() => {
        fetchProfile();
    }, []);

    // personal
    const [isEditing, setIsEditing] = useState(false);
    const [editedfirstname, setEditFisrtname] = useState('');
    const [editedlastname, setEditLastname] = useState('');
    const [editedMobile, setEditedMobile] = useState('');

    // change pass
    const [oldpassword, setOldpassword] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const [passwordconfim, setPasswordconfim] = useState('');

    // show 1 trong 2
    const [showPersonal, setShowPersonal] = useState(true);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const navigate = useNavigate();

    const handleShowPersonal = () => {
        setShowPersonal(true);
        setShowChangePassword(false);
    };
    const handleShowChangePassword = () => {
        setShowPersonal(false);
        setShowChangePassword(true);
    };
    const handleLogout = () => {
        toast.success('Signed out successfully');
        sessionStorage.clear();
        setTimeout(() => {
            navigate('/login');
        }, 500);
    };

    const handleEdit = () => {
        setEditedMobile(profiles.mobile);
        setEditFisrtname(profiles.firstName);
        setEditLastname(profiles.lastName);
        setIsEditing(!isEditing);
    };
    const handleChangePassword = async () => {
        if (newpassword === passwordconfim) {
            try {
                const formdata = {
                    oldPassword: oldpassword,
                    newPassword: newpassword,
                };
                const response = await apiChangePass.postChangepass(formdata);
                if (response.status === 200) {
                    toast.success('Password changed successfully');
                    handleCancel();
                }
            } catch (error) {
                toast.error('An error occurred while changing the password', error);
            }
        } else {
            toast.warning('password incorrect');
        }
    };
    const handleUpdateProfile = async () => {
        try {
            const formdata = {
                firstName: editedfirstname,
                lastName: editedlastname,
                mobile: editedMobile,
            };
            console.log(formdata);
            const response = await apiUpdateProfile.putUpdateprofile(formdata);
            if (response.status === 200) {
                fetchProfile();
                toast.success('Successfully updated personal information');
                setIsEditing(false);
            } else {
                toast.error('An error occurred while updating personal information');
            }
        } catch (error) {
            toast.error('An error occurred while updating personal information');
        }
    };
    const handleCancel = () => {
        setOldpassword('');
        setNewpassword('');
        setPasswordconfim('');
    };
    return (
        <section>
            <ToastContainer />
            <div className="profile container-layout">
                <h1 className="profile-title">Profile information</h1>
                <div className="profile-content">
                    <div className="profile-info">
                        <img src={img.complete} alt="" className="profile-img"></img>
                        <div className="profile-accout">
                            <span>{`${profiles.lastName} ${profiles.firstName}`}</span>
                        </div>
                    </div>
                    <div className="profile-detail">
                        <div className="profile-btn">
                            <button className="profile-btn-personal" onClick={handleShowPersonal}>
                                Personal Information
                            </button>
                            <button className="profile-btn-changepassword" onClick={handleShowChangePassword}>
                                Change Password
                            </button>
                            <button className="profile-btn-logout" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                        <div className={showPersonal ? 'profile-show-personal' : 'hidden'}>
                            <div className="profile-name">
                                <label className="profile-show-label">First Name</label>
                                <input
                                    type="text"
                                    value={isEditing ? editedfirstname : profiles.firstName}
                                    className="profile-show-input"
                                    onChange={(event) => setEditFisrtname(event.target.value)}
                                ></input>
                            </div>
                            <div className="profile-name">
                                <label className="profile-show-label">Last Name</label>
                                <input
                                    type="text"
                                    value={isEditing ? editedlastname : profiles.lastName}
                                    className="profile-show-input"
                                    onChange={(event) => setEditLastname(event.target.value)}
                                ></input>
                            </div>
                            <div className="profile-address">
                                <label className="profile-show-label">Địa chỉ</label>
                                {defaultAddress ? (
                                    <input
                                        type="text"
                                        defaultValue={`${defaultAddress?.streetAddress} - ${defaultAddress?.city}`}
                                        className="profile-show-input"
                                        readOnly
                                    />
                                ) : (
                                    <p>Không có địa chỉ</p>
                                )}
                            </div>
                            <div className="profile-email">
                                <label className="profile-show-label">Email</label>
                                {}
                                <input
                                    type="email"
                                    value={profiles.email}
                                    className="profile-show-input"
                                    readOnly
                                    style={{ background: '#d2d2d2' }}
                                />
                            </div>
                            <div className="profile-phone">
                                <label className="profile-show-label">Số điện thoại</label>
                                {}
                                <input
                                    type="text"
                                    value={isEditing ? editedMobile : profiles.mobile}
                                    onChange={(event) => setEditedMobile(event.target.value)}
                                    className="profile-show-input"
                                    readOnly={!isEditing}
                                />
                            </div>
                            {/* <div className="profile-sex">
                                <label className="profile-show-label">Giới tính</label>
                                <input
                                    type="radio"
                                    defaultValue={profiles.gender}
                                    checked={profiles.gender === 'male'}
                                />
                                <label>Nam</label>

                                <input
                                    type="radio"
                                    defaultValue={profiles.gender}
                                    checked={profiles.gender === 'female'}
                                />
                                <label>Nữ</label>
                            </div> */}

                            <div className="profile-btn-update">
                                {isEditing ? (
                                    <Button text="Lưu" onClick={handleUpdateProfile} />
                                ) : (
                                    <Button text="Chỉnh sửa" onClick={handleEdit} />
                                )}
                            </div>
                        </div>
                        <div className={showChangePassword ? 'profile-show-changepassword' : 'hidden'}>
                            <div className="profile-username">
                                <label className="profile-show-label">Oldpassword</label>
                                <input
                                    type="password"
                                    className="profile-show-input"
                                    value={oldpassword}
                                    onChange={(event) => setOldpassword(event.target.value)}
                                ></input>
                            </div>
                            <div className="profile-password">
                                <label className="profile-show-label">New Password</label>
                                <input
                                    type="password"
                                    className="profile-show-input"
                                    value={newpassword}
                                    onChange={(event) => setNewpassword(event.target.value)}
                                ></input>
                            </div>
                            <div className="profile-passwordconfim">
                                <label className="profile-show-label">Confim Password</label>
                                <input
                                    type="password"
                                    className="profile-show-input"
                                    value={passwordconfim}
                                    onChange={(event) => setPasswordconfim(event.target.value)}
                                ></input>
                            </div>
                            <div className="profile-btn-change">
                                <Button
                                    type="submit"
                                    text="Thay đổi mật khẩu"
                                    className="profile-btn-submit"
                                    onClick={handleChangePassword}
                                ></Button>
                                <Button
                                    type="submit"
                                    text="Hủy bỏ"
                                    className="profile-btn-cancel"
                                    onClick={handleCancel}
                                ></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
