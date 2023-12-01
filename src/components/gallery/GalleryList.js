import React from 'react';
import Header from '../screens/Header';
import Footer from '../screens/Footer';
import { useState,useEffect } from 'react';
// import axios from 'axios';
import { Link, Route,Routes } from 'react-router-dom';
import DesGal from './DesGal';
import UserGal from './UserGal';
import DesGalleryView from './DesGalleryView';
import UserGalleryView from './UserGalleryView';



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
                            <li className="main-nav-list-text"><Link to="des">스타일리스트 갤러리</Link></li>
                            <li className="main-nav-list-text"><Link to="user">회원 갤러리</Link></li>
                        </ul>
                    </nav>
                    <Routes >
                    <Route path="/des" element={<DesGal />} />
                    <Route path="/" element={<DesGal />} />
                    <Route path="/user" element={<UserGal />} />
                    <Route path='user/:usernum' element={<UserGalleryView/>}/>
                    <Route path='des/:desgalnum' element={<DesGalleryView/>}/>
                    </Routes>

                </main>
            <Footer/>
            </div>
        </div>
    );
}

export default GalleryList;