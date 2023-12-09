import React from 'react';
import classNames from 'classnames/bind';
import styles from './TopNav.module.scss';
import SearchBar from '../SearchBar';
import Image from '../Image';
import images from '~/assets/images';

const cx = classNames.bind(styles);
const TopNav = () => {
    return (
        <nav className={`${cx('top-nav')} d-flex align-items-center justify-content-between px-3`}>
            <h5 className={cx('brand')}>Welcome to your dashboard</h5>
            <div className={`align-items-center d-flex justify-content-between`}>
                <SearchBar />
            </div>
            <Image className={cx('user-avatar')} src="" alt="Avatar" fallback={images.noImage} />
        </nav>
    );
};

export default TopNav;
