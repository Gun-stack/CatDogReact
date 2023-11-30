import React from 'react';
import Header from '../screens/Header';
import Footer from '../screens/Footer';
import { useState,useEffect } from 'react';
// import axios from 'axios';
import { Link, Route,Routes } from 'react-router-dom';
import DesGal from './DesGal';
import UserGal from './UserGal';


function GalleryList() {
    const [galleryList, setGalleryList] = useState([]);
    const [gallery, setGallery] = useState({
        galNum: '1',
        galWriter: '',
        galImg: '',
        galLike: '3',
        galComment: '3',
        galDate: ''
    });
    
return (
        <div className="web-container">
            <div className="cd-container bg-white">
                <Header/>
                <section className="section-header">
                    <div className="section-header-container">
                        <span className="section-header-text">갤러리</span>
                    </div>
                </section>
                <main className="cd-main">
                    <nav className="main-nav">
                        <ul className="main-nav-list">
                            <li className="main-nav-list-text"><Link to="">스타일리스트 갤러리</Link></li>
                            <li className="main-nav-list-text"><Link to="user">회원 갤러리</Link></li>
                        </ul>
                    </nav>
                    <Routes >
                        <Route path="/" element={<DesGal/>} />
                        <Route path="user" element={<UserGal/>} />
                    </Routes>



                    <section className="st-gallery-section">
                        <div className="st-gallery-grid">
                            {/* 이미지 게시판 요소 */}
                            <div className="st-gallery-img">
                                <Link to={"/galleryview/"+gallery.galNum}><img src="/img/gallrey-img/textimg.png" alt="" className="hover-img" /></Link>
                                <div className="img-comment-hover">
                                    <span className="img-hover-icon"><i className="fas fa-heart" ></i>{gallery.galLike}</span>
                                    <span className="img-hover-icon"><i className="fas fa-comment"></i>{gallery.galComment}</span>
                                </div>
                            </div>
                            
                            {/* 이미지 게시판 요소 끝 */}
                            {/* 이미지 게시판 요소 */}
                            <div className="st-gallery-img">
                                <a href="cl-galleryview.html"><img src="/img/gallrey-img/textimg.png" alt="" className="hover-img" /></a>
                                <div className="img-comment-hover">
                                    <span className="img-hover-icon"><i className="fas fa-heart"></i>하트</span>
                                    <span className="img-hover-icon"><i className="fas fa-comment"></i>하트</span>
                                </div>
                            </div>
                            {/* 이미지 게시판 요소 끝 */}
                            {/* 이미지 게시판 요소 */}
                            <div className="st-gallery-img">
                                <a href="cl-galleryview.html"><img src="/img/gallrey-img/textimg.png" alt="" className="hover-img" /></a>
                                <div className="img-comment-hover">
                                    <span className="img-hover-icon"><i className="fas fa-heart"></i>하트</span>
                                    <span className="img-hover-icon"><i className="fas fa-comment"></i>하트</span>
                                </div>
                            </div>
                            {/* 이미지 게시판 요소 끝 */}
                            {/* 이미지 게시판 요소 */}
                            <div className="st-gallery-img">
                                <a href="cl-galleryview.html"><img src="/img/gallrey-img/textimg.png" alt="" className="hover-img" /></a>
                                <div className="img-comment-hover">
                                    <span className="img-hover-icon"><i className="fas fa-heart"></i>하트</span>
                                    <span className="img-hover-icon"><i className="fas fa-comment"></i>하트</span>
                                </div>
                            </div>
                            {/* 이미지 게시판 요소 끝 */}
                            {/* 이미지 게시판 요소 */}
                            <div className="st-gallery-img">
                                <a href="cl-galleryview.html"><img src="/img/gallrey-img/textimg.png" alt="" className="hover-img" /></a>
                                <div className="img-comment-hover">
                                    <span className="img-hover-icon"><i className="fas fa-heart"></i>하트</span>
                                    <span className="img-hover-icon"><i className="fas fa-comment"></i>하트</span>
                                </div>
                            </div>
                            {/* 이미지 게시판 요소 끝 */}
                            {/* 이미지 게시판 요소 */}
                            <div className="st-gallery-img">
                                <a href="cl-galleryview.html"><img src="/img/gallrey-img/textimg.png" alt="" className="hover-img" /></a>
                                <div className="img-comment-hover">
                                    <span className="img-hover-icon"><i className="fas fa-heart"></i>하트</span>
                                    <span className="img-hover-icon"><i className="fas fa-comment"></i>하트</span>
                                </div>
                            </div>
                            {/* 이미지 게시판 요소 끝 */}
                            {/* 이미지 게시판 요소 */}
                            <div className="st-gallery-img">
                                <a href="cl-galleryview.html"><img src="/img/gallrey-img/textimg.png" alt="" className="hover-img" /></a>
                                <div className="img-comment-hover">
                                    <span className="img-hover-icon"><i className="fas fa-heart"></i>하트</span>
                                    <span className="img-hover-icon"><i className="fas fa-comment"></i>하트</span>
                                </div>
                            </div>
                            {/* 이미지 게시판 요소 끝 */}
                            {/* 이미지 게시판 요소 */}
                            <div className="st-gallery-img">
                                <a href="cl-galleryview.html"><img src="/img/gallrey-img/textimg.png" alt="" className="hover-img" /></a>
                                <div className="img-comment-hover">
                                    <span className="img-hover-icon"><i className="fas fa-heart"></i>하트</span>
                                    <span className="img-hover-icon"><i className="fas fa-comment"></i>하트</span>
                                </div>
                            </div>
                            {/* 이미지 게시판 요소 끝 */}
                            {/* 이미지 게시판 요소 */}
                            <div className="st-gallery-img">
                                <a href="cl-galleryview.html"><img src="/img/gallrey-img/textimg.png" alt="" className="hover-img" /></a>
                                <div className="img-comment-hover">
                                    <span className="img-hover-icon"><i className="fas fa-heart"></i>하트</span>
                                    <span className="img-hover-icon"><i className="fas fa-comment"></i>하트</span>
                                </div>
                            </div>
                            {/* 이미지 게시판 요소 끝 */}
                        </div>
                        <div className="main-btn main-sm-btn"><span className="btn-text">더보기</span></div>
                    </section>



                </main>
            <Footer/>
            </div>
        </div>
    );
}

export default GalleryList;