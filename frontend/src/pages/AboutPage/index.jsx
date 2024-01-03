import Header from '../../layouts/UserDefaultLayout/Header';
import './style.scss';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCart } from '~/api/user/CartContext';
import apiAddItem from '~/api/user/apiAddItem';
import apiProductDetail from '~/api/admin/apiProductDetail';
import CommentCard from '~/components/CommentCard';
import Button from '~/components/Button';

export default function AboutPage({ quantity = 1 }) {
    const navigate = useNavigate();
    const [productDetail, setProductDetail] = useState([]);
    const { cartItems } = useCart();
    const { updateCartItems } = useCart();
    const [selectedSize, setSelectedSize] = useState('');
    const [quantityDefault, setQuantityDefault] = useState(quantity);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const [selectedSizeQuantity, setSelectedSizeQuantity] = useState(null);
    const [maxQuantity, setMaxQuantity] = useState(1);

    const handleSizeClick = (size) => {
        setSelectedSize(size.name);
        setSelectedSizeQuantity(size.quantity);
        setQuantityDefault(1);
    };

    const handleAddToCart = async (productId) => {
        if (!selectedSize || selectedSize <= 0) {
            toast.warning('Please select size and color before adding to cart');
            return;
        }
        const formData = {
            productId,
            quantity: quantityDefault,
            size: selectedSize,
            color: productDetail.color,
        };
        try {
            setIsLoading(true);

            const response = await apiAddItem.putAddItem(formData);
            toast.success('Added product to cart successfully');
            updateCartItems();
            console.log(response);
        } catch (error) {
            toast.error('You need to log in to use this function');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                setIsLoading(true);

                const response = await apiProductDetail.getProductDetail(id);
                setProductDetail(response.data);
            } catch (error) {
                toast.error('Product does not exist', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductDetail();
    }, [id]);

    const handleBuyNow = () => {
        toast.success('Added product to cart successfully');
        setTimeout(() => {
            navigate(`/pay?step=1`);
        }, 500);
    };
    useEffect(() => {
        if (selectedSize) {
            const selectedSizeInfo = productDetail.sizes.find((size) => size.name === selectedSize);
            setMaxQuantity(selectedSizeInfo ? selectedSizeInfo.quantity : 1);
        }
    }, [selectedSize, productDetail.sizes]);
    const handleDecreaseQuantity = () => {
        if (quantityDefault > 1) {
            setQuantityDefault(quantityDefault - 1);
        }
    };

    const handleIncreaseQuantity = () => {
        if (quantityDefault < maxQuantity) {
            setQuantityDefault(quantityDefault + 1);
        } else {
            toast.warning(`You cannot add more than ${maxQuantity} entries for the selected dimension.`);
        }
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                                    <Link to={`/product?brand=${productDetail?.brand?.name}`} className="about-brand">
                                        {productDetail?.brand?.name}
                                    </Link>
                                </div>
                                <div className="about-description">
                                    <p style={{ width: 600 }}>{productDetail.description}</p>
                                </div>
                            </div>
                            <div className="about-table">
                                <div className="about-table-price">
                                    <span className="about-table-price-old">
                                        {productDetail.price.toLocaleString('it-IT', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </span>
                                    <span className="about-table-price-current">
                                        {productDetail.discountedPrice.toLocaleString('it-IT', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </span>
                                </div>
                                <div className="about-table-size">
                                    <span className="about-size-name">Size:</span>
                                    <div className="about-size-buttons">
                                        {productDetail.sizes.map((size) => (
                                            <Button
                                                small
                                                key={size.name}
                                                className={`size-button ${
                                                    selectedSize === size.name ? 'selected' : ''
                                                }`}
                                                onClick={() => handleSizeClick(size)}
                                            >
                                                {size.name}
                                            </Button>
                                        ))}
                                    </div>
                                    {selectedSizeQuantity !== null && (
                                        <span className="selected-size-quantity">
                                            ({selectedSizeQuantity} available)
                                        </span>
                                    )}
                                </div>

                                <div className="about-table-size" style={{ display: 'flex', gap: '0 50px' }}>
                                    <span className="about-size-name">Color:</span>
                                    <div
                                        className="color-display"
                                        style={{ backgroundColor: productDetail.color, width: '30px', height: '30px' }}
                                    ></div>
                                </div>
                                <div className="about-quantity">
                                    <div className="about-quantity-detail">
                                        <Button primary small text="-" onClick={handleDecreaseQuantity}>
                                            -
                                        </Button>
                                        <input
                                            type="text"
                                            className="about-quantity-input"
                                            value={quantityDefault}
                                            onChange={(e) => setQuantityDefault(e.target.value)}
                                        />
                                        <Button primary small text="+" onClick={handleIncreaseQuantity}>
                                            +
                                        </Button>
                                    </div>
                                    <div className="about-payment">
                                        {selectedSizeQuantity <= 0 ? (
                                            <Button
                                                primary
                                                small
                                                disabled
                                                text="Add To Cart"
                                                onClick={() => handleAddToCart(productDetail.id)}
                                            >
                                                Add To Cart
                                            </Button>
                                        ) : (
                                            <Button
                                                primary
                                                small
                                                text="Add To Cart"
                                                onClick={() => handleAddToCart(productDetail.id)}
                                            >
                                                Add To Cart
                                            </Button>
                                        )}
                                        {sessionStorage.getItem('jwt') === null || selectedSizeQuantity <= 0 ? (
                                            <Button
                                                primary
                                                small
                                                disabled
                                                onClick={() => handleBuyNow(productDetail.id)}
                                            >
                                                Buy Now
                                            </Button>
                                        ) : (
                                            <Button primary small onClick={() => handleBuyNow(productDetail.id)}>
                                                Buy Now
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <hr className="horizontal-line" />
            <div className="container-layout">
                <ToastContainer />
                <div className="information">
                    <h2 className="information-title">Shoe model information: {productDetail.title}</h2>
                    <div className="information-item">
                        <span className="information-text">Product's name:</span>
                        <div className="information-show">{productDetail.title}</div>
                    </div>
                    <div className="information-item">
                        <span className="information-text">Catogery: </span>
                        <div className="information-show">{productDetail.brand?.name}</div>
                    </div>
                    <div className="information-item">
                        <span className="information-text">Product launched at</span>
                        <div className="information-show">{new Date(productDetail.createAt).toLocaleDateString()}</div>
                    </div>
                    <div className="information-item">
                        <span className="information-text">Discount</span>
                        <div className="information-show">{productDetail.discountPersent}%</div>
                    </div>
                    <div className="information-item">
                        <span className="information-text">Price after reduction is:</span>
                        <div className="information-show">{productDetail.discountedPrice} VND</div>
                    </div>
                    <div className="information-item">
                        <span className="information-text">Status</span>
                        <div className="information-show">
                            {productDetail.quantity === 0 ? 'Out of stock' : 'In stock'}
                        </div>
                    </div>
                    <div className="information-item">
                        <span className="information-text">Condition of products</span>
                        <div className="information-show">New products 100%</div>
                    </div>
                </div>
            </div>
            <CommentCard productId={id} />
        </>
    );
}
