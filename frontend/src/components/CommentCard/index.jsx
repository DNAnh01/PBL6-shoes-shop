'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './style.scss';

//
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard, Mousewheel, Navigation } from 'swiper/modules';
import apiProductDetail from '~/api/admin/apiProductDetail';
import apiCreateReview from '~/api/user/apiReview';
import apiReviewDetail from '~/api/user/apiReviewDetail';
import Raiting from '~/api/user/Raiting';

export default function CommentCard({ productId }) {
    const image =
        'https://png.pngtree.com/element_our/20200611/ourlarge/pngtree-doggie-cute-cheap-expression-pack-avatar-image_2251655.jpg';

    const [product, setProduct] = useState();
    const [value, setValue] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [reviews, setReviews] = useState([]);
    const totalRating5 = reviews.filter((review) => review.rating === 5).length;
    const totalRating4 = reviews.filter((review) => review.rating === 4).length;
    const totalRating3 = reviews.filter((review) => review.rating === 3).length;
    const totalRating2 = reviews.filter((review) => review.rating === 2).length;
    const totalRating1 = reviews.filter((review) => review.rating === 1).length;
    let id = useParams();
    useEffect(() => {
        const fetchproductDetail = async () => {
            try {
                const response = await apiProductDetail.getProductDetail(id?.id);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        };
        fetchproductDetail();
    }, [id?.id]);

    const postCreateRaiting = async () => {
        if (!reviewText.trim()) {
            toast.warning('Please enter your rating before submitting.');
            return;
        }
        const formData = {
            productId: productId,
            review: reviewText,
            rating: value,
        };

        try {
            const response = await apiCreateReview.postCreateReview(formData);
            console.log('response:', response);

            if (response) {
                toast.success('Added review successfully');
                fetchReviewDetail();
            } else {
                toast.error('There was an error adding a review');
            }
        } catch (error) {
            toast.error('You need to log in', error);
        }
    };

    const fetchReviewDetail = useCallback(async () => {
        try {
            const response2 = await apiReviewDetail.getReviewDetail(id);
            setReviews(response2?.data);
        } catch (error) {
            console.log(error);
        }
    }, [id]);

    useEffect(() => {
        fetchReviewDetail();
    }, [fetchReviewDetail]);

    const calculateAverageRating = () => {
        if (reviews.length === 0) {
            return 0;
        }

        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        const numberOfReviews = reviews.filter((review) => review.rating > 0).length;

        if (numberOfReviews === 0) {
            return 0;
        }

        const averageRating = totalRating / numberOfReviews;

        return averageRating.toFixed(2);
    };
    return (
        <section>
            <div className="container-layout">
                <div className="customerReviews-wrapper">
                    <div className="customerReviews-title directory-name">
                        <h1 className="directory-name-h1">Customer Reviews</h1>
                    </div>
                    <div className="total">
                        <div className="total-Rating">
                            <div className="rating-header">
                                <div className="ratingHeader-number">
                                    <span>{calculateAverageRating()}</span>
                                </div>
                                <div className="ratingHeader-star icon-star">
                                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                </div>
                                <div className="ratingHeader-reviews">{reviews.length} Reviews</div>
                            </div>
                            <div className="rating-main">
                                <div className="rating-five rating-items">
                                    <div className="quantity-area">
                                        <span>{totalRating5}</span>
                                    </div>
                                    <div className="stars-area">
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                    </div>
                                </div>
                                <div className="rating-four rating-items">
                                    <div className="quantity-area">
                                        <span>{totalRating4}</span>
                                    </div>
                                    <div className="stars-area">
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                        <i className="fa fa-star-o icon-star"></i>
                                    </div>
                                </div>
                                <div className="rating-three rating-items">
                                    <div className="quantity-area">
                                        <span>{totalRating3}</span>
                                    </div>
                                    <div className="stars-area">
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                        <i className="fa fa-star-o icon-star"></i>
                                        <i className="fa fa-star-o icon-star"></i>
                                    </div>
                                </div>
                                <div className="rating-two rating-items">
                                    <div className="quantity-area">
                                        <span>{totalRating2}</span>
                                    </div>
                                    <div className="stars-area">
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                        <i className="fa fa-star-o icon-star"></i>
                                        <i className="fa fa-star-o icon-star"></i>
                                        <i className="fa fa-star-o icon-star"></i>
                                    </div>
                                </div>
                                <div className="rating-one rating-items">
                                    <div className="quantity-area">
                                        <span>{totalRating1}</span>
                                    </div>
                                    <div className="stars-area">
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                        <i className="fa fa-star-o icon-star"></i>
                                        <i className="fa fa-star-o icon-star"></i>
                                        <i className="fa fa-star-o icon-star"></i>
                                        <i className="fa fa-star-o icon-star"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="review-form-wrapper">
                            <h4 className="review-title">ADD A REVIEW</h4>
                            <div className="review-form">
                                <p className="comment-notes">
                                    <span className=" notes">
                                        Your email address will not be published. Required fields are marked
                                    </span>
                                    <span className="text-red-500 require">*</span>
                                </p>
                                <div className="comment-form-rating">
                                    <label htmlFor="rating" className="mr-[10px]">
                                        <span className="rating">Your rating</span>
                                        <span className="require">*</span>
                                        <span className="rating">:</span>
                                    </label>
                                    <Raiting value={value} setValue={setValue}></Raiting>
                                </div>
                                <p className="comment-form-comment">
                                    <label htmlFor="comment">
                                        <span className="comment">Your review</span>
                                        <span className="require">*</span>
                                    </label>
                                    <textarea
                                        name="comment"
                                        id="comment"
                                        cols="45"
                                        rows="8"
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        required
                                        className="resize-none"
                                        style={{ border: '1px solid', borderRadius: '10px' }}
                                    ></textarea>
                                </p>
                                <button className="form-submit" onClick={postCreateRaiting}>
                                    <input name="submit" type="submit" id="submit" className="submit" value="Submit" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- End Customer Reviews -->/ */}
            </div>
            <div>
                <div className="px-[20px] font container-layout">
                    <div className="reviews-heading mb-[10px]">
                        <h3 className="label-comment">
                            Reviews for
                            <span className="font-semibold"> {product?.title}</span>
                        </h3>
                    </div>
                    <Swiper
                        //   modules={[Pagination]}
                        spaceBetween={20}
                        slidesPerView={2}
                        // navigation
                        grabCursor={'true'}
                        pagination={{ clickable: true }}
                        cssMode={true}
                        navigation={true}
                        mousewheel={true}
                        keyboard={true}
                        modules={[Navigation, Mousewheel, Keyboard]}
                        className="pb-[40px]"
                    >
                        {reviews.map((review, index) => (
                            <SwiperSlide key={index}>
                                <div className="bg-[#f8f8f8] review-card p-[10px] rounded-lg">
                                    <div className="card-top">
                                        <div className="comment-profile">
                                            <div className="comment-profile-image">
                                                <img src={image} alt="123" width={100} height={100} />
                                            </div>
                                            <div className="comment-profile-name">
                                                <strong>
                                                    {review?.user?.firstName} {review?.user?.lastName}
                                                </strong>
                                                <div className="likes">
                                                    {[...Array(review?.rating)].map((_, index) => (
                                                        <i
                                                            key={index}
                                                            className="fa fa-solid fa-star fa-2xl icon-star"
                                                        ></i>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="comment-date">
                                                <span>{new Date(review.createAt).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-main">
                                        <p>{review.review}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}
