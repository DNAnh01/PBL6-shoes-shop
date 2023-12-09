import Button from "../../components/Button";
import Header from "../../components/Layout/Header";
import WarehouseList from "../../components/WarehouseList";
import { useCart } from "../../contexts/CartContext";
import "./style.scss";
export default function WarehousePage() {
  const { cartItems } = useCart();
  return (
    <>
      <Header cartItems={cartItems} />
      <div className="warehouse-addProduct container-layout">
        <Button text="Add new products" to="/addProduct"></Button>
      </div>
      <div className="Warehouse container-layout">
        <WarehouseList />
      </div>
    </>
  );
}
