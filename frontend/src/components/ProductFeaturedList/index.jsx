import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import apiTopProducts from '~/api/user/apiTopProducts';
import ProductFeaturedCard from '../ProductFeaturedCard';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function ProductFeaturedList() {
    const [topSellingProductsData, setTopSellingProductsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let resTopSellingProducts = await apiTopProducts.getTopNewProducts();
                setTopSellingProductsData(resTopSellingProducts.data);
            } catch (error) {
                console.log({ error });
            }
        };

        fetchData();
    }, []);

    return (
        <section>
            <div className="product-featured container-layout">
                <h2 className="product-featured-title">Most sold products of the day</h2>
                <div className="swiper-container">
                    <div className="swiper-wrapper-container">
                        <Swiper
                            spaceBetween={30}
                            centeredSlides={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            slidesPerView={1}
                            navigation={true}
                            modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
                        >
                            {topSellingProductsData.map((product, index) => (
                                <SwiperSlide key={index} className="z-10">
                                    <ProductFeaturedCard product={product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
}
