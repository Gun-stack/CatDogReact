import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import StarRating from '../des_main_component/Des_My/StarRating';
import SwalCustomAlert from '../Alerts/SwalCustomAlert';
import { useSelector } from 'react-redux';
import { url } from '../../config';

function ShopMainReview(shopInfo) {
    const shop = shopInfo.shopInfo;
    const [reviewList, setReviewList] = useState([]);
    const [offset, setOffset] = useState(0);

    const PlusOffset = () => {
        setOffset(offset + 5);
        console.log(offset);
    }
    const [hasMore, setHasMore] = useState(true);
    const token = useSelector(state => state.token);
    const navigate = useNavigate();


    useEffect(() => {


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


        axios.get(`${url}/reviewlistbyshop`, {
            params: {
                num: shop.num,
                offset: offset, // 필요한 페이지 번호
                limit: 5, // 페이지당 아이템 개수
            },
        })
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
            {reviewList.length === 0 ?
                <div action="" className="shop-form-container">
                    <div className="input-img-click sm-input-img">
                        <p>리뷰가 아직 없습니다</p>
                    </div>
                </div>
                :
                <section className="review-section">
                    {reviewList.map((review, index) => (
                        <div className="review-container" key={index}>
                            <div className="review-text-container">
                                <h3 className="guest-nickname">작성자 : {review.userNickname}</h3>
                                <h3 className="stylelist-nam">디자이너 : {review.desNickname}</h3>
                                <div className="review-text">
                                    <p>{review.content}</p>

                                    <span className="review-stars">

                                        <span className="review-stars-point">
                                            <StarRating rating={review.star} />
                                        </span>

                                    </span>

                                </div>

                            </div>
                            {review.afterImg &&
                                <div className="review-img-container">
                                    <img src={`${url}/reviewimg/${review.afterImg}`} alt="리뷰이미지" className="review-img" />
                                </div>
                            }
                        </div>
                    ))}

                    <hr className="divide-line" />
                    {hasMore ?
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
