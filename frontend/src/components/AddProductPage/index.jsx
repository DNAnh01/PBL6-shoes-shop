import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import apiAddProduct from '~/states/API/apiAddProduct';
import { toast, ToastContainer } from 'react-toastify';

export default function AddProductPage() {
    const [nameProduct, setnameProduct] = useState('GIÀY THỂ THAO REEBOK RIDER V');
    const [descriptionProduct, setdescriptionProduct] = useState(
        'ĐÔI GIÀY LẤY CẢM HỨNG TỪ GIÀY CHẠY BỘ CỔ ĐIỂN VỚI PHONG CÁCH HIỆN ĐẠI Vẻ ngoài của bạn sẽ luôn trong khỏe khoắn năng động suốt ngày dài khi diện đôi Giày Reebok Rider V này',
    );
    const [priceProduct, setpriceProduct] = useState('200000');
    const [warehousePriceProduct, setwarehousePriceProduct] = useState('200000');

    const [discountedPriceProduct, setdiscountedPriceProduct] = useState('180000');
    const [discountPersentProduct, setdiscountPersentProduct] = useState('10');
    const [imageProduct, setimageProduct] = useState('');
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
    const calculateTotalQuantity = () => {
        return arrSize.reduce((total, size) => total + (size.quantity || 0), 0);
    };
    const handleBrandChange = (event) => {
        const brandName = event.target.value;
        setSelectedBrand(brandName);

        // Set default image URL based on the selected brand
        setimageProduct(brandDefaultImages[brandName]);
    };
    const handleSubmit = async () => {
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
                    // console.log('response:', response.data);
                    if (response) {
                        toast.log('Thêm sản phẩm mới thành công');
                        setTimeout(() => {
                            navigate('/admin/products');
                        }, 2000);
                    } else {
                        toast.error('Có lỗi khi thêm sản phẩm');
                    }
                } catch (error) {
                    // toast.error('Lỗi khi thực hiện yêu cầu API:', error);
                    // toast.error(`Có lỗi khi thực hiện yêu cầu API: ${error.message}`);
                }
            } else {
                toast.error('Giá của sản phẩm bạn đã nhập sai');
            }
        } else {
            // Display a message or handle the case where totalQuantity is not greater than 0
            toast.error('Số lượng sản phẩm cần lớn hơn 0 để thêm vào kho');
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
                            onChange={(event) => setnameProduct(event.target.value)}
                        />
                    </div>
                    <div className="add-description">
                        <label className="add-label">Product Description:</label>
                        <textarea
                            className="add-description-text"
                            rows="4"
                            value={descriptionProduct}
                            onChange={(event) => setdescriptionProduct(event.target.value)}
                        ></textarea>
                    </div>
                    <div className="add-price">
                        <label className="add-label">Price:</label>
                        <input
                            type="number"
                            className="add-price-input"
                            value={priceProduct}
                            onChange={(event) => setpriceProduct(event.target.value)}
                        />
                    </div>
                    <div className="add-warehousePrice">
                        <label className="add-label">Warehouse Price:</label>
                        <input
                            type="number"
                            className="add-warehousePrice-input"
                            value={warehousePriceProduct}
                            onChange={(event) => setwarehousePriceProduct(event.target.value)}
                        />
                    </div>
                    <div className="add-discountedPrice">
                        <label className="add-label">Discounted Price:</label>
                        <input
                            type="number"
                            className="add-discountedPrice-input"
                            value={discountedPriceProduct}
                            onChange={(event) => setdiscountedPriceProduct(event.target.value)}
                        />
                    </div>
                    <div className="add-discountPersent">
                        <label className="add-label">Discount Persent:</label>
                        <input
                            type="number"
                            className="add-discountPersent-input"
                            value={discountPersentProduct}
                            onChange={(event) => setdiscountPersentProduct(event.target.value)}
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
                            onChange={(event) => setimageProduct(event.target.value)}
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
