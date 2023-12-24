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
    public ResponseEntity<?> submidOrder(
            HttpServletRequest request,  
            @RequestHeader("Authorization") String jwt) 
            throws UserException {
    	
    	User user = userService.findUserProfileByJwt(jwt);
    	Order order = orderRepository.findByUserId(user.getId());
        Cart cart = cartServiceImplementation.findUserCart(user.getId());
        BigDecimal total = new BigDecimal(cart.getTotalDiscountedPrice());
        // trang frontend cấu hình
        String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
        String vnpayUrl = vnPayService.createOrder(total, order, baseUrl);
        return ResponseEntity.ok(vnpayUrl);
    } 
    @GetMapping("/vnpay-payment")
    public String vnpayPayment(HttpServletRequest request, Model model){
    	//User user = userService.findUserProfileByJwt(jwt);
    	
    	//Order order = orderRepository.findByUserId(user.getId());
    	
    	
        int paymentStatus = vnPayService.orderReturn(request);

        String orderInfo = request.getParameter("vnp_OrderInfo");
        String paymentTime = request.getParameter("vnp_PayDate");
        String transactionId = request.getParameter("vnp_TransactionNo");
        String totalPrice = request.getParameter("vnp_Amount");

        model.addAttribute("orderId", orderInfo);
        model.addAttribute("totalPrice", totalPrice);
        model.addAttribute("paymentTime", paymentTime);
        model.addAttribute("transactionId", transactionId);

        // Check payment status
       if (paymentStatus == 1) {
            // Payment successful, confirm the order
            /*try {
                orderService.confirmedOrder(order.getId());
                return "redirect:/ordersuccess";
            } catch (OrderException e) {
                // Handle exception, e.g., log it or show an error message
                return "redirect:/ordersai";
            }*/
            return "redirect:https://shoes-shop-mvaa.vercel.app/pay?step=3&result=success";
        } else {
            // Payment failed, handle accordingly
            return "redirect:https://shoes-shop-mvaa.vercel.app/pay?step=3&result=failure";
        }
    }
}
