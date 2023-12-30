package com.dnanh01.backend.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dnanh01.backend.dto.RevenueOrProfitStatsDto;
import com.dnanh01.backend.dto.SingleStatsDto;
import com.dnanh01.backend.exception.OrderException;
import com.dnanh01.backend.model.Address;
import com.dnanh01.backend.model.Cart;
import com.dnanh01.backend.model.CartItem;
import com.dnanh01.backend.model.Order;
import com.dnanh01.backend.model.OrderItem;
import com.dnanh01.backend.model.Product;
import com.dnanh01.backend.model.Size;
import com.dnanh01.backend.model.User;
import com.dnanh01.backend.repository.AddressRepository;
import com.dnanh01.backend.repository.CartItemRepository;
import com.dnanh01.backend.repository.CartRepository;
import com.dnanh01.backend.repository.OrderItemRepository;
import com.dnanh01.backend.repository.OrderRepository;
import com.dnanh01.backend.repository.ProductRepository;
import com.dnanh01.backend.repository.UserRepository;
import com.dnanh01.backend.request.ShippingAddressRequest;
import com.dnanh01.backend.response.BestSellingProductResponse;
import com.dnanh01.backend.response.StatisticsByDateOrMonthResponse;

@Service
public class OrderServiceImplementation implements OrderService {
	
	@Autowired
    private CartRepository cartRepository;
	private OrderRepository orderRepository;
	private CartService cartService;
	private AddressRepository addressRepository;
	private UserRepository userRepository;
	private OrderItemRepository orderItemRepository;
	private ProductRepository productRepository;
	private CartItemRepository cartItemRepository;
	
	

	public OrderServiceImplementation(CartRepository cartRepository, OrderRepository orderRepository,
			CartService cartService, AddressRepository addressRepository, UserRepository userRepository,
			OrderItemRepository orderItemRepository, ProductRepository productRepository,
			CartItemRepository cartItemRepository) {
		super();
		this.cartRepository = cartRepository;
		this.orderRepository = orderRepository;
		this.cartService = cartService;
		this.addressRepository = addressRepository;
		this.userRepository = userRepository;
		this.orderItemRepository = orderItemRepository;
		this.productRepository = productRepository;
		this.cartItemRepository = cartItemRepository;
	}

	@Override
	public Order createOrder(User user, ShippingAddressRequest reqShippingAddress) {

		Cart cart = cartService.findUserCart(user.getId());
		List<OrderItem> temporaryOrderItems = new ArrayList<>();

		List<Order> existingOrders = orderRepository.findByUser(user);
		if (existingOrders.isEmpty()) {

			return createNewOrder(user, reqShippingAddress, cart, temporaryOrderItems);
		} else {

			boolean isAddressMatching = user.getAddresses().stream()
					.anyMatch(address -> addressMatches(reqShippingAddress, address));

			if (isAddressMatching) {

				return createNewOrder(user, reqShippingAddress, cart, temporaryOrderItems);
			} else {

				Address newAddress = createNewAddress(user, reqShippingAddress);
				user.getAddresses().add(newAddress);
				userRepository.save(user);

				return createNewOrder(user, reqShippingAddress, cart, temporaryOrderItems);
			}
		}
	}

	private Order createNewOrder(User user, ShippingAddressRequest reqShippingAddress,
			Cart cart, List<OrderItem> temporaryOrderItems) {
		for (CartItem item : cart.getCartItems()) {
			OrderItem orderItem = createOrderItem(item);
			OrderItem createdOrderItem = orderItemRepository.save(orderItem);
			temporaryOrderItems.add(createdOrderItem);
		}

		Order createdOrder = new Order();
		createdOrder.setCreateAt(LocalDateTime.now());
		createdOrder.setDeliveryDate(LocalDateTime.now().plusWeeks(1));
		createdOrder.setDiscount(cart.getDiscount());
		createdOrder.setOrderDate(LocalDateTime.now());
		createdOrder.setOrderStatus("PENDING");
		createdOrder.setTotalDiscountedPrice(cart.getTotalDiscountedPrice());
		createdOrder.setTotalItem(cart.getTotalItem());
		createdOrder.setTotalPrice(cart.getTotalPrice());
		createdOrder.setOrderItems(temporaryOrderItems);
		createdOrder.setUser(user);

		Address shippingAddress = createNewAddress(user, reqShippingAddress);

		createdOrder.setShippingAddress(shippingAddress);

		Order savedOrder = orderRepository.save(createdOrder);

		temporaryOrderItems.forEach(item -> item.setOrder(savedOrder));
		orderItemRepository.saveAll(temporaryOrderItems);

		orderRepository.save(savedOrder);
		return savedOrder;
	}

	private OrderItem createOrderItem(CartItem cartItem) {
		OrderItem orderItem = new OrderItem();
		orderItem.setDeliveryDate(LocalDateTime.now().plusWeeks(1));
		orderItem.setDiscountedPrice(cartItem.getDiscountedPrice());
		orderItem.setPrice(cartItem.getPrice());
		orderItem.setQuantity(cartItem.getQuantity());
		orderItem.setSize(cartItem.getSize());
		orderItem.setUserId(cartItem.getUserId());
		orderItem.setProduct(cartItem.getProduct());
		return orderItem;
	}

	// private Address findOrCreateShippingAddress(User user, ShippingAddressRequest
	// reqShippingAddress) {
	// return user.getAddresses().stream()
	// .filter(address -> addressMatches(reqShippingAddress, address))
	// .findFirst()
	// .orElseGet(() -> createNewAddress(user, reqShippingAddress));
	// }

	private boolean addressMatches(ShippingAddressRequest reqShippingAddress, Address address) {
		return address.getStreetAddress().equals(reqShippingAddress.getStreetAddress())
				&& address.getCity().equals(reqShippingAddress.getCity())
				&& address.getState().equals(reqShippingAddress.getState())
				&& address.getZipCode().equals(reqShippingAddress.getZipCode());
	}

	private Address createNewAddress(User user, ShippingAddressRequest reqShippingAddress) {
		Address newAddress = new Address();
		newAddress.setFirstName(reqShippingAddress.getFirstName());
		newAddress.setLastName(reqShippingAddress.getLastName());
		newAddress.setMobile(reqShippingAddress.getMobile());
		newAddress.setStreetAddress(reqShippingAddress.getStreetAddress());
		newAddress.setCity(reqShippingAddress.getCity());
		newAddress.setState(reqShippingAddress.getState());
		newAddress.setZipCode(reqShippingAddress.getZipCode());
		newAddress.setCreationTime(LocalDateTime.now());
		newAddress.setUser(user);

		return addressRepository.save(newAddress);
	}

	@Override
	public Order findOrderById(Long orderId) throws OrderException {
		Optional<Order> opt = orderRepository.findById(orderId);
		if (opt.isPresent()) {
			return opt.get();
		}
		throw new OrderException("Order not exist with id: " + orderId);
	}

	@Override
	public List<Order> usersOrderHistory(Long userId) {
		List<Order> orders = orderRepository.getUsersOrders(userId);
		return orders;
	}

	@Override
	public Order pendingOrder(Long orderId) throws OrderException {
		Order order = findOrderById(orderId);
		List<OrderItem> orderItems = order.getOrderItems();

		for (OrderItem item : orderItems) {
			int quantity = item.getQuantity();
			String sizeName = item.getSize();
			Long productId = item.getProduct().getId();

			Product product = productRepository.findById(productId)
					.orElseThrow(() -> new OrderException("Product not found"));

			Optional<Size> optionalSize = product.getSizes().stream()
					.filter(size -> size.getName().equals(sizeName))
					.findFirst();

			optionalSize.ifPresent(size -> {
				int updatedQuantity = size.getQuantity() - quantity;
				if (updatedQuantity < 0) {
					try {
						throw new OrderException("Not enough quantity in size: ");
					} catch (OrderException e) {
						e.printStackTrace();
					}
				}
				size.setQuantity(updatedQuantity);
				product.setQuantity(product.getQuantity() - quantity);
				productRepository.save(product);
			});
		}

		order.setOrderStatus("PENDING");
		
		clearCart(order.getUser().getId());
		return order;
	}

	@Override
	public Order confirmedOrder(Long orderId) throws OrderException {
		Order order = findOrderById(orderId);
		order.setOrderStatus("CONFIRMED");
		return orderRepository.save(order);
	}

	@Override
	public Order shippedOrder(Long orderId) throws OrderException {
		Order order = findOrderById(orderId);

		if (!order.getOrderStatus().equals("CONFIRMED")) {
			throw new OrderException("Order must be in CONFIRMED state before shipping.");
		}

		order.setOrderStatus("SHIPPED");
		clearCartItems(order.getUser().getId());

		return orderRepository.save(order);
	}

	private void clearCartItems(Long userId) {

		List<CartItem> cartItems = (List<CartItem>) cartItemRepository.findByUserId(userId);

		cartItemRepository.deleteAll(cartItems);
	}

	@Override
	public Order deliveredOrder(Long orderId) throws OrderException {
		Order order = findOrderById(orderId);
		order.setOrderStatus("DELIVERED");
		return orderRepository.save(order);
	}

	// Phương thức xóa giỏ hàng
	private void clearCart(Long userId) {
		    Cart cart = cartService.findUserCart(userId);
		    cart.getCartItems().clear();
		    cartRepository.save(cart);
		}
	@Override
	public Order canceledOrder(Long orderId) throws OrderException {
		Order order = findOrderById(orderId);
		order.setOrderStatus("CANCELED");
		return orderRepository.save(order);
	}

	@Override
	public List<Order> getAllOrders() {
		return orderRepository.findAll();
	}

	@Override
	public void deleteOrder(Long orderId) throws OrderException {
		Order order = findOrderById(orderId);
		orderRepository.delete(order);
	}

	// --------------------dashboard admin--------------------

	@Override
	public List<RevenueOrProfitStatsDto> getStatsForSelectedDayRevenueAndProfit(String selectedDay)
			throws OrderException {

		List<Object[]> statsForSelectedDay = orderRepository.getStatsForSelectedDayRevenueAndProfit(selectedDay);

		if (statsForSelectedDay.isEmpty()) {
			throw new OrderException("You cannot aggregate stats for the date: " + selectedDay);
		}

		List<RevenueOrProfitStatsDto> result = new ArrayList<>();
		for (Object[] row : statsForSelectedDay) {
			result.add(new RevenueOrProfitStatsDto(
					(Long) row[0],
					(BigDecimal) row[1],
					(BigDecimal) row[2]));
		}
		return result;
	}

	@Override
	public List<RevenueOrProfitStatsDto> getStatsForSelectedMonthRevenueAndProfit(String selectedMonth)
			throws OrderException {
		List<Object[]> statsForSelectedMonth = orderRepository.getStatsForSelectedMonthRevenueAndProfit(selectedMonth);
		if (statsForSelectedMonth.isEmpty()) {
			throw new OrderException("You cannot aggregate for the month: " + selectedMonth);
		}
		List<RevenueOrProfitStatsDto> result = new ArrayList<>();
		for (Object[] row : statsForSelectedMonth) {
			result.add(new RevenueOrProfitStatsDto(
					(Long) row[0],
					(BigDecimal) row[1],
					(BigDecimal) row[2]));
		}
		return result;
	}

	@Override
	public StatisticsByDateOrMonthResponse getStatisticsByDate(String selectedDay)
			throws OrderException {
		List<Object[]> revenueForSelectedDay = orderRepository.getRevenueBySelectedDate(selectedDay);
		List<Object[]> profitForSelectedDay = orderRepository.getProfitBySelectedDate(selectedDay);
		List<Object[]> pendingOrderForSelectedDay = orderRepository
				.getPendingOrderedProductCountBySelectedDate(selectedDay);
		List<Object[]> countedUserForSelectedDay = orderRepository.getUserCountBySelectedDate(selectedDay);

		List<SingleStatsDto<BigDecimal>> tempRevenue = createStatsList(revenueForSelectedDay, "Revenue",
				BigDecimal.ZERO, "#de9a38", "uptrend");
		List<SingleStatsDto<BigDecimal>> tempProfit = createStatsList(profitForSelectedDay, "Profit", BigDecimal.ZERO,
				"#33b5e5", "usd");
		List<SingleStatsDto<BigDecimal>> tempPendingOrder = createStatsList(pendingOrderForSelectedDay, "Pending Order",
				BigDecimal.ZERO, "#f7c500", "cell_phone_link");
		List<SingleStatsDto<Long>> tempCountedUser = new ArrayList<>();
		for (Object[] row : countedUserForSelectedDay) {
			Long value = row.length > 0 && row[0] != null ? (Long) row[0] : 0;
			tempCountedUser.add(new SingleStatsDto<>("User Counted", (Long) value, "#45CE30", "user"));
		}
		StatisticsByDateOrMonthResponse result = new StatisticsByDateOrMonthResponse(
				getFirstElement(tempRevenue),
				getFirstElement(tempProfit),
				getFirstElement(tempPendingOrder),
				tempCountedUser.get(0));

		return result;
	}

	@Override
	public StatisticsByDateOrMonthResponse getStatisticsByMonth(String selectedMonth)
			throws OrderException {
		List<Object[]> revenueForSelectedMonth = orderRepository.getRevenueBySelectedMonth(selectedMonth);
		List<Object[]> profitForSelectedMonth = orderRepository.getProfitBySelectedMonth(selectedMonth);
		List<Object[]> pendingOrderForSelectedMonth = orderRepository
				.getPendingOrderedProductCountBySelectedMonth(selectedMonth);
		List<Object[]> countedUserForSelectedMonth = orderRepository.getUserCountBySelectedMonth(selectedMonth);

		List<SingleStatsDto<BigDecimal>> tempRevenue = createStatsList(revenueForSelectedMonth, "Revenue",
				BigDecimal.ZERO, "#de9a38", "uptrend");
		List<SingleStatsDto<BigDecimal>> tempProfit = createStatsList(profitForSelectedMonth, "Profit",
				BigDecimal.ZERO, "#33b5e5", "usd");
		List<SingleStatsDto<BigDecimal>> tempPendingOrder = createStatsList(pendingOrderForSelectedMonth,
				"Pending Order",
				BigDecimal.ZERO, "#f7c500", "cell_phone_link");
		List<SingleStatsDto<Long>> tempCountedUser = new ArrayList<>();
		for (Object[] row : countedUserForSelectedMonth) {
			Long value = row.length > 0 && row[0] != null ? (Long) row[0] : 0;
			tempCountedUser.add(new SingleStatsDto<>("User Counted", (Long) value, "#45CE30", "user"));
		}
		StatisticsByDateOrMonthResponse result = new StatisticsByDateOrMonthResponse(
				getFirstElement(tempRevenue),
				getFirstElement(tempProfit),
				getFirstElement(tempPendingOrder),
				tempCountedUser.get(0));

		return result;
	}

	private <T> List<SingleStatsDto<T>> createStatsList(List<Object[]> data, String title, T defaultValue, String color,
			String icon) {
		List<SingleStatsDto<T>> statsList = new ArrayList<>();

		if (data.isEmpty()) {
			statsList.add(new SingleStatsDto<>(title, defaultValue, color, icon));
		} else {
			for (Object[] row : data) {
				T value = row.length > 1 && row[1] != null ? (T) row[1] : defaultValue;
				statsList.add(new SingleStatsDto<>(title, value, color, icon));
			}
		}

		return statsList;
	}

	private <T> SingleStatsDto<T> getFirstElement(List<SingleStatsDto<T>> statsList) {
		return statsList.isEmpty() ? null : statsList.get(0);
	}

	@Override
	public BestSellingProductResponse getSellingProductToday(String selectedDay) throws OrderException {
		List<Object[]> listBestSellingProduct = orderRepository.getBestSellingProductToday(selectedDay);

		if (listBestSellingProduct.isEmpty()) {
			return createEmptyBestSellingProductResponse(); // Return empty response with null values
		}

		Object[] firstRow = listBestSellingProduct.get(0);
		return mapToBestSellingProductResponse(firstRow);
	}

	@Override
	public BestSellingProductResponse getSellingProductMonth(String selectedMonth) throws OrderException {
		List<Object[]> listBestSellingProduct = orderRepository.getBestSellingProductMonth(selectedMonth);

		if (listBestSellingProduct.isEmpty()) {
			return createEmptyBestSellingProductResponse(); // Return empty response with null values
		}

		Object[] firstRow = listBestSellingProduct.get(0);
		return mapToBestSellingProductResponse(firstRow);
	}

	private BestSellingProductResponse createEmptyBestSellingProductResponse() {
		return new BestSellingProductResponse(null, null, null, null, null);
	}

	private BestSellingProductResponse mapToBestSellingProductResponse(Object[] row) {
		Long productId = (Long) row[0];
		String title = (String) row[1];
		String imageUrl = (String) row[2];
		Integer discountedPrice = (Integer) row[3];
		Long appearanceCount = (Long) row[4];

		return new BestSellingProductResponse(productId, title, imageUrl, discountedPrice, appearanceCount);
	}
}
