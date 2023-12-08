import React from 'react';
import Header from '../../screens/Header';
import Footer from '../../screens/Footer';


function ShopMainReg() {
    return (
        <div className="web-container">
            <div className="cd-container bg-white">
            <Header />
                <main className="cd-main dis-center">
    
                    <section className="shop-main-img-section">
                        <form action="">
                            <div className="input-img-click">이미지를 올리세요 <i className="fas fa-plus-circle tx-gray"></i></div>
                            <input type="file" accept="image/*" />
                        </form>
                    </section>
    
                    <section className="shop-main-section">
                        <div className="shop-title-text">Shop title</div>
                        <nav className="main-nav">
                            <ul className="main-nav-list">
                                <li className="main-nav-list-text"><a href="shoppagemain.html">홈</a></li>
                                <li className="main-nav-list-text"><a href="shpopagemenu.html">메뉴</a></li>
                                <li className="main-nav-list-text"><a href="shoppagestylelist.html">예약하기</a></li>
                                <li className="main-nav-list-text"><a href="shoppagestyle.html">스타일</a></li>
                                <li className="main-nav-list-text"><a href="shoppagereview.html">리뷰</a></li>
                            </ul>
                        </nav>
                        <hr className="divide-line" />
                        <form action="" className="shop-form-container">
                            <div className="input-img-click sm-input-img">공지사항을 등록하세요<i className="fas fa-plus-circle tx-gray"></i></div>
                        </form>
                        <div className="shop-title-text sm-text">영업시간<i className="fas fa-clock btn-icon"></i></div>
                        <form action="" className="shop-form-container">
                            <div className="input-img-click sm-input-img">영업 시간을 등록하세요<i className="fas fa-plus-circle tx-gray"></i></div>
                        </form>
                        <div className="shop-title-text sm-text">매장위치<i className="fas fa-map-pin btn-icon"></i></div>
                        <div className="shop-address">서울시 금천구 가산 디지털 1로 (호서벤쳐타운) 901호</div>
                        <hr className="divide-line" />
                        <div className="shop-main-icons">
    
                            <div className="main-icon">
                                <i className="fas fa-phone main-icon-style color-nomal"></i>
                                <div><a href="01080116428">전화문의</a></div>
                            </div>
    
                            <div className="main-icon">
                                <i className="fas fa-dog main-icon-style"></i>
                                <div><a href="shoppagestyle.html">스타일 보기</a></div>
                            </div>
    
                            <div className="main-icon">
                                <i className="far fa-calendar-alt main-icon-style color-nomal"></i>
                                <div><a href="shoppagestylelist.html">예약하기</a></div>
                            </div>
                        </div>
                        <hr className="divide-line" />
    
                        <div className="shop-title-text sm-text ma-top2rem">매장정보</div>
                        <form action="" className="shop-form-container">
                            <p className="input-img-click sm-input-img">매장정보를 입력하세요  <i className="fas fa-plus-circle tx-gray"></i></p>
                        </form>
    
                        <div className="shop-title-text sm-text ma-top2rem">스타일</div>
                        <form action="" className="shop-form-container">
                            <div className="input-img-click sm-input-img">등록된 스타일이 없습니다</div>
                        </form>
                    </section>
                </main>
            <Footer/>
            </div>
        </div>
        );
}

export default ShopMainReg;