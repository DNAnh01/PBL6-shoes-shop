import Footer from '../../layouts/UserDefaultLayout/Footer';
import Header from '../../layouts/UserDefaultLayout/Header';
import './style.scss';
import ProductFeaturedCard from '../../components/ProductFeaturedCard';
import BrandList from '../../components/BrandList';
import ProductBoxList from '../../components/ProductBoxList';
import { ToastContainer } from 'react-toastify';
import { useCart } from '~/api/user/CartContext';
import ProductGridList from '~/components/ProductGridList';

export default function HomePage() {
    const { cartItems } = useCart();
    return (
        <>
            <Header cartItems={cartItems} />
            <ProductFeaturedCard />
            <BrandList />
            <ProductBoxList />
            <ToastContainer />
            <ProductGridList />
            <Footer />
        </>
    );
}
