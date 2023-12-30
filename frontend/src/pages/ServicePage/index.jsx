import Header from '../../layouts/UserDefaultLayout/Header';
import ServiceCard from '../../components/ServiceCard';
import { useCart } from '~/api/user/CartContext';
import Footer from '~/layouts/UserDefaultLayout/Footer';
export default function ServicePage() {
    const { cartItems } = useCart();
    return (
        <>
            <Header cartItems={cartItems} />
            <ServiceCard />
            <Footer />
        </>
    );
}
