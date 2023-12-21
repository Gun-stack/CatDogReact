import React, { useEffect } from 'react';
import axios from 'axios';
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom';
import Header from '../screens/Header';
import Footer from '../screens/Footer';
import ShopMainHome from './ShopMainHome';
import ShopMainMenu from './ShopMainMenu';
import ShopMainDesLIst from './ShopMainDesLIst';
import ShopMainStyle from './ShopMainStyle';
import ShopMainReview from './ShopMainReview';
import ShopReservation from './ShopReservation';
import Error404 from '../error/Error404';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import ImageSlider from '../tools/ImageSlider';
import {url} from '../../config';



function ShopMain() {
    const dispatch = useDispatch();
    const location = useLocation();
    const isActive = (path) => {
        return location.pathname === path;
    };
    const params = useParams();
    const shopInfo = useSelector((state) => state.shop);
    const [images,setImage] = useState([]); 
        




    useEffect(() => {
        axios.get(`${url}/shopinfobynum?num=${params.shopnum}`)
            .then((res) => {
                dispatch({ type: 'SET_SHOP', payload: res.data });
                console.log(res.data.bgImg);
                if(res.data.bgImg){
                    setImage(res.data.bgImg.split(','));
                }

            })
    }, [params.shopnum]);


    return (
        <div className="web-container">
            <div className="cd-container bg-white">
                <Header />
                <main className="cd-main dis-center po-re">

                    {/* 등록된 이미지가 없을때 나와야하는 컴포넌트 */}
                    {/* <div className="input-img-click">
                                이미지를 등록하세요
                            </div> */}
                    {images &&
                    <div className='slider-container  map-section'>
                        <ImageSlider images={images}/>
                    </div>
                    }


                    <section className="shop-main-section bg-white nearby-container">
                        <div className="shop-title-text">{shopInfo.name}</div>
                        <nav className="main-nav">
                            <ul className="main-nav-list">
                                <li className={`main-nav-list-text ${isActive('/') ? 'active' : ''}`}><Link to="" >홈</Link></li>
                                <li className={`main-nav-list-text ${isActive`/shop/${shopInfo.num}/menu` ? 'active' : ''}`}><Link to={`/shop/${shopInfo.num}/menu`}>메뉴</Link></li>
                                <li className={`main-nav-list-text ${isActive`/shop/${shopInfo.num}/designer` ? 'active' : ''}`}><Link to={`/shop/${shopInfo.num}/designer`}>예약하기</Link></li>
                                <li className={`main-nav-list-text ${isActive`/shop/${shopInfo.num}/style` ? 'active' : ''}`}><Link to={`/shop/${shopInfo.num}/style`}>스타일</Link></li>
                                <li className={`main-nav-list-text ${isActive`/shop/${shopInfo.num}/review` ? 'active' : ''}`}><Link to={`/shop/${shopInfo.num}/review`}>리뷰</Link></li>
                            </ul>
                        </nav>
                        <hr className="divide-line" />
                        <Routes>
                            <Route path="/" element={<ShopMainHome shopInfo={shopInfo} />} />
                            <Route path="menu" element={<ShopMainMenu shopInfo={shopInfo} />} />
                            <Route path="designer" element={<ShopMainDesLIst shopInfo={shopInfo} />} />
                            <Route path="style" element={<ShopMainStyle shopInfo={shopInfo} />} />
                            <Route path="review" element={<ShopMainReview shopInfo={shopInfo} />} />
                            <Route path="/reservation/:desnum/*" element={<ShopReservation shopInfo={shopInfo} />} />
                            <Route path='/*' element={<Error404 />} />
                        </Routes>

                    </section>
                </main>
                <Footer />
            </div>
        </div >
    );
}

export default ShopMain;

