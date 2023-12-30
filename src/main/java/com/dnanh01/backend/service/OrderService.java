package com.dnanh01.backend.service;

import java.util.List;

import com.dnanh01.backend.dto.RevenueOrProfitStatsDto;
import com.dnanh01.backend.exception.OrderException;
import com.dnanh01.backend.model.Address;
import com.dnanh01.backend.model.Cart;
import com.dnanh01.backend.model.Order;
import com.dnanh01.backend.model.User;
import com.dnanh01.backend.request.ShippingAddressRequest;
import com.dnanh01.backend.response.BestSellingProductResponse;
import com.dnanh01.backend.response.StatisticsByDateOrMonthResponse;

public interface OrderService {

	public Order createOrder(User user, ShippingAddressRequest shippingAddress);

	public Order findOrderById(Long orderId) throws OrderException;

	public List<Order> usersOrderHistory(Long userId);
	
	public Order pendingOrder(Long orderId) throws OrderException;

	public Order confirmedOrder(Long orderId) throws OrderException;

	public Order shippedOrder(Long orderId) throws OrderException;

	public Order deliveredOrder(Long orderId) throws OrderException;

	public Order canceledOrder(Long orderId) throws OrderException;

	public List<Order> getAllOrders();

	public void deleteOrder(Long orderId) throws OrderException;
	
	
	// --------------------dashboard admin--------------------
	public List<RevenueOrProfitStatsDto> getStatsForSelectedDayRevenueAndProfit(String selectedDay)
				throws OrderException;

	public List<RevenueOrProfitStatsDto> getStatsForSelectedMonthRevenueAndProfit(
				String selectedMonth) throws OrderException;

	public StatisticsByDateOrMonthResponse getStatisticsByDate(String selectedDay)
				throws OrderException;

	public StatisticsByDateOrMonthResponse getStatisticsByMonth(String selectedMonth)
				throws OrderException;

	public BestSellingProductResponse getSellingProductToday(String selectedDay) throws OrderException;

	public BestSellingProductResponse getSellingProductMonth(String selectedMonth) throws OrderException;
		
}
