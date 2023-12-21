import React, { useState } from 'react';

import Icon from '../Icons/Icon';
import ProductsTable from '../ProductsTable';
import UpdateProduct from '../UpdateProduct';

const AdminProducts = () => {
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null); // State để lưu trữ sản phẩm được chọn
    const [showProductsTable, setShowProductsTable] = useState(true);

    const handleProductsButtonClick = () => {
        setShowProductsTable(true);
        setShowUpdateForm(false);
    };
    // Hiển thị form update khi người dùng click nút update
    const handleProductUpdate = (product) => {
        setSelectedProduct(product);
        setShowUpdateForm(true);
        setShowProductsTable(false);
    };

    // Hiển thị form product table khi người dùng click nút cancel hoặc sau khi cập nhật thành công
    const handleFormClose = () => {
        setShowUpdateForm(false);
        setSelectedProduct(null);
        setShowProductsTable(true);
    };
    return (
        <div>
            <header className={`align-items-center d-flex p-2`}>
                <Icon icon="products" classes={`ml-2`} />
                <h5 className={`mb-0 ml-4`}>
                    {showUpdateForm ? (
                        <button
                            onClick={handleProductsButtonClick}
                            style={{ fontSize: '16px' }}
                            className="btn btn-link text-danger"
                        >
                            Products Table
                        </button>
                    ) : (
                        'Admin Products'
                    )}
                </h5>
                <h5 className={`mb-0 ml-4`}>/ Update Products</h5>
            </header>
            {/* Sử dụng điều kiện để hiển thị hoặc ẩn ProductsTable và UpdateProduct */}
            {showProductsTable && <ProductsTable handleProductUpdate={handleProductUpdate} />}
            {showUpdateForm && <UpdateProduct onClose={handleFormClose} product={selectedProduct} />}
        </div>
    );
};

export default AdminProducts;
