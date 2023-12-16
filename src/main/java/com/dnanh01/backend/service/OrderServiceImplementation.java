package com.dnanh01.backend.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dnanh01.backend.exception.OrderException;
import com.dnanh01.backend.model.Address;
import com.dnanh01.backend.model.Cart;
import com.dnanh01.backend.model.CartItem;
import com.dnanh01.backend.model.HistoryOrder;
import com.dnanh01.backend.model.HistoryOrderItem;
import com.dnanh01.backend.model.Order;
import com.dnanh01.backend.model.OrderItem;
import com.dnanh01.backend.model.Product;
import com.dnanh01.backend.model.Size;
import com.dnanh01.backend.model.User;
import com.dnanh01.backend.repository.AddressRepository;
import com.dnanh01.backend.repository.CartRepository;
import com.dnanh01.backend.repository.HistoryOrderRepository;
import com.dnanh01.backend.repository.OrderItemRepository;
import com.dnanh01.backend.repository.OrderRepository;
import com.dnanh01.backend.repository.ProductRepository;
import com.dnanh01.backend.repository.UserRepository;
import com.dnanh01.backend.request.ShippingAddressRequest;

@Service
public class OrderServiceImplementation implements OrderService {

	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private OrderRepository orderRepository;
	@Autowired
	private CartService cartService;
	@Autowired
	private AddressRepository addressRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private OrderItemService orderItemService;
	@Autowired
	private HistoryOrderRepository historyOrderRepository;
	@Autowired
	private OrderItemRepository orderItemRepository;
	@Autowired
	private CartRepository cartRepository;
//	private ProductRepository productRepository;

	public OrderServiceImplementation(OrderRepository orderRepository, CartService cartService,
			AddressRepository addressRepository, UserRepository userRepository, OrderItemService orderItemService,
			OrderItemRepository orderItemRepository) {
		this.orderRepository = orderRepository;
		this.cartService = cartService;
		this.addressRepository = addressRepository;
		this.userRepository = userRepository;
		this.orderItemService = orderItemService;
		this.orderItemRepository = orderItemRepository;
	}

	@Override
	public Order createOrder(User user, ShippingAddressRequest reqShippingAddress) {

		List<Order> existingOrders = orderRepository.findByUser(user);


		Address existingAddress = findExistingAddress(user, reqShippingAddress);
		Address address;

		if (existingAddress != null) {
			// Use the existing address if available
			address = existingAddress;
			updateOrder(existingOrders.get(0), reqShippingAddress);
		} else {
			// Create a new address if no existing address is found
			address = createNewAddress(user, reqShippingAddress);
		}
		// Continue with the rest of the order creation logic
		Cart cart = cartService.findUserCart(user.getId());
		List<OrderItem> orderItems = new ArrayList<>();

		for (CartItem item : cart.getCartItems()) {
			OrderItem orderItem = new OrderItem();
			orderItem.setProduct(item.getProduct());
			orderItem.setSize(item.getSize());
			orderItem.setQuantity(item.getQuantity());
			orderItem.setPrice(item.getPrice());
			orderItem.setDiscountedPrice(item.getDiscountedPrice());
			orderItem.setUserId(item.getUserId());

			OrderItem createdOrderItem = orderItemRepository.save(orderItem);
			orderItems.add(createdOrderItem);
		}

		Order createdOrder = new Order();
		createdOrder.setUser(user);
		createdOrder.setOrderItems(orderItems);
		createdOrder.setTotalPrice(cart.getTotalPrice());
		createdOrder.setTotalDiscountedPrice(cart.getTotalDiscountedPrice());
		createdOrder.setDiscount(cart.getDiscount());
		createdOrder.setTotalItem(cart.getTotalItem());

		createdOrder.setShippingAddress(address);
		createdOrder.setCreateAt(LocalDateTime.now());
		createdOrder.setOrderDate(LocalDateTime.now());
		createdOrder.setDeliveryDate(LocalDateTime.now().plusWeeks(1));
		createdOrder.setOrderStatus("PENDING");

		Order savedOrder = orderRepository.save(createdOrder);

		for (OrderItem item : orderItems) {
			item.setOrder(savedOrder);
			orderItemRepository.save(item);
		}

		return savedOrder;
	}
	
	private Order updateOrder(Order existingOrder, ShippingAddressRequest reqShippingAddress) {

		existingOrder.setShippingAddress(findExistingAddress(existingOrder.getUser(), reqShippingAddress));
		existingOrder.setOrderDate(LocalDateTime.now());
		existingOrder.setDeliveryDate(LocalDateTime.now().plusWeeks(1));

		return orderRepository.save(existingOrder);
	}

	private Address createNewAddress(User user, ShippingAddressRequest reqShippingAddress) {
		Address saveAddress = new Address();
		saveAddress.setStreetAddress(reqShippingAddress.getStreetAddress());
		saveAddress.setCity(reqShippingAddress.getCity());
		saveAddress.setState(reqShippingAddress.getState());
		saveAddress.setZipCode(reqShippingAddress.getZipCode());
		saveAddress.setUser(user);

		Address address = addressRepository.save(saveAddress);

		user.getAddresses().add(address);
		userRepository.save(user);

		return address;
	}

	private Address findExistingAddress(User user, ShippingAddressRequest reqShippingAddress) {
		return user.getAddresses().stream()
				.filter(address -> address.getStreetAddress().equals(reqShippingAddress.getStreetAddress())
						&& address.getCity().equals(reqShippingAddress.getCity())
						&& address.getState().equals(reqShippingAddress.getState())
						&& address.getZipCode().equals(reqShippingAddress.getZipCode()))
				.findFirst()
				.orElse(null);
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
	public Order placedOrder(Long orderId) throws OrderException {
		Order order = findOrderById(orderId);
		order.setOrderStatus("PLACED");
		// TODO
		// order.getPaymentDetails().setStatus("COMPLETED");

		return order;
	}

	@Override
	public Order confirmedOrder(Long orderId) throws OrderException {
	    // Lấy thông tin đơn đặt hàng từ cơ sở dữ liệu
	    Order order = findOrderById(orderId);

	    // Chuyển đơn hàng sang trạng thái "CONFIRMED"
	    order.setOrderStatus("CONFIRMED");

	    // Lưu thông tin đơn hàng sau khi đã xác nhận
	    Order confirmedOrder = orderRepository.save(order);

	    // Chuyển đơn hàng sang lịch sử
	    moveToHistory(confirmedOrder);

	    // Xóa giỏ hàng sau khi đã xác nhận
	    clearCart(confirmedOrder.getUser().getId());
	    
	    //Thay dổid số lượng khi đã xác nhận
	    
	    quantityOrder(confirmedOrder.getUser().getId());

	    return confirmedOrder;
	}
	@Override
	public void moveToHistory(Order order) {
	    // Tạo một đối tượng lịch sử đơn hàng
	    HistoryOrder historyOrder = new HistoryOrder();
	    historyOrder.setUser(order.getUser());
	    historyOrder.setOrderDate_his(order.getOrderDate());
	    // Các thông tin khác của lịch sử đơn hàng...

	    // Tạo danh sách mục lịch sử đơn hàng
	    List<HistoryOrderItem> historyOrderItems = new ArrayList<>();
	    for (OrderItem orderItem : order.getOrderItems()) {
	        HistoryOrderItem historyOrderItem = new HistoryOrderItem();
	        historyOrderItem.setHistoryOrder(historyOrder);
	        historyOrderItem.setProduct(orderItem.getProduct());
	        historyOrderItem.setSize(orderItem.getSize());
	        historyOrderItem.setQuantity(orderItem.getQuantity());
	        historyOrderItem.setPrice(orderItem.getPrice());
	        historyOrderItem.setDiscountedPrice(orderItem.getDiscountedPrice());
	        historyOrderItem.setUserId(orderItem.getUserId());
	        // Các thông tin khác của mục lịch sử đơn hàng...
	        historyOrderItems.add(historyOrderItem);
	    }

	    // Gán danh sách mục lịch sử đơn hàng cho lịch sử đơn hàng
	    historyOrder.setHistoryOrderItems(historyOrderItems);

	    // Lưu lịch sử đơn hàng vào cơ sở dữ liệu
	    historyOrderRepository.save(historyOrder);
	}

	// Phương thức xóa giỏ hàng
	private void clearCart(Long userId) {
	    Cart cart = cartService.findUserCart(userId);
	    cart.getCartItems().clear();
	    cartRepository.save(cart);
	}
	
		
	
	private void quantityOrder(Long orderId) throws OrderException{

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
				size.setQuantity(updatedQuantity);

				product.setQuantity(product.getQuantity() - quantity);

				productRepository.save(product);
			});
		}
		orderRepository.save(order);
	}


	@Override
	public Order shippedOrder(Long orderId) throws OrderException {
		Order order = findOrderById(orderId);
		order.setOrderStatus("SHIPPED");
		return orderRepository.save(order);
	}

	@Override
	public Order deliveredOrder(Long orderId) throws OrderException {
		Order order = findOrderById(orderId);
		order.setOrderStatus("DELIVERED");
		return orderRepository.save(order);
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
	@Override
	public Order OrderFindIdUser(Long userId) {
		return orderRepository.findByUserId(userId);
	}

}
