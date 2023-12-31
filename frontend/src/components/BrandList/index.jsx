import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import BrandCard from '../BrandCard';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Mousewheel, Keyboard } from 'swiper/modules';
import './style.scss';
import apiProductGrid from '~/api/user/apiProductGrid';
import { useCallback } from 'react';

const breakpointsSwiper = {
    320: {
        slidesPerView: 1,
        spaceBetween: 20,
    },
    576: {
        slidesPerView: 2,
        spaceBetween: 30,
    },
    768: {
        slidesPerView: 3,
        spaceBetween: 40,
    },
    992: {
        slidesPerView: 4,
        spaceBetween: 40,
    },
};

export default function BrandList() {
    const [brands, setBrands] = useState([]);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageNumber] = useState('0');
    const pageSize = 100;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiProductGrid.getAllProduct(pageNumber, pageSize);
                const uniqueBrands = filterUniqueBrands(response?.data?.content);
                setProducts(response.data.content);
                setBrands(uniqueBrands);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [pageNumber]);
    const filterUniqueBrands = (brands) => {
        const uniqueBrandNames = new Set();
        const uniqueBrands = [];
        brands.forEach((brand) => {
            const brandName = brand?.brand?.name;

            if (!uniqueBrandNames.has(brandName)) {
                uniqueBrandNames.add(brandName);
                uniqueBrands.push(brand);
            }
        });

        return uniqueBrands;
    };
    const countBrandElements = useCallback(
        (brandName) => {
            return products.filter((product) => product?.brand?.name === brandName).length;
        },
        [products],
    );
    return (
        <div className="container-layout">
            <h1 className="brandList-title">category</h1>
            <div className="brandList">
                <Swiper
                    spaceBetween={20}
                    slidesPerView={4}
                    breakpoints={breakpointsSwiper}
                    cssMode={true}
                    navigation={true}
                    pagination={true}
                    mousewheel={true}
                    keyboard={true}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                >
                    {isLoading ? (
                        <SwiperSlide>
                            {/* Loading state */}
                            <div className="brandCard-loading"></div>
                        </SwiperSlide>
                    ) : (
                        brands.map((brand) => (
                            <SwiperSlide key={brand?.brand?.id}>
                                <BrandCard
                                    imageUrl={brand?.brand?.imageUrl}
                                    name={brand?.brand?.name}
                                    amount={countBrandElements(brand?.brand?.name)}
                                />
                            </SwiperSlide>
                        ))
                    )}
                </Swiper>
            </div>
        </div>
    );
}
