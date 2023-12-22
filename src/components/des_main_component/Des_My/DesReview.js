import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import StarRating from './StarRating';
import SwalCustomAlert from '../../Alerts/SwalCustomAlert';
import { useSelector } from 'react-redux';
import { url } from '../../../config';


function DesReview(props) {
    const des = props.desInfo;
    const [reviewList, setReviewList] = useState([]);
    const [offset, setOffset] = useState(0);

    const PlusOffset = () => {
        setOffset(offset + 12);
        console.log(offset);
    }
    const [hasMore, setHasMore] = useState(true);


    const token = useSelector(state => state.token);
    const navigate = useNavigate();

    useEffect(() => {

        // console.log("로그인 후 토큰 값 : " + token);
        axios.get(`${url}/user`, {
            headers: {
                Authorization: token,
            }
        })
            .then(res => {
                console.log("Res : " + res.data);
            })
            .catch(err => {
                // console.log("Err : " + err);
                SwalCustomAlert(
                    'warning',
                    "로그인 이후 사용 가능합니다."
                );
                navigate('/userlogin');
            })

        axios.get(`${url}/reviewlistbydes`, {
            params: {
                num: des.num,
                offset: offset, // 필요한 페이지 번호
                limit: 12, // 페이지당 아이템 개수
            },
        })
            .then((res) => {
                console.log(res.data);
                setReviewList([...reviewList, ...res.data]);
                if (res.data.length < 12) {
                    setHasMore(false);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
        , [offset]);



    return (
        <>
            <div className="shop-title-text sm-text ma-top2rem">리뷰</div>
            <section className="review-section magin-t-1">
                {/* <!-- 리뷰 컨테이너 --> */}

                {reviewList.map((review, index) => (
                    <div className="review-container" key={index}>
                        <div className="review-text-container">
                            <h3 className="guest-nickname">작성자 : {review.userNickname}</h3>
                            <h3 className="stylelist-nam">디자이너: {des.desNickname}</h3>
                            <div className="review-text">
                                <p>
                                    {review.content}
                                </p>
                                <StarRating rating={review.star} />
                            </div>
                        </div>
                        <div className="review-img-container">
                            {review.afterImg &&
                                <img className="review-img" src={`${url}/reviewimg/${review.afterImg}`} alt='' />
                            }

                        </div>
                    </div>
                ))}

                {hasMore ?
                    <div className="main-btn main-sm-btn" onClick={PlusOffset}><span className="btn-text">더보기</span></div>
                    : <div className="main-btn main-sm-btn"><span className="btn-text">마지막 페이지 입니다.</span></div>
                }


                <hr className="divide-line" />

            </section>
        </>
    );
}

export default DesReview;





















