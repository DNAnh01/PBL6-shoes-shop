package com.dnanh01.backend.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.dnanh01.backend.exception.CartItemException;
import com.dnanh01.backend.exception.ProductException;
import com.dnanh01.backend.exception.UserException;
import com.dnanh01.backend.model.Cart;
import com.dnanh01.backend.model.CartItem;
import com.dnanh01.backend.model.Product;
import com.dnanh01.backend.model.User;
import com.dnanh01.backend.repository.CartItemRepository;
import com.dnanh01.backend.repository.CartRepository;
import com.dnanh01.backend.request.AddItemRequest;

@Service
public class CartServiceImplementation implements CartService {

    private CartRepository cartRepository;
    private CartItemService cartItemService;
    private ProductService productService;

    public CartServiceImplementation(
            CartRepository cartRepository,
            CartItemService cartItemService,
            ProductService productService) {
        this.cartRepository = cartRepository;
        this.cartItemService = cartItemService;
        this.productService = productService;

    }

    @Override
    public Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    @Override
    public String addCartItem(Long userId, AddItemRequest req)
            throws ProductException, CartItemException, UserException {
        Cart cart = cartRepository.findByUserId(userId);
        Product product = productService.findProductById(req.getProductId());
        CartItem isPresent = cartItemService.isCartItemExist(cart, product, req.getSize(), userId);

        if (isPresent == null) {
            CartItem cartItem = new CartItem();

            int price = req.getQuantity() * product.getDiscountedPrice();
            cartItem.setPrice(price);
            cartItem.setQuantity(req.getQuantity());
            cartItem.setSize(req.getSize());
            cartItem.setUserId(userId);
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setCreateCartItem(LocalDateTime.now());
            CartItem createdCartItem = cartItemService.createCartItem(cartItem);

            cart.getCartItems().add(createdCartItem);

            cartRepository.save(cart);
        } else {
            CartItem cartItem = new CartItem();
            int price = req.getQuantity() * product.getDiscountedPrice();
            cartItem.setPrice(price);
            cartItem.setQuantity(req.getQuantity());
            cartItem.setSize(req.getSize());
            cartItem.setUserId(userId);
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setCreateCartItem(LocalDateTime.now());
            cartItemService.updateCartItem(userId, isPresent.getId(), cartItem);

        }

        return "Item add to cart";
    }

    @Override
    public Cart findUserCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId);

        int totalPrice = 0;
        int totalDiscountedPrice = 0;
        int totalItem = 0;

        for (CartItem cartItem : cart.getCartItems()) {
            totalPrice = totalPrice + cartItem.getPrice();
            totalDiscountedPrice = totalDiscountedPrice + cartItem.getDiscountedPrice();
            totalItem = totalItem + cartItem.getQuantity();
        }

        cart.setTotalPrice(totalPrice);
        cart.setTotalDiscountedPrice(totalDiscountedPrice);
        cart.setTotalItem(totalItem);
        cart.setDiscount(totalPrice - totalDiscountedPrice);
        return cartRepository.save(cart);
    }

    
	@Override
	public void saveOrUpdateCart(Cart cart) {
	        cartRepository.save(cart);
	 }
}
