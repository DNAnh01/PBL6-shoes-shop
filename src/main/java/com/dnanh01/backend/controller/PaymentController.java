package com.dnanh01.backend.controller;

import jakarta.servlet.http.HttpServletRequest;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;

import javax.print.attribute.standard.JobOriginatingUserName;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.dnanh01.backend.exception.OrderException;
import com.dnanh01.backend.exception.UserException;
import com.dnanh01.backend.model.Cart;
import com.dnanh01.backend.model.Order;
import com.dnanh01.backend.model.User;
import com.dnanh01.backend.repository.OrderRepository;
import com.dnanh01.backend.service.CartServiceImplementation;
import com.dnanh01.backend.service.OrderService;
import com.dnanh01.backend.service.UserService;
import com.dnanh01.backend.service.VNPayService;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Autowired
    private VNPayService vnPayService;
    
    @Autowired
    private OrderService orderService;
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private CartServiceImplementation cartServiceImplementation;
    
    @Autowired
    private UserService userService;

    @PostMapping("/submitOrder")
    @ResponseBody
    public ResponseEntity<?> submitOrder(
            HttpServletRequest request,  
            @RequestHeader("Authorization") String jwt) 
            throws UserException {
    	
    	User user = userService.findUserProfileByJwt(jwt);
    	Order order = orderRepository.findByUserId(user.getId());
        Cart cart = cartServiceImplementation.findUserCart(user.getId());
        BigDecimal total = new BigDecimal(cart.getTotalDiscountedPrice());
        // trang frontend cấu hình
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        
        // Lưu giá trị jwt vào session hoặc có thể thêm vào các đối tượng khác cho việc sử dụng sau này
        request.getSession().setAttribute("jwt", jwt);
        
        String vnpayUrl = vnPayService.createOrder(total, order, baseUrl);
        return ResponseEntity.ok(vnpayUrl);
    } 
    
    @GetMapping("/vnpay-payment")
    @ResponseBody
    public ResponseEntity<?> vnpayPayment(
    		HttpServletRequest request) 
            throws UserException, OrderException{
        
        // Lấy giá trị jwt từ session hoặc các đối tượng khác đã lưu trước đó
        String jwt = (String) request.getSession().getAttribute("jwt");
        if (jwt == null) {
            // Xử lý trường hợp jwt không tồn tại
            return ResponseEntity.ok("false");
        }

        User user = userService.findUserProfileByJwt(jwt);
        Order order = orderRepository.findByUserId(user.getId());
        
        int paymentStatus = vnPayService.orderReturn(request);

        if (paymentStatus == 1) {
             orderService.confirmedOrder(order.getId());
             return ResponseEntity.ok("success");
        } else {
            // Payment failed, handle accordingly
            return ResponseEntity.ok("cancel");
        }
    }
}
