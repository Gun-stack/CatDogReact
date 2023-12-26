import React, { useEffect } from 'react';
import { Route, Routes, useParams , Link } from 'react-router-dom';
import ShopResrevationDate from './ShopResrevationDate';
import ShopReservationForm from './ShopReservationForm';
import ShopResvDetailCheck from './ShopResvDetailCheck';
import Error404 from '../error/Error404';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { url } from '../../config';




function ShopReservation(props) {
    const dispatch = useDispatch();
    const shopInfo = props.shopInfo;
    const params = useParams();
    const desInfo =  useSelector(state => state.des);
    
    //디자이너 넘버로 디자이너 정보 찾아오기
    useEffect(() => {
        console.log(shopInfo);
        axios.get(`${url}/desinfobynum?desNum=${params.desnum}`)
        .then((res) => {
            // console.log("resdata: "+ res.data);
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
                        <img src={`${url}/desimg/${desInfo.num}`} alt="프로필 이미지" className="st-profile-img" />
                    </div>

                    <div className="st-profile-context">
                        <div className="st-profile-name">
                            <Link to={`/des/${desInfo.num}`}>
                            {desInfo.position} {desInfo.desNickname}
                            </Link>

                        </div>

                        <div className="st-profile-shop">
                            @{shopInfo.name}
                        </div>
                        
                        <div className="st-profile-shop">
                            <span className="review-stars">
                                <span className="review-stars-point">{desInfo.star}</span>
                                {[...Array(Math.floor(Number(desInfo.star)))].map((_, index) => (
                                    <i key={index} className="fas fa-star review-star"></i>
                                    ))}
                                {[...Array(5 - Math.floor(Number(desInfo.star)))].map((_, index) => (
                                    <i key={index + Math.floor(Number(desInfo.star))} className="far fa-star review-star"></i>
                                    ))}
                            </span>
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
                <Route path='form/check' element={<ShopResvDetailCheck desInfo={desInfo} shopInfo={shopInfo} />} />
                <Route path='/*' element={<Error404/>}/>
            </Routes>



        </div>



    );
}

export default ShopReservation;