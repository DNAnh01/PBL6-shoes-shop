import Header from '../../layouts/UserDefaultLayout/Header';
import ProductBoxList from '../../components/ProductBoxList';
import ProductFeaturedCard from '../../components/ProductFeaturedCard';
import { useCart } from '~/api/user/CartContext';

export default function HotTrendPage() {
    const { cartItems } = useCart();
    return (
        <>
            <Header cartItems={cartItems} />
            <ProductFeaturedCard />
            <ProductBoxList />
        </>
    );
}
