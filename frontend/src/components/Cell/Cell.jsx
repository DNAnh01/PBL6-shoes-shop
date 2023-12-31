import React from 'react';
import classNames from 'classnames/bind';
import styles from './Cell.module.scss';

const cx = classNames.bind(styles);
const Cell = ({ onClick, active = false, className, children, ...passProps }) => {
    const props = {
        onClick,
        ...passProps,
    };

    const classes = cx('container', {
        active,
        [className]: className,
    });
    return (
        <div onClick={active ? undefined : onClick} className={classes} {...props}>
            {children}
        </div>
    );
};

export default Cell;
