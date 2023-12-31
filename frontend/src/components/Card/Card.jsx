import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Card.module.scss';
import Icon from '../Icons/Icon';
import Calendar from '../Calendar';
import HeadlessTippy from '@tippyjs/react/headless';
import { format } from 'date-fns';

const cx = classNames.bind(styles);

const Card = ({ headline, children, setSelectedTime, isLoading, setIsLoading }) => {
    const [showCalendar, setShowCalendar] = useState(false);

    const [selectedTimeCurrent, setSelectedTimeCurrent] = useState(format(new Date(), 'dd/MM/yyyy'));

    useEffect(() => {
        setSelectedTime(selectedTimeCurrent);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTimeCurrent]);

    const toggleCalendar = () => {
        setShowCalendar((prevShowCalendar) => !prevShowCalendar);
    };

    const handelToday = () => {
        const today = new Date();
        const formattedToday = format(today, 'dd/MM/yyyy');
        setSelectedTimeCurrent(formattedToday);
    };

    const handelClose = () => {
        // setIsLoading(true);
        setShowCalendar(false);
    };

    return (
        <div className={`${cx('card')} w-100 h-100`}>
            <div className={`align-items-center d-flex justify-content-between`}>
                <h6 className={`${cx('headline')} mb-0`}>{headline}</h6>
                <h6>{selectedTimeCurrent}</h6>
                <HeadlessTippy
                    interactive
                    visible={showCalendar}
                    render={() => (
                        <div className={`${cx('calendar-box')} align-items-center d-flex flex-column`}>
                            <Calendar
                                selectedTimeCurrent={selectedTimeCurrent}
                                setSelectedTimeCurrent={setSelectedTimeCurrent}
                            />
                            <div className={`align-items-center d-flex justify-content-between w-100 h-100`}>
                                <btn className={cx('action-btn')} onClick={handelToday}>
                                    Today
                                </btn>

                                <btn className={cx('action-btn')} onClick={handelClose}>
                                    Close
                                </btn>
                            </div>
                        </div>
                    )}
                    placement="bottom-end"
                >
                    <div>
                        {!isLoading && <Icon icon="calendar" onClick={toggleCalendar} width="16" height="16" />}
                        {isLoading && <Icon icon="loading" classes={cx('loading')} width="16" height="16" />}
                    </div>
                </HeadlessTippy>
            </div>
            <div className={`align-items-center d-flex h-100 justify-content-center w-100`}>{children}</div>
        </div>
    );
};
export default Card;
