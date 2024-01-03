import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import apiUpdateProduct from '~/api/admin/apiUpdateProduct';
const UpdateProduct = ({ onClose, product }) => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDiscountPercent, setProductDiscountPercent] = useState('');
    const productDiscountedPrice = productPrice - (productDiscountPercent / 100) * productPrice;
    const [warehousePriceProduct, setWarehousePriceProduct] = useState('');
    const [arrSize, setArrSize] = useState([
        { name: 'M', quantity: null },
        { name: 'L', quantity: null },
        { name: 'S', quantity: null },
    ]);

    const calculateTotalQuantity = () => {
        return arrSize.reduce((total, size) => total + (size.quantity || 0), 0);
    };
    const handleSubmit = async () => {
        const totalQuantity = calculateTotalQuantity();
        if (!productDescription || !productPrice || !productDiscountPercent || !warehousePriceProduct) {
            toast.warning('Please fill in all information');
            return;
        }
        if (totalQuantity <= 0) {
            toast.warning('Please enter the quantity you want to update');
        }
        if (0 < warehousePriceProduct && warehousePriceProduct < productDiscountedPrice) {
            const formData = {
                title: productName,
                description: productDescription,
                price: productPrice,
                quantity: totalQuantity,
                sizes: arrSize,
                discountedPrice: productDiscountedPrice,
                discountPersent: productDiscountPercent,
                warehousePrice: warehousePriceProduct,
            };
            console.log(formData);
            try {
                const response = await apiUpdateProduct.putUpdateProduct(product?.id, formData);
                console.log('Product updated successfully:', response.data);
                toast.success('Product updated successfully');
            } catch (error) {
                console.log(error);
            }
        } else {
            toast.warning('Warehouse prices are higher than selling prices. Are you sure?');
        }
    };

    const handleCancel = () => {
        onClose();
    };
    const handleQuantityChange = (event, sizeName) => {
        const value = event.target.value;
        if (!/^\d+$/.test(value) || parseInt(value, 10) < 0) {
            toast.warning('Please re-enter the quantity value of the size');
            return;
        }
        setArrSize((prevArrSize) =>
            prevArrSize.map((item) =>
                item.name === sizeName ? { ...item, quantity: value === '' ? null : parseInt(value, 10) } : item,
            ),
        );
    };

    useEffect(() => {
        if (product) {
            setProductName(product.title);
            setProductDescription(product.description);
            setProductPrice(product.price);
            setProductDiscountPercent(product.discountPersent);
            setWarehousePriceProduct(product.warehousePrice);
        }
        return () => {};
    }, [product]);
    return (
        <>
            <section>
                <div className="add-product">
                    <div className="add-content">
                        <h1 className="add-title">Product Updates</h1>
                    </div>
                    <div className="add-name">
                        <label className="add-label">Product's name :</label>
                        <input
                            type="text"
                            className="add-name-input"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            readOnly
                            style={{ background: '#d2d2d2' }}
                        />
                    </div>
                    <div className="add-description">
                        <label className="add-label">Description:</label>
                        <textarea
                            className="add-description-text"
                            rows="4"
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="add-warehousePrice">
                        <label className="add-label">Warehouse Price:</label>
                        <input
                            type="number"
                            className="add-warehousePrice-input"
                            value={warehousePriceProduct}
                            onChange={(event) => setWarehousePriceProduct(event.target.value)}
                        />
                    </div>
                    <div className="add-price">
                        <label className="add-label">Price:</label>
                        <input
                            type="number"
                            className="add-price-input"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                        />
                    </div>

                    <div className="add-discountPersent">
                        <label className="add-label">Discount Percent:</label>
                        <input
                            type="number"
                            className="add-discountPersent-input"
                            value={productDiscountPercent}
                            onChange={(e) => setProductDiscountPercent(e.target.value)}
                        />
                    </div>
                    <div className="set-option">
                        <div>
                            <div className="add-brand" style={{ display: 'flex', alignItems: 'center' }}>
                                <label className="add-label">Brand:</label>
                                <span style={{ fontSize: '20px' }}>{product?.brand?.name}</span>
                            </div>
                        </div>
                        <div className="add-size">
                            <label className="add-label">Choose Size and Quantity:</label>
                            {arrSize.map((size) => (
                                <div key={size.name} className="add-size-checkbox">
                                    <div className="add-size-name">
                                        <label
                                            style={{ fontSize: '20px', cursor: 'pointer' }}
                                            htmlFor={`checkbox-${size.name}`}
                                        >
                                            {size.name}
                                        </label>
                                    </div>
                                    <input
                                        type="number"
                                        className="add-size-input"
                                        id={`size-${size.name}`}
                                        value={size.quantity || ''}
                                        onChange={(event) => handleQuantityChange(event, size.name)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="add-product-btn">
                        <button onClick={handleSubmit} className="add-product-btn-submit">
                            SUBMIT
                        </button>
                        <button onClick={handleCancel} className="add-product-btn-cancel">
                            CANCEL
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};
export default UpdateProduct;
