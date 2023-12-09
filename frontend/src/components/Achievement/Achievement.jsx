import React from 'react';
import classNames from 'classnames/bind';
import styles from './Achievement.module.scss';
import images from '~/assets/images';
import Button from '../Button';

const cx = classNames.bind(styles);
const Achievement = () => {
    return (
        <div className={`align-items-center d-flex h-100 justify-content-around w-100`}>
            <div className={`align-items-sm-start d-flex flex-column h-100 justify-content-around w-75`}>
                <h6 className={`${cx('title')} p-1`}>Congratulations 🎉</h6>
                <h5 className={`${cx('total-price')} p-1`}>199.8k</h5>
                <Button primary rounded small className={cx('btn')}>
                    View Sales
                </Button>
            </div>
            <img
                className={`align-items-center d-flex h-50 justify-content-center w-25`}
                src={images.achievement}
                alt="achievement img"
            />
        </div>
    );
};

export default Achievement;
