import React, { Fragment } from 'react';
import classNames from 'classnames/bind';
import styles from './AdminDashboard.module.scss';
import Icon from '../Icons/Icon';
import Card from '~/components/Card';
import Achievement from '../Achievement/Achievement';
import MonthlyOverview from '../MonthlyOverview';

const cx = classNames.bind(styles);
const AdminDashboard = () => {
    return (
        <Fragment>
            <header className={`align-items-center d-flex p-2`}>
                <Icon icon="dashboard" classes={`ml-2`} />
                <h5 className={`mb-0 ml-4`}>Admin Dashboard</h5>
            </header>
            <div className={`${cx('grid')} pb-3`}>
                <div className={cx('section1')}>
                    <Card headline={'Shoes Shop'}>
                        <Achievement />
                    </Card>
                </div>
                <div className={cx('section2')}>
                    <Card headline={'Monthly Overview'}>
                        <MonthlyOverview />
                    </Card>
                </div>
                <div className={cx('section3')}>
                    <Card headline={'Weekly Overview'}></Card>
                </div>
                <div className={cx('section4')}>
                    <Card headline={'Total Earning'} />
                </div>
                <div className={cx('section5')}>
                    <Card headline={'Total Profit'}></Card>
                </div>
                <div className={cx('section6')}>
                    <Card headline={'Refunds'}></Card>
                </div>
                <div className={cx('section7')}>
                    <Card headline={'Now Orders'}></Card>
                </div>
                <div className={cx('section8')}>
                    <Card headline={'Sales Queries'} />
                </div>
            </div>
        </Fragment>
    );
};

export default AdminDashboard;
