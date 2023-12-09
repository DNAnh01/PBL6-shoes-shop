import Header from "../../components/Layout/Header";
import ServiceCard from "../../components/ServiceCard";
import { useCart } from "../../contexts/CartContext";
export default function ServicePage() {
  const { cartItems } = useCart();
  return (
    <>
      <Header cartItems={cartItems} />
      <ServiceCard />
    </>
  );
}
