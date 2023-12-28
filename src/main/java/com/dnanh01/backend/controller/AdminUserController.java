
package com.dnanh01.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dnanh01.backend.exception.OrderException;
import com.dnanh01.backend.exception.UserException;
import com.dnanh01.backend.model.Order;
import com.dnanh01.backend.model.User;
import com.dnanh01.backend.service.OrderService;
import com.dnanh01.backend.service.UserService;

@RestController
@RequestMapping("/api/admin/user")
public class AdminUserController {
    @Autowired
    private UserService userService;
    @Autowired
    private OrderService orderService;

    @GetMapping("/all")
    public ResponseEntity<List<User>> findAllUser(
            @RequestHeader("Authorization") String jwt) throws UserException {
        List<User> user = userService.getAllUser();
        return new ResponseEntity<>(user, HttpStatus.ACCEPTED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<List<Order>> findOrderByUser(
    		@PathVariable("id") Long userId,
            @RequestHeader("Authorization") String jwt) throws OrderException {
        List<Order> orders = orderService.usersOrderHistory(userId);
        return new ResponseEntity<>(orders, HttpStatus.ACCEPTED);
    }
    
}
