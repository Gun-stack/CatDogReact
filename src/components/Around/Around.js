import { Link, Route, Routes, useLocation } from "react-router-dom";
import Footer from "../screens/Footer";
import Header from "../screens/Header";

import { useEffect, useState } from 'react';
import Popular from './Popular';
import Distance from './Distance';

import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from './useKakaoLoader';
import Swal from "sweetalert2";
import Error404 from "../error/Error404";
import { useDispatch } from "react-redux";



function Around() {
    const dispatch = useDispatch();
    const location = useLocation();
    const isActive = (path) => {
        return location.pathname === path;
    };



    const markerImageSrc = '/img/logo/map_shop_icon.png';
    const markerUserImageSrc = '/img/logo/map_user_icon.png';

    const iconSize = { width: 50, height: 50 };

    //위도경도 불러오는걸 여기다가 집어 넣으면됨
    const shopPositions = [
        { lat: 37.4731841, lng: 126.8843495 },
        { lat: 37.4733758, lng: 126.8854484 },
        { lat: 37.4713567, lng: 126.8850701 },
        { lat: 37.472292, lng: 126.8842626 },
    ]

    //위치동의 하기전에 기본위치
    const [state, setState] = useState({
        center: {
            lat: 33.450701,
            lng: 126.570667,
        },
        errMsg: null,
        isLoading: true,
        isPanto: false,
    })

    function mapClickModal() {
        const shoplist = [
            {
                shopname: '코스타 살롱살롱',
                address: '서울 금천구 가산 디지털 1로 70 호서대 벤쳐 타워',
                image: '',
                num: '1',
                dist: '5m'
            },
            {
                shopname: '코스타2 살롱살롱',
                address: '서울 금천구 가산 디지털 1로 70 호서대 벤쳐 타워',
                image: '',
                num: '2',
                dist: '6m'
            },
        ]
        Swal.fire({
            html: ` <div class="sweet-modal-title">${shoplist[0].shopname}<span class="sweet-modal-sub-text">${shoplist[0].dist}</span>
            </div><span class="sweet-modal-text">${shoplist[0].address}</span><br/>`,
            confirmButtonColor: '#F9950F',
            confirmButtonText: '바로가기',
            showCancelButton: true,
            cancelButtonText: '취소',
        })
    }

    function updateCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setState((prev) => ({
                        ...prev,
                        center: {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                        },
                        isLoading: false,
                        isPanto: true
                    }));
                    dispatch({ type: 'SET_LATITUDE', payload: position.coords.latitude });
                    dispatch({ type: 'SET_LONGITUDE', payload: position.coords.longitude });
                    // console.log(position.coords.latitude);
                    // console.log(position.coords.longitude);
                },
                (err) => {
                    setState((prev) => ({
                        ...prev,
                        errMsg: err.message,
                        isLoading: false,
                    }));
                    Swal.fire(
                        "오류", "위치 정보를 가져올 수 없습니다.", "error");
                }
            );
        } else {
            Swal.fire("오류", "이 브라우저에서는 위치 정보를 사용할 수 없습니다.", "error");
        }
    };

    useEffect(() => {
        updateCurrentLocation()
    }, [])

    useKakaoLoader();

    return (
        <div className="web-container">
            <div className="cd-container bg-white">
                <Header />
                <main className="cd-main dis-center po-re">

                    {/* 맵 API */}
                    <section className="map-section">
                        <div className="map-api">

                            {/* 맵 영역 */}
                            <Map id="map"
                                //좌표
                                center={{ lat: 37.4722558, lng: 126.885940, }}
                                style={{ width: "100%", height: "100%", }} level={3}
                                isPanto={state.isPanto} >

                                {/* 유저마커 */}
                                {!state.isLoading && (
                                    <MapMarker
                                        position={state.center}
                                        image={{
                                            src: markerUserImageSrc,
                                            size: iconSize,
                                        }} />
                                )}

                                {/* 샵 마커 */}
                                {shopPositions.map((position) => (
                                    <MapMarker key={`${position.lat},${position.lng}`}
                                        position={position}
                                        clickable={true}
                                        onClick={() => mapClickModal()}
                                        image={{
                                            src: markerImageSrc,
                                            size: iconSize
                                        }} />))}
                            </Map>

                        </div>
                    </section>

                    {/* 근처 샵 보기 서브 네비 */}
                    <section className="shop-main-section bg-white nearby-container">
                        <nav className="main-nav">
                            <ul className="main-nav-list">

                                {/* 인기순 */}
                                <li className={`main-nav-list-text ${isActive('/') ? 'active' : ''}`}><Link to="">인기순</Link></li>
                                {/* 거리순 */}
                                <li className={`main-nav-list-text ${isActive('distance') ? 'active' : ''}`}><Link to="distance">가까운순</Link></li>
                                {/* 샵등록 */}
                                <li className={`main-nav-list-text ${isActive('/shopreg/1') ? 'active' : ''}`}><Link to="/shopreg/1">샵등록</Link></li>

                            </ul>
                        </nav>
                        {/* 다중 라우터  기본 popular*/}
                        <Routes >
                            <Route path="/" element={<Popular />} />
                            <Route path="distance" element={<Distance />} />
                            <Route path='/*' element={<Error404 />} />
                        </Routes>
                    </section>
                </main>
                <Footer />
            </div>
        </div >
    );
}

export default Around;