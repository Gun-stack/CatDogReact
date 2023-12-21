import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Footer from "../screens/Footer";
import Header from "../screens/Header";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import SwalCustomAlert from '../Alerts/SwalCustomAlert';
import { url } from '../../config';

function Main() {
    const token = useSelector(state => state.token);
    const navigate = useNavigate();
    useEffect(() => {
        // console.log("로그인 후 토큰 값 : " + token);
        axios.get(`${url}/user`, {
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

        console.log("로그인 후 토큰 값 : " + token);


    }, [])

    return (
        <>
            <div className="web-container">
                <div className="cd-container bg-white">
                    <Header />

                    <main className="cd-main">

                        <section className="client-main-section">
                            <div className="photo-back">
                                <div className="photo-back-content">
                                    <p className="photo-back-text">
                                        반려동물과<br />
                                        보호자와<br />
                                        스타일리스트가<br />
                                        모두행복한
                                    </p>
                                    <div className="client-main-logo">
                                        <img src="/img/logo/logo_color.png" alt="고객 메인 로고" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="client-main-btn-section">
                            {/* 근처 샵 찾기 */}
                            <Link to="/around" className="main-btn-component main-btn">
                                <div className="main-btn-text">
                                    <h3 className="main-btn-text-title">근처 샵 찾아보기</h3>
                                    <p>근처의 샵을 찾아보세요</p>
                                </div>
                                <i className="fa-solid fa-map"></i>
                            </Link>

                            {/* 갤러리 구경하기 */}
                            <Link to="/gallery" className="main-btn-component main-btn">
                                <div className="main-btn-text">
                                    <h3 className="main-btn-text-title">갤러리 구경하기</h3>
                                    <p>디자이너 들 의 멋진 사진보기</p>
                                </div>
                                <i className="fas fa-camera-retro"></i>
                            </Link>

                            {/* 갤러리 구경하기 */}
                            <Link to="/gallery" className="main-btn-component main-btn">
                                <div className="main-btn-text">
                                    <h3 className="main-btn-text-title">디자이너 만나보기</h3>
                                    <p>댕냥꽁냥의 디자이너를 만나보세요!</p>
                                </div>
                                <i className="fas fa-user-friends"></i>
                            </Link>

                            {/* 내 정보 확인하고 수정하기 */}

                            <Link className="main-btn-component main-btn" to="/usermy/petregform">
                                {/* <div className="main-btn-component main-btn"> */}
                                <div className="main-btn-text">
                                    <h3 className="main-btn-text-title">반려동물 등록하기</h3>
                                    <p>내정보 확인하고 수정하기</p>
                                </div>
                                <i className="fas fa-paw"></i>
                                {/* </div> */}
                            </Link>

                            {/* 예약 확인 하기 */}
                            <Link to="/usermy/reservation" className="main-btn-component main-btn">
                                <div className="main-btn-text">
                                    <h3 className="main-btn-text-title">예약확인 하기</h3>
                                    <p>예약했다면 예약확인은 필수!</p>
                                </div>
                                <i className="fas fa-clipboard-list"></i>
                            </Link>

                            {/* 마이 페이지 */}
                            <Link to="/usermy" className="main-btn-component main-btn">
                                <div className="main-btn-text">
                                    <h3 className="main-btn-text-title">마이 페이지</h3>
                                    <p>정보를 수정해요</p>
                                </div>
                                <i className="fas fa-user"></i>
                            </Link>
                        </section>
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default Main;