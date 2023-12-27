package com.dnanh01.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dnanh01.backend.model.Cart;
import com.dnanh01.backend.model.CartItem;
import com.dnanh01.backend.model.Product;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
        @Query("SELECT ci FROM CartItem ci " +
                        "WHERE ci.cart = :cart " +
                        "AND ci.product = :product " +
                        "AND ci.size = :size " +
                        "AND ci.userId = :userId")
        public CartItem isCartItemExist(
                        @Param("cart") Cart cart,
                        @Param("product") Product product,
                        @Param("size") String size,
                        @Param("userId") Long userId);
        
        
        @Query("SELECT c FROM Cart c " +
                "WHERE c.user.id = :userId")
        public Cart findByUserId(@Param("userId") Long userId);
}
