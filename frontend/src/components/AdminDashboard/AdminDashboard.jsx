import React, { Fragment, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AdminDashboard.module.scss';
import Icon from '../Icons/Icon';
import Card from '~/components/Card';
import LineChart from '../LineChart';
import SummaryStatistics from '../SummaryStatistics';
import { LineChartData } from '~/components/LineChart/LineChartData';
import BestSellingProduct from '../BestSellingProduct';

const cx = classNames.bind(styles);
const AdminDashboard = () => {
    const [selectedTimeForSummaryStatistics, setSelectedTimeForSummaryStatistics] = useState('');
    const [selectedTimeForLineChart, setSelectedTimeForLineChart] = useState('');
    const [selectedTimeForBestSellingProductToday, setSelectedTimeForBestSellingProductToday] = useState('');

    const [isLoadingForSummaryStatistics, setIsLoadingForSummaryStatistics] = useState(false);
    const [isLoadingForLineChart, setIsLoadingForLineChart] = useState(false);
    const [isLoadingForBestSellingProductToday, setIsLoadingForBestSellingProductToday] = useState(false);

    return (
        <Fragment>
            <header className={`align-items-center d-flex p-2`}>
                <Icon icon="dashboard" classes={`ml-2`} />
                <h5 className={`mb-0 ml-4`}>Admin Dashboard</h5>
            </header>
            <div className={`${cx('grid')} pb-3`}>
                <div className={cx('section1')}>
                    <Card
                        headline={'Summary Statistics'}
                        setSelectedTime={setSelectedTimeForSummaryStatistics}
                        isLoading={isLoadingForSummaryStatistics}
                        setIsLoading={setIsLoadingForSummaryStatistics}
                    >
                        <SummaryStatistics
                            selectedTime={selectedTimeForSummaryStatistics}
                            setIsLoading={setIsLoadingForSummaryStatistics}
                        />
                    </Card>
                </div>
                <div className={cx('section2')}>
                    <Card
                        headline={'Statistical Chart'}
                        setSelectedTime={setSelectedTimeForLineChart}
                        isLoading={isLoadingForLineChart}
                        setIsLoading={setIsLoadingForLineChart}
                    >
                        <LineChart
                            selectedTime={selectedTimeForLineChart}
                            setIsLoading={setIsLoadingForLineChart}
                            reqData={LineChartData}
                        />
                    </Card>
                </div>
                <div className={cx('section3')}>
                    <Card
                        headline={'Best Selling Product'}
                        setSelectedTime={setSelectedTimeForBestSellingProductToday}
                        isLoading={isLoadingForBestSellingProductToday}
                        setIsLoading={setIsLoadingForBestSellingProductToday}
                    >
                        <BestSellingProduct
                            selectedTime={selectedTimeForBestSellingProductToday}
                            setIsLoading={setIsLoadingForBestSellingProductToday}
                        />
                    </Card>
                </div>
            </div>
        </Fragment>
    );
};

export default AdminDashboard;
