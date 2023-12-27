package com.dnanh01.backend.response;

import java.math.BigDecimal;

import com.dnanh01.backend.dto.SingleStatsDto;

public class StatisticsByDateOrMonthResponse {

    private SingleStatsDto<BigDecimal> revenue;
    private SingleStatsDto<BigDecimal> profit;
    private SingleStatsDto<BigDecimal> pendingOrder;
    private SingleStatsDto<Long> countedUser;

    public StatisticsByDateOrMonthResponse() {
    }

    public StatisticsByDateOrMonthResponse(SingleStatsDto<BigDecimal> revenue, SingleStatsDto<BigDecimal> profit,
            SingleStatsDto<BigDecimal> pendingOrder, SingleStatsDto<Long> countedUser) {
        this.revenue = revenue;
        this.profit = profit;
        this.pendingOrder = pendingOrder;
        this.countedUser = countedUser;
    }

    public SingleStatsDto<BigDecimal> getRevenue() {
        return revenue;
    }

    public void setRevenue(SingleStatsDto<BigDecimal> revenue) {
        this.revenue = revenue;
    }

    public SingleStatsDto<BigDecimal> getProfit() {
        return profit;
    }

    public void setProfit(SingleStatsDto<BigDecimal> profit) {
        this.profit = profit;
    }

    public SingleStatsDto<BigDecimal> getPendingOrder() {
        return pendingOrder;
    }

    public void setPendingOrder(SingleStatsDto<BigDecimal> pendingOrder) {
        this.pendingOrder = pendingOrder;
    }

    public SingleStatsDto<Long> getCountedUser() {
        return countedUser;
    }

    public void setCountedUser(SingleStatsDto<Long> countedUser) {
        this.countedUser = countedUser;
    }

}