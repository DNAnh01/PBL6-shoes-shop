import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import BrandCard from '../BrandCard';
import logo from '../../images/logoNike.png';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Mousewheel, Keyboard } from 'swiper/modules';
import './style.scss';
import apiProductGrid from '../API/apiProductGrid';

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
    const [isLoading, setIsLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState('0');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiProductGrid.getAllProduct(pageNumber);
                const uniqueBrands = filterUniqueBrands(response?.data?.content);

                setBrands(uniqueBrands);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        };

        fetchData();
    }, []);

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

    return (
        <div className="container-layout">
            <div className="brandList">
                <h1 className="brandList-title">Danh mục</h1>
            </div>
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
                            <BrandCard imageUrl={brand?.brand?.imageUrl} name={brand?.brand?.name} amount="53" />
                        </SwiperSlide>
                    ))
                )}
            </Swiper>
        </div>
    );
}
