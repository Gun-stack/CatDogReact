import React, { useEffect, useState } from 'react';
import { Route, Routes, useParams } from 'react-router-dom';
import ShopResrevationDate from './ShopResrevationDate';
import ShopReservationForm from './ShopReservationForm';
import Error404 from '../error/Error404';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';




function ShopReservation(props) {
    const dispatch = useDispatch();
    const shopInfo = props.shopInfo;
    const des = useParams();
    const desInfo =  useSelector(state => state.des);
    
    //디자이너 넘버로 디자이너 정보 찾아오기
    useEffect(() => {
        console.log(shopInfo);
        axios.get(`http://localhost:8090/desinfobynum?desNum=${des.desnum}`)
        .then((res) => {
            dispatch({type:'SET_DES', payload:res.data})
            console.log(desInfo)
            }
        )
        .catch((err) => {
            console.log(err);
        })
    
    },[]);
    





    return (
        <div>
            <div className="shop-title-text sm-text ma-top2rem">예약</div>
            {/* 스타일리스트 프로필 */}
            <div className="stylelist-content magin-t-1">
                <div className="st-profile-container">

                    <div className="st-profile-img-container">
                        <img src={`http://localhost:8090/desimg/${desInfo.profImg}`} alt="프로필 이미지" className="st-profile-img" />
                    </div>

                    <div className="st-profile-context">
                        <div className="st-profile-name">
                            {desInfo.position} {desInfo.name}
                        </div>
                        <div className="st-profile-shop">
                            {desInfo.shop}
                            
                            별{desInfo.star}
                        </div>
                        <div className="st-profile-info">
                            {desInfo.info}
                        </div>
                    </div>  
                </div>
            </div>
            
            <Routes>
                <Route path='/' element={<ShopResrevationDate desInfo={desInfo} shopInfo={shopInfo} />}  /> 
                <Route path='form' element={<ShopReservationForm desInfo={desInfo} shopInfo={shopInfo} />} />
                <Route path='/*' element={<Error404/>}/>
            </Routes>



        </div>



    );
}

export default ShopReservation;