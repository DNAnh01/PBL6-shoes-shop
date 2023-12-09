// CartContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import apiCart from '../components/API/apiCart';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                const response = await apiCart.getAllCart();
                setCartItems(response.data.cartItems);
            } catch (error) {
                // console.error('Error fetching cart products:', error);
            }
        };

        fetchCartProducts();
    }, []);

    const updateCartItems = async () => {
        try {
            const response = await apiCart.getAllCart();
            setCartItems(response.data.cartItems);
        } catch (error) {
            // console.error("Error fetching cart products:", error);
        }
    };

    return <CartContext.Provider value={{ cartItems, setCartItems, updateCartItems }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    return useContext(CartContext);
};
