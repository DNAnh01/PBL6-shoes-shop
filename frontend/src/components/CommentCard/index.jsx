'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiCreateReview from '../API/apiReview';
import Raiting from '../API/Raiting';
import './style.scss';
import apiReviewDetail from '../API/apiReviewDetail';

export default function CommentCard({ productId }) {
    const [value, setValue] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Thêm isLoading vào đây
    const [reviews, setReviews] = useState([]);
    const totalRating5 = reviews.filter((review) => review.rating === 5).length;
    const totalRating4 = reviews.filter((review) => review.rating === 4).length;
    const totalRating3 = reviews.filter((review) => review.rating === 3).length;
    const totalRating2 = reviews.filter((review) => review.rating === 2).length;
    const totalRating1 = reviews.filter((review) => review.rating === 1).length;
    let id = useParams();
    const postCreateRaiting = async () => {
        if (!reviewText.trim()) {
            // If reviewText is empty or only contains whitespace
            toast.warning('Vui lòng nhập đánh giá của bạn trước khi gửi.');
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

    useEffect(() => {
        const fetchReviewDetail = async () => {
            try {
                setIsLoading(true); // Bắt đầu loading
                const response2 = await apiReviewDetail.getReviewDetail(id);
                setReviews(response2?.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReviewDetail();
    }, [id]);

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
        </section>
    );
}
