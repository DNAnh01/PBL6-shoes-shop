import React from 'react';
import classNames from 'classnames/bind';
import styles from './MonthlyOverview.module.scss';

import Stats from '../Stats';

const salesData = [
    {
        stats: '245k',
        title: 'Sales',
        color: '#0ABDE3',
        icon: 'uptrend',
    },
    {
        stats: '12.5k',
        title: 'Customers',
        color: '#45CE30',
        icon: 'user',
    },
    {
        stats: '1.25k',
        title: 'Products',
        color: '#f7c500',
        icon: 'cell_phone_link',
    },
    {
        stats: '25k',
        title: 'Revenue',
        color: '#33b5e5',
        icon: 'usd',
    },
];

const renderStats = () => {
    return salesData.map((item, index) => (
        <Stats key={index} stats={item.stats} title={item.title} color={item.color} icon={item.icon} />
    ));
};

const cx = classNames.bind(styles);
const MonthlyOverview = () => {
    const sections = ['section1', 'section2', 'section3', 'section4'];
    return (
        <div className={`align-items-center d-flex flex-column h-100 justify-content-around w-100`}>
            <h6 className={`${cx('title')}`}>Total 48.5% growth 😎 this month</h6>
            <div
                className={`${cx('grid')} 
                grid align-items-center d-flex flex-grow-1 grid h-100 justify-content-around p-3 w-100`}
            >
                {sections.map((section, index) => (
                    <div key={index} className={section}>
                        {renderStats()[index]}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MonthlyOverview;
