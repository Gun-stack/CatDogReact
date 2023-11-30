import React from 'react';

function ShopMainReview(shopInfo) {
    const reviewList = [{
        num: '1',
        resNum: '3',
        img: '/img/gallrey-img/1.jpg',
        userId : '2',
        desId: '1',
        desName: '행복행',
        userName: '강형욱',
        content: '행복해 그리고 퇴근해',
        date : '2021-09-09',
        star  : '5'
    },

    {
        num: '2',
        resNum: '3',
        img: '/img/gallrey-img/textimg.png',
        userId : '3',
        desId: '1',
        desName: '행복행',
        userName: '달퐁이튀김이',
        content: '행복해 그리고 박근해',
        date : '2021-09-09',
        star  : '4'
    },
    {   num: '3',
        resNum: '3',
        img: '/img/gallrey-img/2.jpg',
        userId : '3',
        desId: '1',
        desName: '행복행',
        userName: '달팽이튀김',
        content: '행복해 그리고 박근해',
        date : '2021-09-09',
        star  : '3'
    }
    ];
    



    return (
        <div>
            <div action="" className="shop-form-container">
                <div className="input-img-click sm-input-img">
                    <p>리뷰가 아직 없습니다</p>
                </div>
            </div>

            <section className="review-section">

                <hr className="divide-line" />
                {reviewList.map((review) => (
                <div className="review-container">
                    <div className="review-text-container">
                        <h3 className="guest-nickname">{review.userName}</h3>
                        <h3 className="stylelist-nam">디자이너:{review.desName}</h3>
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
                        <img src={review.img} alt="리뷰이미지" className="review-img" />
                    </div>
                </div>
                ))}

                <hr className="divide-line" />
                <div className="main-btn">
                    <span className="btn-text">더보기</span>
                </div>
            </section>
        </div>
    );
}

export default ShopMainReview;
