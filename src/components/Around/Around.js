import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Footer from "../screens/Footer";
import Header from "../screens/Header";

import { useEffect, useState } from 'react';
import Popular from './Popular';
import Distance from './Distance';

import { Map, MapMarker } from 'react-kakao-maps-sdk';
import useKakaoLoader from './useKakaoLoader';
import Swal from "sweetalert2";
import Error404 from "../error/Error404";
import { useDispatch, useSelector } from "react-redux";

import axios from 'axios';
import SwalCustomAlert from '../Alerts/SwalCustomAlert';




function Around() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const shops = useSelector((state) => state.shopList);

    useEffect(() => {
        axios.get(`http://localhost:8090/shoplistall`)
            .then((res) => {
                dispatch({ type: 'SET_SHOP_LIST', payload: res.data });
            })
    }, []);

    const markerImageSrc = '/img/logo/map_shop_icon.png';
    const markerUserImageSrc = '/img/logo/map_user_icon.png';

    const iconSize = { width: 50, height: 50 };

    const shopPositions = shops.map((shop) => ({
        name: shop.name,
        lat: shop.lat,
        lng: shop.lon,
    }));
    console.log(shopPositions);



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

    const token = useSelector(state => state.token);
    const navigate = useNavigate();
    useEffect(() => {
        
        // console.log("로그인 후 토큰 값 : " + token);
        axios.get('http://localhost:8090/user', {
            headers: {
                Authorization: token,
            }
        })
            .then(res => {
                console.log("Res : " + res.data);
            })
            .catch(err => {
                // console.log("Err : " + err);
                SwalCustomAlert(
                    'warning', 
                    "로그인 이후 사용 가능합니다."
                    );
                    navigate('/userlogin');
            })
    }, [])


    function mapClickModal() {
        console.log(shopPositions);
        Swal.fire({
            html: ` <div class="sweet-modal-title">${shopPositions[0].name}<span class="sweet-modal-sub-text">${shopPositions[0].dist}</span>
            </div><span class="sweet-modal-text">${shopPositions.address}</span><br/>`,
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
                                <li className='main-nav-list-text'><Link to="">인기순</Link></li>
                                {/* 거리순 */}
                                <li className='main-nav-list-text'><Link to="distance">가까운순</Link></li>
                                {/* 샵등록 */}
                                {user.roles === 'ROLE_DES' || user.roles === 'ROLE_SHOP' &&
                                <li className='main-nav-list-text'><Link to="/usermy/shopreg">샵등록</Link></li>
                                }

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