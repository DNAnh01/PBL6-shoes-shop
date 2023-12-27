package com.dnanh01.backend.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.List;

import javax.print.attribute.standard.JobOriginatingUserName;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
import com.dnanh01.backend.response.PaymentSubmitResponse;
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
    public ResponseEntity<PaymentSubmitResponse> submitOrder(
            HttpServletRequest request, 
            @RequestHeader("Authorization") String jwt) 
            throws UserException {
    	User user = userService.findUserProfileByJwt(jwt);
        Cart cart = cartServiceImplementation.findUserCart(user.getId());
        BigDecimal total = new BigDecimal(cart.getTotalDiscountedPrice());
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        String vnpayUrl = vnPayService.createOrder(total, baseUrl);
        PaymentSubmitResponse paymentSubmitResponse = new PaymentSubmitResponse(vnpayUrl, jwt, 1L);
        return new ResponseEntity<>(paymentSubmitResponse, HttpStatus.OK);
    }
    
    @GetMapping("/vnpay-payment")
    @ResponseBody
    public ResponseEntity<?> vnpayPayment(
    		HttpServletRequest request,
    		@RequestParam("orderId") Long orderId) throws OrderException {
       
        int paymentStatus = vnPayService.orderReturn(request);

        if (paymentStatus == 1) {
        	orderService.confirmedOrder(orderId);
            return ResponseEntity.ok("success");
        } else {
            return ResponseEntity.ok("cancel");
        }
    }
}
