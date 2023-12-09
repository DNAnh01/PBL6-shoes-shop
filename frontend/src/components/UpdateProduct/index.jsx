import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiProductDetail from '~/states/API/apiProductDetail';
import apiUpdateProduct from '~/states/API/apiUpdateProduct';
const UpdateProduct = ({ onClose, product }) => {
    console.log(product);

    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDiscountedPrice, setProductDiscountedPrice] = useState('');
    const [productDiscountPercent, setProductDiscountPersent] = useState('');
    const [brand, setBrand] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const [selectedSizes, setSelectedSizes] = useState([]);
    // Assuming arrSize is defined somewhere in your code
    const [arrSize, setArrSize] = useState([
        { name: 'M', quantity: null },
        { name: 'L', quantity: null },
        { name: 'S', quantity: null },
    ]);

    const handleQuantityChange = (event, sizeName) => {
        const value = event.target.value;
        console.log(value);
        setArrSize((prevArrSize) =>
            prevArrSize.map((item) =>
                item.name === sizeName ? { ...item, quantity: value === '' ? null : parseInt(value, 10) } : item,
            ),
        );
    };
    // Thay đổi hàm xử lý sự kiện khi chọn size
    const handleSizeChange = (event, sizeName, quantitySize) => {
        if (event.target.checked) {
            setArrSize((prevArrSize) =>
                prevArrSize.map((item) => (item.name === sizeName ? { ...item, quantity: quantitySize } : item)),
            );
        } else {
            setArrSize((prevArrSize) =>
                prevArrSize.map((item) => (item.name === sizeName ? { ...item, quantity: null } : item)),
            );
        }

        setSelectedSizes((prevSelectedSizes) =>
            event.target.checked
                ? [...prevSelectedSizes, { name: sizeName, quantity: quantitySize }]
                : prevSelectedSizes.filter((size) => size.name !== sizeName),
        );
    };

    const handleSubmit = async () => {
        const formData = {
            title: productName,
            description: productDescription,
            price: productPrice,
            discountedPrice: productDiscountedPrice,
            discountPersent: productDiscountPercent,
            // Add other fields if needed
        };
        try {
            const response = await apiUpdateProduct.putUpdateProduct(product?.id, formData);
            // Handle the success response, you might want to show a success message
            console.log('Product updated successfully:', response.data);
            toast.success('Product updated successfully');
            onClose(); // Close the modal or navigate away
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
        onClose();
        window.location.reload();
    };
    useEffect(() => {
        console.log('UpdateProduct is mounted');
        // Truyền thông tin sản phẩm được chọn vào các trạng thái khi component được mount
        if (product) {
            setProductName(product.title);
            setProductDescription(product.description);
            setProductPrice(product.price);
            setProductDiscountedPrice(product.discountedPrice);
            setProductDiscountPersent(product.discountPersent);
        }
        return () => {
            console.log('UpdateProduct is unmounted'); // Được gọi khi component bị unmount
        };
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
                    <div className="add-price">
                        <label className="add-label">Price:</label>
                        <input
                            type="number"
                            className="add-price-input"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                        />
                    </div>
                    <div className="add-discountedPrice">
                        <label className="add-label">Discounted Price:</label>
                        <input
                            type="number"
                            className="add-discountedPrice-input"
                            value={productDiscountedPrice}
                            onChange={(e) => setProductDiscountedPrice(e.target.value)}
                        />
                    </div>
                    <div className="add-discountPersent">
                        <label className="add-label">Discount Percent:</label>
                        <input
                            type="number"
                            className="add-discountPersent-input"
                            value={productDiscountPercent}
                            onChange={(e) => setProductDiscountPersent(e.target.value)}
                        />
                    </div>
                    <div className="add-type">
                        <div className="add-brand" style={{ display: 'flex', alignItems: 'center' }}>
                            <label className="add-label">Brand:</label>
                            <span style={{ fontSize: '20px' }}>{product?.brand?.name}</span>
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
