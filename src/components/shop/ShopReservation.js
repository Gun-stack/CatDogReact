import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ShopResrevationDate from './ShopResrevationDate';
import ShopReservationForm from './ShopReservationForm';




function ShopReservation(props) {



    const desInfo ={
        num: '1',
        img: '/img/gallrey-img/8.jpg',
        position: '박원장',
        name: '행복행',
        shop: '복행복 동물병원',
        info: '행복해 그리고 퇴근해'
    }
    



    return (
        <div>
            <hr className="divide-line" />
            <div className="shop-title-text sm-text ma-top2rem">예약</div>
            {/* 스타일리스트 프로필 */}
            <div className="stylelist-content magin-t-1">
                <div className="st-profile-container">

                    <div className="st-profile-img-container">
                        <img src={desInfo.img} alt="프로필 이미지" className="st-profile-img" />
                    </div>

                    <div className="st-profile-context">
                        <div className="st-profile-name">
                            {desInfo.position} {desInfo.name}
                        </div>
                        <div className="st-profile-shop">
                            {desInfo.shop}
                        </div>
                        <div className="st-profile-info">
                            {desInfo.info}
                        </div>
                    </div>  
                </div>
            </div>
            
            <Routes>
                <Route path='/1' element={<ShopResrevationDate desInfo={desInfo} />}  /> 
                <Route path='/' element={<ShopReservationForm/>} />
            </Routes>



        </div>



    );
}

export default ShopReservation;