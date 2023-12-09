import React from 'react';
import classNames from 'classnames/bind';
import styles from './SingleProduct.module.scss';
import Icon from '../Icons/Icon';

const cx = classNames.bind(styles);

const SingleProduct = ({ imgSrc, imgAlt, amount, percentage, icon, isUptrend }) => {
    const trendColorClass = isUptrend
        ? { iconColor: '#2dc157', titleStyle: 'text-success' }
        : { iconColor: '#c12d2d', titleStyle: 'text-danger' };

    return (
        <div className={`align-items-center d-flex h-75 justify-content-between w-75`}>
            <img className={`${cx('img')} `} src={imgSrc} alt={imgAlt} />

            <div className={`align-items-lg-start d-flex flex-column h-50 justify-content-between w-50`}>
                <div className={`align-items-center d-flex justify-content-between w-100`}>
                    <Icon icon={icon} width="14px" height="14px" />
                    <h5 className={`${cx('title')} mb-0`}>{amount}</h5>
                </div>
                <div className={`align-items-center d-flex justify-content-between w-100`}>
                    <Icon
                        icon={isUptrend ? 'uptrend' : 'downtrend'}
                        width="14px"
                        height="14px"
                        color={trendColorClass.iconColor}
                    />
                    <h5 className={`${cx('title')} mb-0 ${trendColorClass.titleStyle}`}>{percentage}</h5>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
