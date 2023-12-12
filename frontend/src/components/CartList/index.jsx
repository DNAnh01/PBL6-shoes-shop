import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartCard from '../CartCard';
import './style.scss';
import apiCart from '../API/apiCart';
import { toast, ToastContainer } from 'react-toastify';
import apiRemoveCartItems from '../API/apiRemoveCartItems';
import apiUpdateCartItems from '../API/apiUPdateCartItems';
import { useDispatch } from 'react-redux';
import Button from '~/pages/Button';

export default function CartList() {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    console.log(products);
    // console.log(products);
    const fetchCarts = async () => {
        try {
            const response = await apiCart.getAllCart();
            setProducts(response.data);
        } catch (error) {
            // toast.error(error?.message);

            console.log(error);
        }
    };

    // API cart
    useEffect(() => {
        // Gọi hàm fetchCarts
        fetchCarts();
    }, []);

    const handleQuantityChange = async (productId, newQuantity) => {
        console.log(newQuantity);
        const formData = {
            quantity: newQuantity,
        };
        try {
            const response = await apiUpdateCartItems.putUpdateCartItems(productId, formData);
            if (response) {
                console.log('Bạn tăng số lượng sản phẩm lên 1');
            } else {
                // toast.error('Update quantity failed');
            }
        } catch (error) {
            // toast.error(error.message);
            console.log(error);
        }
    };

    const handleIncreaseQuantity = (productId) => {
        const product = products.cartItems.find((p) => p.id === productId);
        const currentQuantity = product ? product.quantity : 0;
        const newQuantity = currentQuantity + 1;
        handleQuantityChange(productId, newQuantity);
        fetchCarts();
    };

    const handleDecreaseQuantity = (productId) => {
        const product = products.cartItems.find((p) => p.id === productId);
        const currentQuantity = product ? product.quantity : 0;
        const newQuantity = currentQuantity - 1;
        handleQuantityChange(productId, newQuantity);
        fetchCarts();
    };

    const handleDeleteProduct = async (productId) => {
        try {
            const response = await apiRemoveCartItems.delRemoveCartItems(productId);
            if (response) {
                fetchCarts();
                toast.success('Xóa sản phẩm thành công');
            } else {
                // toast.error('Xóa sản phẩm thất bại');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleDeleteAllProducts = async () => {
        try {
            // Iterate through all cart items and delete them one by one
            for (const product of products.cartItems) {
                await apiRemoveCartItems.delRemoveCartItems(product.id);
            }

            // After all items are deleted, update the state
            dispatch(setProducts({ ...products, cartItems: [] }));
            window.location.reload();
            toast.success('Xóa tất cả sản phẩm thành công');
        } catch (error) {
            toast.error('Đã xóa tất cả sản phẩm');
        }
    };

    return (
        <>
            <div className="cart container-layout">
                <ToastContainer />
                <div className="cart-operation">
                    <Link to="/product" className="cart-operation-link">
                        <button className="cart-operation-add">Add New Products</button>
                    </Link>
                </div>
                <div className="cartRow">
                    <div className="cartRow-product font-15">Product</div>
                    <div className="cartRow-price font-15">Unit price</div>
                    <div className="cartRow-priceSale font-15">Sale price</div>
                    <div className="cartRow-quantity font-15">Quantity</div>
                    <div className="cartRow-money font-15">Total</div>
                    <div className="cartRow-operation font-15">Operation</div>
                </div>

                {/* Danh sách sản phẩm  */}
                {products?.cartItems?.length > 0 &&
                    products?.cartItems?.map((product) => {
                        return (
                            <CartCard
                                key={product?.id}
                                product={product}
                                onDelete={() => handleDeleteProduct(product.id)}
                                onIncreaseQuantity={() => handleIncreaseQuantity(product.id)}
                                onDeCreaseQuantity={() => handleDecreaseQuantity(product.id)}
                            />
                        );
                    })}
            </div>
            <div className="payment">
                <div className="payment-voucher">
                    <i className="fa fa-ticket" aria-hidden="true" />
                    <span>Your voucher</span>
                    <button className="btn-payment-voucher">Select or enter Voucher code</button>
                </div>
                <div className="payment-detail">
                    <button className="payment-detail-btnall">Select all</button>
                    <button className="payment-detail-btndelete" onClick={handleDeleteAllProducts}>
                        Delete
                    </button>
                    <div className="payment-content">
                        <label>The Total Amount</label>
                        <label>{products?.totalDiscountedPrice + ' '}VND</label>
                    </div>
                </div>
                <div className="payment-btn">
                    <Button text="Buy Now" to="/pay?step=1" className={'payment-btn-buy'}>
                        Buy Now
                    </Button>
                </div>
            </div>
        </>
    );
}
