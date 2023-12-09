import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SideNavLinks.module.scss';
import Icon from '../Icons/Icon';

const cx = classNames.bind(styles);

const SideNavLinks = () => {
    const menu = [
        { icon: 'dashboard', tippyMessage: 'Admin dashboard', path: '/admin/' },
        { icon: 'products', tippyMessage: 'Products', path: '/admin/products' },
        { icon: 'customers', tippyMessage: 'Customers', path: '/admin/customers' },
        { icon: 'orders', tippyMessage: 'Orders', path: '/admin/orders' },
        { icon: 'add_product', tippyMessage: 'Add product', path: '/admin/product/create' },
    ];

    const navigate = useNavigate();

    const handleNavigation = (path) => {
        const currentPath = window.location.pathname;

        // Check if the current path already contains the base path
        if (!currentPath.startsWith('/admin')) {
            navigate('/admin' + path);
        } else {
            navigate(path);
        }
    };

    return (
        <div className={cx('panel')}>
            {menu.map((obj, index) => (
                <Tippy key={index} delay={[0, 40]} content={obj.tippyMessage} placement="right">
                    <div
                        className={`${cx('icon')} mb-4`}
                        key={`${index}-${obj.icon}`}
                        onClick={() => handleNavigation(obj.path)}
                    >
                        <Icon icon={obj.icon} />
                    </div>
                </Tippy>
            ))}
        </div>
    );
};

export default SideNavLinks;
