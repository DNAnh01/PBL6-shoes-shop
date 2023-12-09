import Header from "../../components/Layout/Header";
import ProductBoxList from "../../components/ProductBoxList";
import ProductFeaturedCard from "../../components/ProductFeaturedCard";
import { useCart } from "../../contexts/CartContext";

export default function HomePage() {
  const { cartItems } = useCart();
  return (
    <>
      <Header cartItems={cartItems} />
      <ProductFeaturedCard />
      <ProductBoxList />
    </>
  );
}
