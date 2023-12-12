import React, { useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './BarChart.module.scss';

import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar, getElementAtEvent } from 'react-chartjs-2';
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const cx = classNames.bind(styles);
const BarChart = ({ reqData }) => {
    const title = reqData?.title;
    const content = reqData?.content;

    const labels = content.map((item) => item?.label);
    const values = content.map((item) => item?.value);

    const data = {
        labels: [...labels],
        datasets: [
            {
                label: title,
                data: [...values],
                borderColor: 'black',
                backgroundColor: ['#078be2', '#fa5c5c'],
                borderWidth: 1,
                tension: 0.4,
            },
        ],
    };

    const options = {};

    const chartRef = useRef();
    const onClick = (event) => {
        if (getElementAtEvent(chartRef.current, event).length > 0) {
            console.log(getElementAtEvent(chartRef.current, event));
            const clickDatasetIndex = getElementAtEvent(chartRef.current, event)[0].element;
            console.log(clickDatasetIndex);
        }
    };
    return (
        <div className={`${cx('container')} d-flex align-items-center justify-content-center`}>
            <Bar type="monotone" data={data} options={options} ref={chartRef} onClick={onClick} />
        </div>
    );
};

export default BarChart;
