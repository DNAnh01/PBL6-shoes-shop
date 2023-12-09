import React, { useEffect, useState } from 'react';
import WarehouseCard from '../WarehouseCard';
import './style.scss';
import { toast } from 'react-toastify';
import apiProductGrid from '../API/apiProductGrid';
import apiDelproduct from '../API/apiDeleleProduct';

export default function WarehouseList() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProductGrid = async () => {
            try {
                const response = await apiProductGrid.getAllProduct();
                setProducts(response.data.content);
            } catch (error) {
                // toast.error(error?.message);
            }
        }; // Gọi hàm fetchProductGrid
        fetchProductGrid();
    }, []);

    const handleSelectType = (productId, newType) => {
        // Xử lý logic cập nhật giá trị type cho sản phẩm
        const updatedProducts = products.map((product) =>
            product.id === productId ? { ...product, type: newType } : product,
        );

        // Cập nhật danh sách sản phẩm
        setProducts(updatedProducts);
    };

    const handleDeleteProduct = async (productId) => {
        // console.log(productId);
        try {
            const response = await apiDelproduct.delProduct(productId);
            console.log(response);
            const data = await response.json();
            // console.log(data);
            if (data.success) {
                setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
                toast.success('Product deleted successfully');
            } else {
                console.error('Xóa sản phẩm thất bại');
            }
        } catch (error) {
            // toast.error(error?.message);
        }
        window.location.reload();
    };

    const handleUpdateProduct = (productId, updatedProductInfo) => {
        // Xử lý logic cập nhật sản phẩm
        const updatedProducts = products.map((product) =>
            product.id === productId ? { ...product, ...updatedProductInfo } : product,
        );
        // Cập nhật danh sách sản phẩm
        setProducts(updatedProducts);
    };
    return (
        <div>
            <div className="warehouse">
                <div className="warehouseGrid">
                    <div className="warehouseRow">
                        <div className="warehouseRow-product">Product</div>
                        <div className="warehouseRow-type">Color</div>
                        <div className="warehouseRow-price">Discounted Price</div>
                        <div className="warehouseRow-price">Price </div>
                        <div className="warehouseRow-quantity">The remaining amount</div>
                        <div className="warehouseRow-operation">Operation</div>
                    </div>
                    {/* Danh sách sản phẩm */}
                    {products.length > 0 &&
                        products.map((product) => {
                            return (
                                <WarehouseCard
                                    key={product.id}
                                    product={product}
                                    onDelete={() => handleDeleteProduct(product.id)}
                                    onUpdate={(updatedProductInfo) =>
                                        handleUpdateProduct(product.id, updatedProductInfo)
                                    }
                                    onSelectType={(newType) => handleSelectType(product.id, newType)}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
