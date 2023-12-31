import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SummaryStatistics.module.scss';

import Stats from '../Stats';
import apiAdminDashboard from '~/api/admin/apiAdminDashbor';

const cx = classNames.bind(styles);
const SummaryStatistics = ({ selectedTime, setIsLoading }) => {
    const [stats, setStats] = useState({});
    useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                let res;
                if (selectedTime.length === 7) {
                    res = await apiAdminDashboard.getSummaryStatisticsForSelectedMonth(selectedTime);
                } else if (selectedTime.length === 10) {
                    res = await apiAdminDashboard.getSummaryStatisticsForSelectedDay(selectedTime);
                }
                setStats(res.data);
            } catch (error) {
                console.log({ error });
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [selectedTime]);

    const sections = ['section1', 'section2', 'section3', 'section4'];

    const renderStats = () => {
        return Object.entries(stats).map(([key, item]) => (
            <Stats
                key={key}
                stats={item.value.toLocaleString('vi-VN')}
                title={item.title}
                color={item.color}
                icon={item.icon}
            />
        ));
    };
    return (
        <div className={`align-items-center d-flex flex-column h-100 justify-content-around w-100`}>
            <div
                className={`${cx('grid')} 
                `}
            >
                {sections.map((section, index) => (
                    <div key={index} className={cx(section)}>
                        {renderStats()[index]}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SummaryStatistics;
