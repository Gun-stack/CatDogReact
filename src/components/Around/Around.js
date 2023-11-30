import { Link, Route, Routes } from "react-router-dom";
import Footer from "../screens/Footer";
import Header from "../screens/Header";

import { Map } from 'react-kakao-maps-sdk';
import { useEffect } from 'react';
import Popular from './Popular';
import Distance from './Distance';
import useKakaoLoader from './useKakaoLoader';


function Around() {

    useKakaoLoader();
    return (
        <div className="web-container">
            <div className="cd-container bg-white">
                <Header />
                <main className="cd-main dis-center po-re">
                    {/* 맵 API */}
                    <section className="map-section">
                        <div className="map-api">
                            
                            <Map  id="map" 
                            //좌표 !!
                            center={{ lat: 37.4722558,lng: 126.885940,}} 
                            style={{ width: "100%",  height: "100%",}}  level={3}/>

                        </div>
                    </section>

                    {/* 근처 샵 보기 서브 네비 */}
                    <section className="shop-main-section bg-white nearby-container">
                        <nav className="main-nav">
                            <ul className="main-nav-list">
                                {/* 인기순 */}
                                <li className="main-nav-list-text"><Link to="">인기순</Link></li>
                                {/* 거리순 */}

                                <li className="main-nav-list-text"><Link to="distance">가까운순</Link></li>
                            </ul>
                        </nav>
                    {/* 다중 라우터  기본 popular*/}
                    <Routes >
                        <Route path="/" element={<Popular/>}/>
                        <Route path="distance" element={<Distance/>}/>
                    </Routes>
                    </section>
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default Around;