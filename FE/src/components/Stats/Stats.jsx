import React from 'react';
import classNames from 'classnames/bind';
import styles from './Stats.module.scss';
import Icon from '../Icons/Icon';

const cx = classNames.bind(styles);
const Stats = ({ stats, title, color, icon }) => {
    return (
        <div className={`${cx('container')} align-items-center d-flex h-75 justify-content-between w-100`}>
            <div className={cx('icon')} style={{ background: color }}>
                <Icon icon={icon} color="#fff" />
            </div>
            <div>
                <h6 className={cx('title')}>{title}</h6>
                <h5 className={cx('stats')}>{stats}</h5>
            </div>
        </div>
    );
};

export default Stats;
