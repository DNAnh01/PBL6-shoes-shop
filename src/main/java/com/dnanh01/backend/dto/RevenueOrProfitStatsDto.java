package com.dnanh01.backend.dto;

import java.math.BigDecimal;

public class RevenueOrProfitStatsDto {

    public static final String TIME_POINT = "timePoint";
    public static final String REVENUE = "revenue";
    public static final String PROFIT = "profit";

    private Long timePoint;
    private BigDecimal revenue;
    private BigDecimal profit;

    public RevenueOrProfitStatsDto() {

    }

    public RevenueOrProfitStatsDto(Long timePoint, BigDecimal revenue, BigDecimal profit) {
        this.timePoint = timePoint;
        this.revenue = revenue;
        this.profit = profit;
    }

    public Long getTimePoint() {
        return timePoint;
    }

    public void setTimePoint(Long timePoint) {
        this.timePoint = timePoint;
    }

    public BigDecimal getRevenue() {
        return revenue;
    }

    public void setRevenue(BigDecimal revenue) {
        this.revenue = revenue;
    }

    public BigDecimal getProfit() {
        return profit;
    }

    public void setProfit(BigDecimal profit) {
        this.profit = profit;
    }

}