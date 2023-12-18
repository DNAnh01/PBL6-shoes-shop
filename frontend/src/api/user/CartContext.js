// CartContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import apiCart from '~/api/user/apiCart';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const fetchCartProducts = async () => {
        try {
            const response = await apiCart.getAllCart();
            setCartItems(response.data.cartItems);
        } catch (error) {
            // console.error('Error fetching cart products:', error);
        }
    };

    const updateCartItems = async () => {
        try {
            const response = await apiCart.getAllCart();
            setCartItems(response.data.cartItems);
        } catch (error) {
            // console.error("Error fetching cart products:", error);
        }
    };

    useEffect(() => {
        fetchCartProducts();
    }, []);

    useEffect(() => {
        updateCartItems();
    }, []);
    return <CartContext.Provider value={{ cartItems, setCartItems, updateCartItems }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    return useContext(CartContext);
};
