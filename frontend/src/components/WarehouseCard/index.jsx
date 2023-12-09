import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.scss";
import chroma from "chroma-js";

export default function WarehouseCard({
  product,
  onDelete,
  onUpdate,
  onSelectType,
}) {
  const hexColorCode = product?.color;
  const colorName = chroma(hexColorCode).name();
  const totalQuantity = product?.sizes.reduce(
    (total, size) => total + size.quantity,
    0
  );
  const handleDeleteClick = () => {
    // Gọi hàm xử lý xóa từ props
    onDelete();
  };

  const handleUpdateClick = () => {
    // Gọi hàm xử lý cập nhật từ props
    onUpdate();
  };
  console.log(product);
  return (
    <div className="warehouseList">
      <div className="warehouse-product">
        <div className="warehouse-detail">
          <Link
            to={`/product/${product?.id}`}
            className="link-warehouse-detail"
          >
            <img
              className="img-warehouse-detail"
              src={product?.imageUrl}
              alt=""
            ></img>
          </Link>
        </div>
        <div className="warehouse-content">
          <Link
            to={`/product/${product?.id}`}
            className="link-warehouse-content"
          >
            <span className="name-warehouse-content">{product?.title}</span>
          </Link>
          <Link
            to={`/product?brand=${product?.brand?.name}`}
            className="catogery-warehouse-content"
          >
            {product?.brand?.name}
          </Link>
          <div className="warehouse-content-size">
            {product?.sizes &&
              product?.sizes.map((size) => (
                <span key={size.name}>
                  {size.name}: {size.quantity}&nbsp;
                </span>
              ))}
          </div>
        </div>
      </div>
      <div className="warehouse-color">
        <span className="name-warehouse-color">{colorName}</span>
      </div>
      <div className="warehouse-price">
        <span className="name-warehouse-price">
          {product?.discountedPrice + " "}VND
        </span>
      </div>
      <div className="warehouse-price">
        <span className="name-warehouse-price">{product?.price + " "}VND</span>
      </div>
      <div className="warehouse-quantity">
        <span className="warehouse-quantity-span">{totalQuantity}</span>
      </div>
      <div className="warehouse-operation">
        <Button onClick={handleDeleteClick}>Delete</Button>
        <Button onClick={handleUpdateClick}>Update</Button>
      </div>
    </div>
  );
}
