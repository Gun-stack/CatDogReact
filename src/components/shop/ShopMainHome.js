import React from 'react';
import { RouterProvider, useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';

function ShopMainHome({shopInfo}) {
    const {num} = useParams();
    console.log(shopInfo);


    return (
        <div>
            <div className="shop-form-container">
                        <div className="input-img-click sm-input-img">{shopInfo.notice}</div>
                    </div>
                    <div className="shop-title-text sm-text">영업시간<i className="fas fa-clock btn-icon"></i></div>
                    <div className="shop-form-container">
                        <div className="input-img-click sm-input-img">{shopInfo.worktime}</div>
                    </div>
                    <div className="shop-title-text sm-text">매장위치<i className="fas fa-map-pin btn-icon"></i></div>
                    <div className="shop-address">{shopInfo.address}</div>
                    <hr className="divide-line" />
                    <div className="shop-main-icons">

                        <div className="main-icon">
                            <i className="fas fa-phone main-icon-style color-nomal"></i>
                            <div><a href={shopInfo.tel}>전화문의</a></div>
                        </div>

                        <div className="main-icon">
                            <i className="fas fa-dog main-icon-style"></i>
                            <div><Link to="style">스타일 보기</Link></div>
                        </div>

                        <div className="main-icon">
                            <i className="far fa-calendar-alt main-icon-style color-nomal"></i>
                            <div><a href="shoppagestylelist.html">예약하기</a></div>
                        </div>
                    </div>
                    <hr className="divide-line" />

                    <div className="shop-title-text sm-text ma-top2rem">매장정보</div>
                    <div className="shop-form-container">
                        <p className="input-img-click sm-input-img">{shopInfo.info} </p>
                    </div>

                    <div className="shop-title-text sm-text ma-top2rem">스타일</div>
                    <div className="shop-form-container">
                        <div className="input-img-click sm-input-img">등록된 스타일이 없습니다</div>
                    </div>
        </div>
    );
}

export default ShopMainHome;