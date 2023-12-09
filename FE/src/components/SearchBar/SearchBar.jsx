import React from 'react';
import classNames from 'classnames/bind';
import styles from './SearchBar.module.scss';
import Icon from '../Icons/Icon';

const cx = classNames.bind(styles);
const SearchBar = () => {
    return (
        <div className={cx('search')}>
            <div className={cx('icon')}>
                <Icon icon="search" width="22px" height="22px" />
            </div>
            <input className={cx('input')} type="search" placeholder="Search" />
            <div className={cx('icon')}>
                <Icon icon="arrow" width="22px" height="22px" />
            </div>
        </div>
    );
};

export default SearchBar;
