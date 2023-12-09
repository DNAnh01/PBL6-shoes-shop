import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Button from '~/pages/Button';
import apiProfile from '../API/apiProfile';
import './style.scss';
import apiUpdateProfile from '../API/apiUpdateProfile';
import apiChangePass from '../API/apiChangePass';

export default function ProfileCard() {
    const [profiles, setProfiles] = useState([]);
    const [streetAddress, setstreetAddress] = useState('');
    const [defaultAddress, setDefaultAddress] = useState(null);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await apiProfile.getProfile();
                setProfiles(response.data);
                // Check if addresses is an array and not empty
                if (Array.isArray(response.data.addresses) && response.data.addresses.length > 0) {
                    // Set the first address as the default address
                    setDefaultAddress(response.data.addresses[0]);
                }
            } catch (error) {
                toast.error('Bạn cần đăng nhập để xem thông tin này');
            }
        };
        // Call the fetchProductGrid function
        fetchProfile();
    }, []);

    const image =
        'https://scontent.fsgn2-10.fna.fbcdn.net/v/t39.30808-6/328039816_914151769604724_1668073028896674479_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=maXa2WXfoYcAX-oaO4T&_nc_ht=scontent.fsgn2-10.fna&oh=00_AfD5fFLg63VB9q0uJccL8LAPi9EHJyJCiG9A9NOR0UJvhw&oe=6578758B';

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
        toast.success('Đăng xuất thành công');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('jwt');
        setTimeout(() => {
            navigate('/login');
        }, 2000);
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
                    toast.success('Thay đổi mật khẩu thành công');
                } else {
                    toast.error('Đã có lỗi xảy ra khi thay đổi mật khẩu');
                }
            } catch (error) {
                toast.error('Error changing password:', error);
            }
        } else {
            toast.error('Mật khẩu không khớp');
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
                toast.success('Cập nhật thông tin cá nhân thành công');
            } else {
                toast.error('Đã có lỗi xảy ra khi cập nhật thông tin cá nhân');
            }
        } catch (error) {
            toast.error('Đã có lỗi xảy ra khi cập nhật thông tin cá nhân');
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
                        <img src={image} alt="" className="profile-img"></img>
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
