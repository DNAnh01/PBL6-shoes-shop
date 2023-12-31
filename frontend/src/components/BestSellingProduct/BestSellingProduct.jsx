import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './BestSellingProduct.module.scss';
import images from '~/assets/images';
import apiAdminDashboard from '~/api/admin/apiAdminDashbor';

const cx = classNames.bind(styles);

const BestSellingProduct = ({ selectedTime, setIsLoading }) => {
    const [productData, setProductData] = useState({});
    useEffect(() => {
        console.log('selected time for best selling product: ', selectedTime);
        // call api
        setIsLoading(true);
        const fetchData = async () => {
            try {
                let res;
                if (selectedTime.length === 7) {
                    res = await apiAdminDashboard.getBestSellingProductBySelectedMonth(selectedTime);
                } else if (selectedTime.length === 10) {
                    res = await apiAdminDashboard.getBestSellingProductBySelectedDay(selectedTime);
                }
                setProductData(res.data || {});
                if (res.data) {
                    setProductData((prevData) => ({
                        ...prevData,
                        imageUrl: res.data.imageUrl || images.noImage,
                        title: res.data.title || 'empty',
                        discountedPrice: res.data.discountedPrice !== null ? res.data.discountedPrice : 0,
                        appearanceCount: res.data.appearanceCount !== null ? res.data.appearanceCount : 0,
                    }));
                }
                console.log({ productData });
            } catch (error) {
                console.log({ error });
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedTime]);
    return (
        <div className={`align-items-center container d-flex h-100 justify-content-center w-100`}>
            <div className={`${cx('image-box')} align-items-center d-flex flex-column h-75 justify-content-center`}>
                <img className={cx('image')} src={productData?.imageUrl} alt="" />

                <div className={cx('product-name')}>{productData?.title}</div>
            </div>
            <div
                className={`${cx(
                    'des-box',
                )} align-items-center d-flex flex-column h-100 image-box justify-content-center`}
            >
                <div className={cx('des-content')}>
                    <h6 className={cx('des-content-title')}>Discounted Price</h6>
                    <h5 className={cx('des-content-value')}>{productData?.discountedPrice}</h5>
                </div>
                <div className={cx('des-content')}>
                    <h6 className={cx('des-content-title')}>Quantity Sold</h6>
                    <h5 className={cx('des-content-value')}>{productData?.appearanceCount}</h5>
                </div>
            </div>
        </div>
    );
};

export default BestSellingProduct;
