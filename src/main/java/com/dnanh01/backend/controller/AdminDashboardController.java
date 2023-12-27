package com.dnanh01.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dnanh01.backend.dto.RevenueOrProfitStatsDto;
import com.dnanh01.backend.exception.OrderException;
import com.dnanh01.backend.response.BestSellingProductResponse;
import com.dnanh01.backend.response.StatisticsByDateOrMonthResponse;
import com.dnanh01.backend.service.OrderService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/line-chart/selected-day")
    public ResponseEntity<List<RevenueOrProfitStatsDto>> getStatsForSelectedDayRevenueAndProfit(
            @RequestHeader("Authorization") String jwt,
            @RequestParam String selectedDay) throws OrderException {
        List<RevenueOrProfitStatsDto> statsForSelectedDay = orderService
                .getStatsForSelectedDayRevenueAndProfit(selectedDay);
        return ResponseEntity.status(HttpStatus.OK).body(statsForSelectedDay);
    }

    @GetMapping("/line-chart/selected-month")
    public ResponseEntity<List<RevenueOrProfitStatsDto>> getStatsForSelectedMonthRevenueAndProfit(
            @RequestHeader("Authorization") String jwt,
            @RequestParam String selectedMonth) throws OrderException {
        List<RevenueOrProfitStatsDto> statsForSelectedMonth = orderService
                .getStatsForSelectedMonthRevenueAndProfit(selectedMonth);
        return ResponseEntity.status(HttpStatus.OK).body(statsForSelectedMonth);
    }

    @GetMapping("/stats/selected-day")
    public ResponseEntity<StatisticsByDateOrMonthResponse> getStatisticsForSelectedDay(
            @RequestHeader("Authorization") String jwt,
            @RequestParam String selectedDay) throws OrderException {
        StatisticsByDateOrMonthResponse statisticsForSelectedDay = orderService.getStatisticsByDate(selectedDay);
        return ResponseEntity.status(HttpStatus.OK).body(statisticsForSelectedDay);
    }

    @GetMapping("/stats/selected-month")
    public ResponseEntity<StatisticsByDateOrMonthResponse> getStatisticsForSelectedMonth(
            @RequestHeader("Authorization") String jwt,
            @RequestParam String selectedMonth) throws OrderException {
        StatisticsByDateOrMonthResponse statisticsForSelectedMonth = orderService.getStatisticsByMonth(selectedMonth);
        return ResponseEntity.status(HttpStatus.OK).body(statisticsForSelectedMonth);
    }

    @GetMapping("/best-selling-selected-day")
    public ResponseEntity<BestSellingProductResponse> getSellingProductToday(
            @RequestHeader("Authorization") String jwt,
            @RequestParam String selectedDay) throws OrderException {
        BestSellingProductResponse bestSellingProductTodayResponse = orderService.getSellingProductToday(selectedDay);
        return ResponseEntity.status(HttpStatus.OK).body(bestSellingProductTodayResponse);
    }

    @GetMapping("/best-selling-selected-month")
    public ResponseEntity<BestSellingProductResponse> getSellingProductMonth(
            @RequestHeader("Authorization") String jwt,
            @RequestParam String selectedMonth) throws OrderException {
        BestSellingProductResponse bestSellingProductMonthResponse = orderService.getSellingProductMonth(selectedMonth);
        return ResponseEntity.status(HttpStatus.OK).body(bestSellingProductMonthResponse);
    }

}
