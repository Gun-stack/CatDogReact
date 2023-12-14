import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import StarRating  from './StarRating';


function DesReview(props) {
    const des = props.desInfo;
    const [reviewList, setReviewList] = useState([]);
    const [offset, setOffset] = useState(0);
    
    const PlusOffset = () => {    
        setOffset(offset+12);
        console.log(offset);
    }
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8090/reviewlistbydes', {params: {
            num: des.num,
            offset: offset, // 필요한 페이지 번호
            limit: 12, // 페이지당 아이템 개수
            },})
            .then((res) => {
                console.log(res.data);
                setReviewList([...reviewList, ...res.data]);
            })
            .catch((err) => {
                console.log(err);
            })
    } 
    , [offset]);
    


    return (
        <div>
                    <div className="shop-title-text sm-text ma-top2rem">리뷰</div>
                    <section className="review-section magin-t-1">
                        {/* <!-- 리뷰 컨테이너 --> */}

                        {reviewList.map((review, index) => (
                        <div className="review-container" key={index}>
                            <div className="review-text-container">
                                <h3 className="guest-nickname">보호자 {review.userId}</h3>
                                <h3 className="stylelist-nam">디자이너: {des.desNickname}</h3>
                                <div className="review-text">
                                    <p>
                                        {review.content}
                                    </p>
                                    <StarRating rating={review.star}/>
                                </div>
                            </div>
                            <div className="review-img-container">
                                <div className="review-img"></div>
                            </div>
                        </div>
                    ))}



                        <hr className="divide-line" />

                    </section>
        </div>
    );
}

export default DesReview;





















