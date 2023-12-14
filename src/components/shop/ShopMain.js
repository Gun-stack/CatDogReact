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


function ShopMain() {
    const dispatch = useDispatch();
    const location = useLocation();
    const isActive = (path) => {
        return location.pathname === path;
    };
    const  params  = useParams();
    

    const shopInfo = useSelector((state) => state.shop);
    

    useEffect(() => {
        axios.get(`http://localhost:8090/shopinfobynum?num=${params.shopnum}`)
        .then((res) => {
            dispatch({type:'SET_SHOP',payload:res.data});
        })
    }, []);

    

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
                        <img src={`http://localhost:8090/shopimg/${shopInfo.bgImg}`} alt='' className='shop-title-img'/>

                    </section>

                    <section className="shop-main-section">
                        <div className="shop-title-text">{shopInfo.name}</div> 
                        <nav className="main-nav">
                            <ul className="main-nav-list">
                                <li className={`main-nav-list-text ${isActive('/') ? 'active' : ''}`}><Link to="" >홈</Link></li>
                                <li className={`main-nav-list-text ${isActive `/shop/${shopInfo.num}/menu` ? 'active' : ''}`}><Link to={`/shop/${shopInfo.num}/menu`}>메뉴</Link></li>
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
        </div>
    );
}

export default ShopMain;

