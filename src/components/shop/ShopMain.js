import React, { useEffect} from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
// import axios from 'axios';
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


function ShopMain() {

    const num = useParams();
    const [shopInfo, setShopInfo] = useState({
        num: num.shopnum,
        image: '/img/gallrey-img/5.jpg',
        shopname: '코스타리카 망하샵',
        sId: 1,
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


    const [image, setImage] = useState(null);
    const maxWidth = 1024; // 최대 너비 설정
    const maxHeight = 768; // 최대 높이 설정

    const showImageUploadModal = async() => {
        const result = await Swal.fire({
            title: '타이틀 업로드',
            text: '이미지 높이는 500px을 넘길수 없습니다',
            input: 'file',
            inputAttributes: {
                accept: 'image/*'
            },
            showCancelButton: true,
            confirmButtonText: '업로드',
            cancelButtonText: '취소',
            preConfirm: (file) => {
                return new Promise((resolve, reject) => {
                    if (!file) {
                        reject(new Error('파일을 선택해주세요.'));
                        return;
                    }

                    const img = new Image();
                    img.onload = () => {
                        if (img.width > maxWidth || img.height > maxHeight) {
                            reject(new Error('이미지 크기가 너무 큽니다.'));
                        } else {
                            resolve();
                        }
                    };
                    img.onerror = () => reject(new Error('이미지를 불러올 수 없습니다.'));
                    img.src = URL.createObjectURL(file);
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('업로드 완료!', '이미지가 성공적으로 업로드되었습니다.', 'success');
            }
        }).catch(error => {
            Swal.showValidationMessage(error.message);
        });
    };


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
                        <div className="gradient-overlay">
                            <img src={shopInfo.image} alt='샵 이미지' className='shop-title-img' />
                        </div>
                    </section>

                    <section className="shop-main-section nearby-container">
                        <div className="shop-title-text">{shopInfo.shopname}</div>
                        <button className='info-input-btn' onClick={showImageUploadModal}>매장그림 올리기<i class="far fa-plus-square"></i></button>
                        <nav className="main-nav">
                            <ul className="main-nav-list">
                                <li className="main-nav-list-text"><Link to="" >홈</Link></li>
                                <li className="main-nav-list-text"><Link to={`/shop/${shopInfo.num}/designer`}>예약하기</Link></li>
                                <li className="main-nav-list-text"><Link to={`/shop/${shopInfo.num}/style`}>스타일</Link></li>
                                <li className="main-nav-list-text"><Link to={`/shop/${shopInfo.num}/menu`}>메뉴</Link></li>
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

