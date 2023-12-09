import Footer from '../../components/Layout/Footer';
import Header from '../../components/Layout/Header';
import TrendingItem from '../../components/TrendingItem';
import './style.scss';
import ProductFeaturedCard from '../../components/ProductFeaturedCard';
import BrandList from '../../components/BrandList';
import ProductBoxList from '../../components/ProductBoxList';
import { ToastContainer } from 'react-toastify';
import { useCart } from '../../contexts/CartContext';
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
