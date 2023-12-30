package com.dnanh01.backend.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.dnanh01.backend.exception.CartItemException;
import com.dnanh01.backend.exception.UserException;
import com.dnanh01.backend.model.Cart;
import com.dnanh01.backend.model.CartItem;
import com.dnanh01.backend.model.Product;
import com.dnanh01.backend.model.User;
import com.dnanh01.backend.repository.CartItemRepository;
import com.dnanh01.backend.repository.CartRepository;

@Service
public class CartItemServiceImplementation implements CartItemService {

    private CartItemRepository cartItemRepository;
    private UserService userService;
    private CartRepository cartRepository;

    public CartItemServiceImplementation(
            CartItemRepository cartItemRepository,
            UserService userService,
            CartRepository cartRepository) {
        this.cartItemRepository = cartItemRepository;
        this.userService = userService;
        this.cartRepository = cartRepository;
    }

    @Override
    public CartItem createCartItem(CartItem cartItem) {

        CartItem saveCartItem = new CartItem();
        saveCartItem.setDiscountedPrice(cartItem.getProduct().getDiscountedPrice() * cartItem.getQuantity());
        saveCartItem.setPrice(cartItem.getProduct().getPrice() * cartItem.getQuantity());

        saveCartItem.setQuantity(cartItem.getQuantity());
        saveCartItem.setSize(cartItem.getSize());
        saveCartItem.setUserId(cartItem.getUserId());
        saveCartItem.setCart(cartItem.getCart());
        saveCartItem.setProduct(cartItem.getProduct());
        // cartItem.setQuantity(1);

        // cartItem.setPrice(cartItem.getProduct().getPrice() * cartItem.getQuantity());

        // cartItem.setDiscountedPrice(cartItem.getProduct().getDiscountedPrice() *
        // cartItem.getQuantity());

        CartItem createCartItem = cartItemRepository.save(saveCartItem);
        return createCartItem;
    }

    @Override
    public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException {
        CartItem item = findCartItemById(id);
        User user = userService.findUserById(item.getUserId());

        if (user.getId().equals(userId)) {
            item.setQuantity(cartItem.getQuantity());
            item.setSize(cartItem.getSize());
            item.setPrice(item.getQuantity() * item.getProduct().getPrice());
            item.setDiscountedPrice(item.getProduct().getDiscountedPrice() * item.getQuantity());
        }

        return cartItemRepository.save(item);
    }

    @Override
    public CartItem isCartItemExist(Cart cart, Product product, String size, Long userId) {
        CartItem cartItem = cartItemRepository.isCartItemExist(cart, product, size, userId);
        return cartItem;
    }

    @Override
    public void removeCartItem(Long userId, Long cartItemId) throws CartItemException, UserException {
        CartItem cartItem = findCartItemById(cartItemId);
        User user = userService.findUserById(cartItem.getUserId());
        User reqUser = userService.findUserById(userId);

        if (user.getId().equals(reqUser.getId())) {
            cartItemRepository.deleteById(cartItemId);
        } else {
            throw new UserException("You can't remove another users item.");
        }
    }

    @Override
    public CartItem findCartItemById(Long cartItemId) throws CartItemException {
        Optional<CartItem> opt = cartItemRepository.findById(cartItemId);
        if (opt.isPresent()) {
            return opt.get();
        } else {
            throw new CartItemException("Cart item not found with id - " + cartItemId);
        }
    }

}
