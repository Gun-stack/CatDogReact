import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link, Route, Routes, useParams } from 'react-router-dom';
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


function ShopMain() {
    const { num } = useParams();
    const [shopInfo, setShopInfo] = useState({
        num: num,
        image: '/img/gallrey-img/3.jpg',
        shopname: '코스타리카 망하샵',
        worktime: '11:00 - 14:00',
        address: '서울시 금천구 가산 디지털 1로 (호서벤쳐타운) 901호',
        info: '매장정보 입니다 엘베 내려서 여자화장실 방향으로 나와서 우회전',
        notice: '월요일은 자체 휴강입니다',
        tel: '01022222232',
    });

    const shoplist = useSelector((state) => state.shop);
    const shop = shoplist.find(shop => shop.num === num);
    useEffect(() => {
        if (shop) {
            setShopInfo(shop);
        }
        console.log(shop);
    }, [shoplist]);

    return (
        <div className="web-container">
            <div className="cd-container bg-white">
                <Header />
                <main className="cd-main dis-center">
                    <section className="shop-main-img-section">
                        {/* 등록된 이미지가 없을때 나와야하는 컴포넌트 */}
                        {/* <div className="input-img-click">
                                이미지를 등록하세요
                            </div> */}
                        <img src={shopInfo.image} alt='' className='shop-title-img'/>

                    </section>

                    <section className="shop-main-section">
                        <div className="shop-title-text">{shopInfo.shopname}</div>
                        <nav className="main-nav">
                            <ul className="main-nav-list">
                                <li className="main-nav-list-text"><Link to="" >홈</Link></li>
                                <li className="main-nav-list-text"><Link to={`/shop/${shopInfo.num}/menu`}>메뉴</Link></li>
                                <li className="main-nav-list-text"><Link to={`/shop/${shopInfo.num}/designer`}>예약하기</Link></li>
                                <li className="main-nav-list-text"><Link to={`/shop/${shopInfo.num}/style`}>스타일</Link></li>
                                <li className="main-nav-list-text"><Link to={`/shop/${shopInfo.num}/review`}>리뷰</Link></li>
                            </ul>
                        </nav>
                        <hr className="divide-line" />

                        <Routes>
                            <Route path="/" element={<ShopMainHome shopInfo={shopInfo} />} />
                            <Route path="menu" element={<ShopMainMenu shopInfo={shopInfo} />} />
                            <Route path="designer" element={<ShopMainDesLIst shopInfo={shopInfo} />} />
                            <Route path="style" element={<ShopMainStyle shopInfo={shopInfo} />} />
                            <Route path="review" element={<ShopMainReview shopInfo={shopInfo} />} />
                            <Route path="reservation/:desnum/*" element={<ShopReservation shopInfo={shopInfo} />} />
                            <Route path='/*' element={<Error404 />} />
                        </Routes>



                    </section>
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default ShopMain;

