import React from 'react';
import { Line, getElementAtEvent } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './LineChart.module.scss';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const cx = classNames.bind(styles);
const LineChart = ({ reqData }) => {
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
                backgroundColor: '#3aae27',
                borderColor: '#3aae27',
                pointBorderColor: '#3aae27',
                pointBorderWidth: 4,
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
            <Line type="monotone" data={data} options={options} ref={chartRef} onClick={onClick} />
        </div>
    );
};

export default LineChart;
