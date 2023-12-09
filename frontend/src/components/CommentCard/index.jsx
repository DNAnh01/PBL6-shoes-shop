'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiCreateReview from '../API/apiReview';
import Raiting from '../API/Raiting';
import './style.scss';

export default function CommentCard({ productId, onAmountRatingChange }) {
    const [value, setValue] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const postCreateRaiting = async () => {
        if (!reviewText.trim()) {
            // If reviewText is empty or only contains whitespace
            toast.error('Vui lòng nhập đánh giá của bạn trước khi gửi.');
            return; // Stop the function execution
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
                toast.success('Thêm đánh giá thành công');
                setTimeout(() => {}, 2000);
            } else {
                toast.error('Có lỗi khi thêm đánh giá');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const calculateTotalReviews = () => {
        // Calculate the total number of 5-star reviews
        const totalReviews = onAmountRatingChange || 0;

        return totalReviews;
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
                                    <span>5</span>
                                </div>
                                <div className="ratingHeader-star icon-star">
                                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                    <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                </div>
                                <div className="ratingHeader-reviews">{calculateTotalReviews()} Reviews</div>
                            </div>
                            <div className="rating-main">
                                <div className="rating-five rating-items">
                                    <div className="stars-area">
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                    </div>
                                    <div className="wrapper-proportional-area">
                                        <div className="proportional-area"></div>
                                    </div>
                                    <div className="quantity-area">
                                        <span>{onAmountRatingChange}</span>
                                    </div>
                                </div>
                                <div className="rating-four rating-items">
                                    <div className="stars-area">
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                        <i className="fa fa-star-o icon-star"></i>
                                    </div>
                                    <div className="wrapper-proportional-area">
                                        <div className="proportional-area"></div>
                                    </div>
                                    <div className="quantity-area">
                                        <span>0</span>
                                    </div>
                                </div>
                                <div className="rating-three rating-items">
                                    <div className="stars-area">
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                        <i className="fa fa-star-o icon-star"></i>
                                        <i className="fa fa-star-o icon-star"></i>
                                    </div>
                                    <div className="wrapper-proportional-area">
                                        <div className="proportional-area"></div>
                                    </div>
                                    <div className="quantity-area">
                                        <span>0</span>
                                    </div>
                                </div>
                                <div className="rating-two rating-items">
                                    <div className="stars-area">
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                        <i className="fa fa-star-o icon-star"></i>
                                        <i className="fa fa-star-o icon-star"></i>
                                        <i className="fa fa-star-o icon-star"></i>
                                    </div>
                                    <div className="wrapper-proportional-area">
                                        <div className="proportional-area"></div>
                                    </div>
                                    <div className="quantity-area">
                                        <span>0</span>
                                    </div>
                                </div>
                                <div className="rating-one rating-items">
                                    <div className="stars-area">
                                        <i className="fa fa-solid fa-star fa-2xl icon-star"></i>
                                        <i className="fa fa-star-o icon-star"></i>
                                        <i className="fa fa-star-o icon-star"></i>
                                        <i className="fa fa-star-o icon-star"></i>
                                        <i className="fa fa-star-o icon-star"></i>
                                    </div>
                                    <div className="wrapper-proportional-area">
                                        <div className="proportional-area"></div>
                                    </div>
                                    <div className="quantity-area">
                                        <span>0</span>
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
        </section>
    );
}
