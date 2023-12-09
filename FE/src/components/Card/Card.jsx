import React from 'react';
import classNames from 'classnames/bind';
import styles from './Card.module.scss';

const cx = classNames.bind(styles);
const Card = ({ headline, children }) => {
    return (
        <div className={`${cx('card')} w-100 h-100`}>
            <div className={`align-items-baseline d-flex justify-content-between`}>
                <h6 className={`${cx('headline')} mb-0`}>{headline}</h6>
            </div>
            <div className={`align-items-center d-flex h-100 justify-content-center w-100`}>{children}</div>
        </div>
    );
};

export default Card;
