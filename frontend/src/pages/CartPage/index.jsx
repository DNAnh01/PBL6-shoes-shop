import Header from '../../components/Layout/Header';
import CartList from '../../components/CartList';
import { useCart } from '../../contexts/CartContext';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function CartPage() {
    const { cartItems } = useCart();

    useEffect(() => {
        const checkAuthentication = () => {
            // Kiểm tra nếu có token, user, jwt
            const token = localStorage.getItem('jwt');
            const user = localStorage.getItem('user');
            const jwt = localStorage.getItem('jwt');

            if (!token || !user || !jwt) {
                // Hiển thị toast.error và chuyển hướng đến trang đăng nhập
                toast.error('Bạn cần đăng nhập để xem giỏ hàng');
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
