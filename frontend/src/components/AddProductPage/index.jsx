import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import apiAddProduct from '~/api/admin/apiAddProduct';
import { toast, ToastContainer } from 'react-toastify';

export default function AddProductPage() {
    const [nameProduct, setNameProduct] = useState('GIÀY THỂ THAO REEBOK RIDER V');
    const [descriptionProduct, setDescriptionProduct] = useState(
        'ĐÔI GIÀY LẤY CẢM HỨNG TỪ GIÀY CHẠY BỘ CỔ ĐIỂN VỚI PHONG CÁCH HIỆN ĐẠI Vẻ ngoài của bạn sẽ luôn trong khỏe khoắn năng động suốt ngày dài khi diện đôi Giày Reebok Rider V này',
    );
    const [priceProduct, setPriceProduct] = useState('200000');
    const [warehousePriceProduct, setWarehousePriceProduct] = useState('200000');

    const [discountedPriceProduct, setDiscountedPriceProduct] = useState('180000');
    const [discountPersentProduct, setDiscountPersentProduct] = useState('10');
    const [imageProduct, setImageProduct] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('Nike');
    const brandDefaultImages = {
        Nike: 'https://www.dl.dropboxusercontent.com/scl/fi/spftkm2g20w80w34yusw5/logoNike.png?rlkey=0u494s5a2j3ihrgsn92v9ped3&dl=0',
        Adidas: 'https://www.dl.dropboxusercontent.com/scl/fi/i167u9rl57xiy12y6cu4p/logoAdidas.png?rlkey=zobrrhbvk95aitt3lqko9hhow&dl=0',
        Converse:
            'https://www.dl.dropboxusercontent.com/scl/fi/6hc2nrgrat3e2wnbe13td/logoConverse.png?rlkey=2jpecnzdwmgkr3kxobvgzizgr&dl=0',
        Puma: 'https://www.dl.dropboxusercontent.com/scl/fi/7h7zl5cmpimaq9x8buodr/logoPuma.jpg?rlkey=oalnmzal0xcqloch993in6db3&dl=0',
        'Alexander Mqueen':
            'https://www.dl.dropboxusercontent.com/scl/fi/vr7j7r7cjvcapjnz76bmd/logoAlex.png?rlkey=otc1j3ese5j07842hgv9l6o2x&dl=0',
        'New Balence':
            'https://www.dl.dropboxusercontent.com/scl/fi/fmnm2cuh27j0q1fg22197/logoNewBalance.png?rlkey=snx5ofx6l8zpxkrybve0g4hu4&dl=0',
        Reebok: 'url_for_reebok_default_image',
    };
    const [arrSize, setArrSize] = useState([
        { name: 'M', quantity: null },
        { name: 'L', quantity: null },
        { name: 'S', quantity: null },
    ]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedColor, setSelectedColor] = useState('#FF0000');
    const navigate = useNavigate();

    const handleQuantityChange = (event, sizeName) => {
        const value = event.target.value;
        if (!/^\d+$/.test(value) || parseInt(value, 10) < 0) {
            // Display a warning or handle the invalid input case
            toast.warning('Please re-enter the quantity value of the size');
            return;
        }
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
    const calculateTotalQuantity = () => {
        return arrSize.reduce((total, size) => total + (size.quantity || 0), 0);
    };
    const handleSubmit = async () => {
        if (
            nameProduct.trim() === '' ||
            descriptionProduct.trim() === '' ||
            priceProduct.trim() === '' ||
            warehousePriceProduct.trim() === '' ||
            discountedPriceProduct.trim() === '' ||
            discountPersentProduct.trim() === '' ||
            imageProduct.trim() === ''
        ) {
            toast.warning('Please enter complete information');
            return;
        }

        const totalQuantity = calculateTotalQuantity();

        // Check if totalQuantity is greater than 0 before submitting
        if (totalQuantity > 0) {
            if (parseInt(priceProduct) > parseInt(discountedPriceProduct) > 0) {
                const formData = {
                    title: nameProduct,
                    description: descriptionProduct,
                    price: parseInt(priceProduct),
                    warehousePrice: parseInt(warehousePriceProduct),
                    discountedPrice: parseInt(discountedPriceProduct),
                    discountPersent: parseInt(discountPersentProduct),
                    quantity: totalQuantity,
                    imageUrl: imageProduct,
                    brand: {
                        name: selectedBrand,
                        imageUrl: brandDefaultImages[selectedBrand],
                    },
                    size: arrSize,
                    color: selectedColor,
                };
                try {
                    const response = await apiAddProduct.postAddProduct(formData);
                    console.log('response:', response);
                    if (response) {
                        toast.success('Added new products successfully');
                        setTimeout(() => {
                            navigate('/admin/products');
                        }, 500);
                    } else {
                        toast.error('There was an error adding a product');
                    }
                } catch (error) {}
            } else {
                toast.error('The price of the product you entered is incorrect');
            }
        } else {
            // Display a message or handle the case where totalQuantity is not greater than 0
            toast.error('Product quantity needs to be greater than 0 to add to inventory');
        }
    };

    return (
        <>
            <section>
                <ToastContainer />
                <div className="add-product container-layout">
                    <div className="add-content">
                        <h1 className="add-title">Posting Products for Sale</h1>
                        <p className="add-title-clone">Post information about the products you need to sell</p>
                    </div>
                    <div className="add-name">
                        <label className="add-label">Product's name:</label>
                        <input
                            type="text"
                            className="add-name-input"
                            value={nameProduct}
                            onChange={(event) => setNameProduct(event.target.value)}
                        />
                    </div>
                    <div className="add-description">
                        <label className="add-label">Product Description:</label>
                        <textarea
                            className="add-description-text"
                            rows="4"
                            value={descriptionProduct}
                            onChange={(event) => setDescriptionProduct(event.target.value)}
                        ></textarea>
                    </div>
                    <div className="add-price">
                        <label className="add-label">Price:</label>
                        <input
                            type="number"
                            className="add-price-input"
                            value={priceProduct}
                            onChange={(event) => setPriceProduct(event.target.value)}
                        />
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
                    <div className="add-discountedPrice">
                        <label className="add-label">Discounted Price:</label>
                        <input
                            type="number"
                            className="add-discountedPrice-input"
                            value={discountedPriceProduct}
                            onChange={(event) => setDiscountedPriceProduct(event.target.value)}
                        />
                    </div>

                    <div className="add-type">
                        <div className="add-brand">
                            <label className="add-label">Choose brand:</label>
                            <select
                                id="add-brand-check"
                                className="add-select"
                                value={selectedBrand}
                                onChange={(event) => setSelectedBrand(event.target.value)}
                            >
                                <option value="Nike">Nike</option>
                                <option value="Adidas">Adidas</option>
                                <option value="Converse">Converse</option>
                                <option value="Puma">Puma</option>
                                <option value="Alexander Mqueen">Alexander Mqueen</option>
                                <option value="New Balence">New Balence</option>
                                <option value="Reebok">Reebok</option>
                            </select>
                        </div>
                        <div className="add-size">
                            <label className="add-label">Choose Size and Quantity:</label>
                            {arrSize.map((size) => (
                                <div key={size.name} className="add-size-checkbox">
                                    <div className="add-size-name">
                                        <input
                                            type="checkbox"
                                            id={`checkbox-${size.name}`}
                                            checked={selectedSizes.some(
                                                (selectedSize) => selectedSize.name === size.name,
                                            )}
                                            onChange={(event) => handleSizeChange(event, size.name)}
                                            style={{
                                                transform: 'scale(1.2)',
                                                cursor: 'pointer',
                                                backgroundColor: selectedSizes.some(
                                                    (selectedSize) => selectedSize.name === size.name,
                                                )
                                                    ? 'pink'
                                                    : 'initial',
                                            }}
                                        />
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
                        <div className="add-color">
                            <label className="add-label">Choose color:</label>
                            <select
                                id="add-color-check"
                                className="add-select"
                                value={selectedColor}
                                onChange={(event) => setSelectedColor(event.target.value)}
                            >
                                <option value="#FF0000">Red</option>
                                <option value="#00FF00">Green</option>
                                <option value="#FFFF00">Yellow</option>
                                <option value="#C0C0C0">Slive</option>
                                <option value="#00FFFF">Blue</option>
                                <option value="#FFFFFF">White</option>
                                <option value="#000000">Black</option>
                                <option value="#808080">Grey</option>
                            </select>
                        </div>
                    </div>
                    <div className="add-image">
                        <label className="add-label">Product images:</label>
                        <input
                            type="text" // Sử dụng type "text" thay vì "file"
                            className="add-image-input"
                            value={imageProduct} // Giữ giá trị trong state hoặc biến tương ứng
                            onChange={(event) => setImageProduct(event.target.value)}
                            placeholder="Enter the product image URL"
                        />
                    </div>
                    <div className="add-product-btn">
                        <button onClick={handleSubmit} className="add-product-btn-submit">
                            Submit
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
