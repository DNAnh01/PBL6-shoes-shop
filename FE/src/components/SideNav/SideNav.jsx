import React from 'react';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import classNames from 'classnames/bind';
import styles from './SideNav.module.scss';
import Icon from '../Icons/Icon';
import SideNavLinks from '../SideNavLinks';
import images from '~/assets/images';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
const SideNav = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('jwt');
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    };
    return (
        <aside className={cx('side-nav')}>
            <img className={cx('image')} src={images.logo} alt="logo" />
            <SideNavLinks />
            <Tippy delay={[0, 40]} content="Logout" placement="right">
                <div className={cx('icon')} onClick={handleLogout}>
                    <Icon icon="arrow" />
                </div>
            </Tippy>
        </aside>
    );
};

export default SideNav;
