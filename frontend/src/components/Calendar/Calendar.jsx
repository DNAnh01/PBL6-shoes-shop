import React, { useEffect, useState } from 'react';
import { startOfMonth, endOfMonth, differenceInDays, format, sub, add, setDate, parse } from 'date-fns';

import classNames from 'classnames/bind';
import styles from './Calendar.module.scss';

import Cell from '~/components/Cell';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const cx = classNames.bind(styles);
const Calendar = ({ selectedTimeCurrent, setSelectedTimeCurrent }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [activeCell, setActiveCell] = useState(null);
    useEffect(() => {
        const date = parse(
            selectedTimeCurrent,
            selectedTimeCurrent.length === 7 ? 'MM/yyyy' : 'dd/MM/yyyy',
            currentDate,
        );
        setActiveCell(date.getDate());

        setCurrentDate(date);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTimeCurrent]);

    const startDate = startOfMonth(currentDate);
    const endDate = endOfMonth(currentDate);
    const numDays = differenceInDays(endDate, startDate) + 1;

    const prefixDays = startDate.getDay();
    const suffixDays = 6 - endDate.getDay();

    const prevMonth = () => setCurrentDate(sub(currentDate, { months: 1 }));
    const nextMonth = () => setCurrentDate(add(currentDate, { months: 1 }));

    const prevYear = () => setCurrentDate(sub(currentDate, { years: 1 }));
    const nextYear = () => setCurrentDate(add(currentDate, { years: 1 }));

    const handleClickDate = (ipDate) => {
        const date = setDate(currentDate, ipDate);
        const dateString = format(date, 'dd/MM/yyyy');
        setSelectedTimeCurrent(dateString);
        setActiveCell(ipDate);
    };

    const handleClickMonthTitle = () => {
        const dateString = format(currentDate, 'MM/yyyy'); // Set month only
        setSelectedTimeCurrent(dateString);
        setActiveCell(null);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <Cell onClick={prevYear}>{'<<'}</Cell>
                <Cell onClick={prevMonth}>{'<'}</Cell>
                <Cell className={cx('title')} onClick={handleClickMonthTitle}>
                    {format(currentDate, 'LLLL yyyy')}
                </Cell>
                <Cell onClick={nextMonth}>{'>'}</Cell>
                <Cell onClick={nextYear}>{'>>'}</Cell>

                {daysOfWeek.map((day) => (
                    <Cell key={day} className={cx('days-of-week')}>
                        {day}
                    </Cell>
                ))}

                {Array.from({ length: prefixDays }).map((_, index) => (
                    <Cell key={index} />
                ))}

                {Array.from({ length: numDays }).map((_, index) => {
                    const date = index + 1;

                    return (
                        <Cell key={index} active={activeCell === date} onClick={() => handleClickDate(date)}>
                            {date}
                        </Cell>
                    );
                })}

                {Array.from({ length: suffixDays }).map((_, index) => (
                    <Cell key={index} />
                ))}
            </div>
        </div>
    );
};

export default Calendar;
