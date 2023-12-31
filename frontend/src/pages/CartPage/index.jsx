import Header from '../../layouts/UserDefaultLayout/Header';
import CartList from '../../components/CartList';
import { useCart } from '~/api/user/CartContext';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function CartPage() {
    const { cartItems } = useCart();

    useEffect(() => {
        const checkAuthentication = () => {
            // Kiểm tra nếu có token, user, jwt
            const jwt = sessionStorage.getItem('jwt');

            if (!jwt) {
                toast.error('You need to log in to view your shopping cart');
            }
        };

        checkAuthentication();
    }, []);

    return (
        <>
            <Header cartItems={cartItems} />
            <CartList />
        </>
    );
}
