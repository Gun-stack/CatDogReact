import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import StarRating  from '../des_main_component/Des_My/StarRating';

function ShopMainReview(shopInfo) {
    const shop = shopInfo.shopInfo;
    const [reviewList, setReviewList] = useState([]);
    const [offset, setOffset] = useState(0);
    
    const PlusOffset = () => {    
        setOffset(offset+5);
        console.log(offset);
    }
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8090/reviewlistbydes', {params: {
            num: shop.num,
            offset: offset, // 필요한 페이지 번호
            limit: 5, // 페이지당 아이템 개수
            },})
            .then((res) => {
                console.log(res.data);
                setReviewList([...reviewList, ...res.data]);
                if (res.data.length < 5) {
                    setHasMore(false);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    } 
    , [offset]);
    



    return (
        <div>
            {reviewList.length === 0?
            <div action="" className="shop-form-container">
                <div className="input-img-click sm-input-img">
                    <p>리뷰가 아직 없습니다</p>
                </div>
            </div>
            :   
            <section className="review-section">
                {reviewList.map((review) => (
                    <div className="review-container">
                    <div className="review-text-container">
                        <h3 className="guest-nickname">작성자 : {review.userNickname}</h3>
                        <h3 className="stylelist-nam">디자이너 : {review.desNickname}</h3>
                        <div className="review-text">
                            <p>{review.content}</p>
                            <span className="review-stars">
                                <span className="review-stars-point">{review.star}</span>
                                {[...Array(Number(review.star))].map((_, index) => (
                                    <i key={index} className="fas fa-star review-star"></i>
                                    ))}
                                {[...Array(5 - Number(review.star))].map((_, index) => (
                                    <i key={index + Number(review.star)} className="far fa-star review-star"></i>
                                    ))}
                            </span>
                        </div>
                    </div>
                    <div className="review-img-container">
                        <img src={`http://localhost:8090/reviewimg/${review.afterImg}`} alt="리뷰이미지" className="review-img" />
                    </div>
                </div>
                ))}

                <hr className="divide-line" />
                {hasMore?
            <div className="main-btn main-sm-btn" onClick={PlusOffset}><span className="btn-text">더보기</span></div>
            :
            <div className="main-btn main-sm-btn"><span className="btn-text">마지막 페이지 입니다.</span></div>
                }
            </section>
        }
        </div>
        );
    }

export default ShopMainReview;
