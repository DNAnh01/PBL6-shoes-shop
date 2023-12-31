import axiosClient from '../axiosClient';
const apiAdminDashboard = {
    getSummaryStatisticsForSelectedDay(selectedDay) {
        const url = `/api/admin/dashboard/stats/selected-day?selectedDay=${selectedDay}`;
        return axiosClient.get(url);
    },
    getSummaryStatisticsForSelectedMonth(selectedMonth) {
        const url = `/api/admin/dashboard/stats/selected-month?selectedMonth=${selectedMonth}`;
        return axiosClient.get(url);
    },
    getStatisticalChartForSelectedDay(selectedDay) {
        const url = `/api/admin/dashboard/line-chart/selected-day?selectedDay=${selectedDay}`;
        return axiosClient.get(url);
    },
    getStatisticalChartForSelectedMonth(selectedMonth) {
        const url = `/api/admin/dashboard/line-chart/selected-month?selectedMonth=${selectedMonth}`;
        return axiosClient.get(url);
    },
    getBestSellingProductBySelectedDay(selectedDay) {
        const url = `/api/admin/dashboard/best-selling-selected-day?selectedDay=${selectedDay}`;
        return axiosClient.get(url);
    },
    getBestSellingProductBySelectedMonth(selectedMonth) {
        const url = `/api/admin/dashboard//best-selling-selected-month?selectedMonth=${selectedMonth}`;
        return axiosClient.get(url);
    },
};

export default apiAdminDashboard;
