import Header from '../../components/Layout/Header';
import './style.scss';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import apiProductDetail from '../../components/API/apiProductDetail';
import apiAddItem from '../../components/API/apiAddItem';
import CommentCard from '../../components/CommentCard';
import CommentedShow from '../../components/CommentedShow';
import { useCart } from '../../contexts/CartContext';
import Button from '../Button';

export default function AboutPage({ quantity = 1 }) {
    const navigate = useNavigate();
    const [productDetail, setProductDetail] = useState([]);
    const { cartItems } = useCart();
    const { updateCartItems } = useCart();
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState('');
    const [quantityDefault, setQuantityDefault] = useState(quantity);
    const [isLoading, setIsLoading] = useState(true); // Thêm isLoading vào đây
    const { id } = useParams();

    const handleAddToCart = async (productId) => {
        if (!selectedSize || !selectedColor) {
            toast.error('Vui lòng chọn size và màu sắc trước khi thêm vào giỏ hàng');
            return;
        }
        const formData = {
            productId,
            quantity: quantityDefault,
            size: selectedSize,
            color: selectedColor,
        };
        try {
            setIsLoading(true); // Bắt đầu loading

            const response = await apiAddItem.putAddItem(formData);
            toast.success('Thêm sản phẩm vào giỏ thành công');
            updateCartItems();
            // setTimeout(() => {
            //   navigate("/cart");
            // }, 2000);
            console.log(response);
        } catch (error) {
            console.error('Add to Cart Error:', error);
            toast.error('Bạn cần đăng nhập mới được sử dụng chức năng này');
        } finally {
            setIsLoading(false); // Kết thúc loading, không phụ thuộc vào thành công hay thất bại
        }
    };

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                setIsLoading(true); // Bắt đầu loading

                const response = await apiProductDetail.getProductDetail(id);
                setProductDetail(response.data);
            } catch (error) {
                // console.error('Error fetching product detail:', error);
                // toast.error('Error fetching product detail');
            } finally {
                setIsLoading(false); // Kết thúc loading, không phụ thuộc vào thành công hay thất bại
            }
        };

        fetchProductDetail();
    }, [id]);

    const handleBuyNow = () => {
        toast.success('Thêm sản phẩm vào giỏ thành công');
        setTimeout(() => {
            navigate(`/pay?step=1`);
        }, 2000);
    };

    const handleDecreaseQuantity = () => {
        if (quantityDefault > 1) {
            setQuantityDefault(quantityDefault - 1);
        }
    };

    const handleIncreaseQuantity = () => {
        setQuantityDefault(quantityDefault + 1);
    };

    const [parentAmountRating, setParentAmountRating] = useState(null);
    // Hàm callback để nhận giá trị amountRating từ component con
    const handleAmountRatingChange = (amountRating) => {
        setParentAmountRating(amountRating);
    };
    return (
        <>
            <Header cartItems={cartItems} />
            <div>
                <ToastContainer />
                {isLoading ? (
                    <div className="loading-spinner-container">
                        <div className="loading-spinner"></div>
                    </div>
                ) : (
                    <div className="about container-layout">
                        <div className="about-div">
                            <img src={productDetail.imageUrl} alt="" className="about-image"></img>
                            <div className="about-voucher">
                                <span className="about-voucher-text">{productDetail.discountPersent}%</span>
                            </div>
                        </div>
                        <div className="about-content">
                            <div className="about-information">
                                <h1 className="about-title">{productDetail.title}</h1>
                                <div className="about-rating">
                                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                </div>
                                <div className="about-description">
                                    <p>{productDetail.description}</p>
                                </div>
                            </div>
                            <div className="about-table">
                                <div className="about-table-price">
                                    <span className="about-table-price-old">${productDetail.price}</span>
                                    <span className="about-table-price-current">${productDetail.discountedPrice}</span>
                                </div>
                                <div className="about-table-size">
                                    <span className="about-size-name">Size:</span>
                                    <select
                                        className="about-size-font"
                                        value={selectedSize}
                                        onChange={(e) => setSelectedSize(e.target.value)}
                                    >
                                        <option value="1" defaultCheckedy>
                                            Choose an option
                                        </option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                    </select>
                                </div>
                                <div className="about-table-color">
                                    <span className="about-color-name">Color:</span>
                                    <select
                                        className="about-color-font"
                                        value={selectedColor} // Giữ giá trị đã chọn
                                        onChange={(e) => setSelectedColor(e.target.value)}
                                    >
                                        <option value="1" defaultCheckedy>
                                            Choose an option
                                        </option>
                                        <option value="#FF0000">Đỏ</option>
                                        <option value="#00FF00">Xanh lá</option>
                                        <option value="#FFFF00">Vàng</option>
                                        <option value="#C0C0C0">Bạc</option>
                                        <option value="#00FFFF">Xanh Dương</option>
                                        <option value="#FFFFFF">Trắng</option>
                                        <option value="#000000">Đen</option>
                                        <option value="#808080">Xám</option>
                                    </select>
                                </div>
                                <div className="about-quantity">
                                    <div className="about-quantity-detail">
                                        <Button text="-" onClick={handleDecreaseQuantity}>
                                            -
                                        </Button>
                                        <input
                                            type="text"
                                            className="about-quantity-input"
                                            value={quantityDefault}
                                            onChange={(e) => setQuantityDefault(e.target.value)}
                                        />
                                        <Button text="+" onClick={handleIncreaseQuantity}>
                                            +
                                        </Button>
                                    </div>
                                    <div className="about-payment">
                                        <Button text="Add To Cart" onClick={() => handleAddToCart(productDetail.id)}>
                                            Add To Cart
                                        </Button>
                                        <button className="about-pay" onClick={handleBuyNow}>
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <CommentCard productId={id} onAmountRatingChange={parentAmountRating} />
            <CommentedShow onAmountRatingChange={handleAmountRatingChange} />
        </>
    );
}
