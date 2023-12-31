import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

import classNames from 'classnames/bind';
import styles from './LineChart.module.scss';
import apiAdminDashboard from '~/api/admin/apiAdminDashbor';
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const cx = classNames.bind(styles);
const LineChart = ({ selectedTime, setIsLoading }) => {
    const [lineChartData, setLineChartData] = useState([]);
    useEffect(() => {
        console.log('selected time for line chart: ', selectedTime);
        setIsLoading(true);

        const fetchData = async () => {
            try {
                let res;
                if (selectedTime.length === 7) {
                    res = await apiAdminDashboard.getStatisticalChartForSelectedMonth(selectedTime);
                } else if (selectedTime.length === 10) {
                    res = await apiAdminDashboard.getStatisticalChartForSelectedDay(selectedTime);
                }

                setLineChartData(res.data);
                console.log({ lineChartData });
            } catch (error) {
                console.log({ error });
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTime]);

    const labels = lineChartData.map((item) => item?.timePoint);
    const revenueValues = lineChartData.map((item) => item?.revenue);
    const profitValues = lineChartData.map((item) => item?.profit);
    const data = {
        labels: [...labels],
        datasets: [
            {
                label: 'Revenue',
                data: [...revenueValues],
                backgroundColor: '#de9a38',
                borderColor: '#de9a38',
                pointBorderColor: '#de9a38',
                pointBorderWidth: 4,
                tension: 0.4,
            },
            {
                label: 'Profit',
                data: [...profitValues],
                backgroundColor: '#33b5e5',
                borderColor: '#33b5e5',
                pointBorderColor: '#33b5e5',
                pointBorderWidth: 4,
                tension: 0.4,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                suggestedMin: 0,
                suggestedMax: Math.max(...revenueValues, ...profitValues) + 5000000,
                ticks: {
                    callback: function (value) {
                        return new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        }).format(value);
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            }).format(context.parsed.y);
                        }
                        return label;
                    },
                },
            },
        },
    };
    // const chartRef = useRef();
    // const onClick = (event) => {
    //     if (getElementAtEvent(chartRef.current, event).length > 0) {
    //         console.log(getElementAtEvent(chartRef.current, event));
    //         const clickDatasetIndex = getElementAtEvent(chartRef.current, event)[0].element;
    //         console.log(clickDatasetIndex);
    //     }
    // };
    return (
        <div className={`${cx('container')} d-flex align-items-center justify-content-center`}>
            <Line type="monotone" data={data} options={options} />
        </div>
    );
};

export default LineChart;
