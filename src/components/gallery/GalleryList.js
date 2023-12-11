import React from 'react';
import Header from '../screens/Header';
import Footer from '../screens/Footer';
import { useState, useEffect } from 'react';
// import axios from 'axios';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import DesGal from './DesGal';
import UserGal from './UserGal';
import DesGalleryView from './DesGalleryView';
import UserGalleryView from './UserGalleryView';
import Error404 from '../error/Error404';
import GalleryRegForm from './GalleryRegForm';



function GalleryList() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

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
                <Header />
                <section className="section-header">
                    <div className="section-header-container">
                        <span className="section-header-text">갤러리</span>
                    </div>
                </section>
                <main className="cd-main">
                    <nav className="main-nav">
                        <ul className="main-nav-list">
                            <li className={`main-nav-list-text ${isActive('des') ? 'active' : ''}`}><Link to="des">스타일리스트 갤러리</Link></li>
                            <li className={`main-nav-list-text ${isActive('user') ? 'active' : ''}`}><Link to="user">회원 갤러리</Link></li>
                        </ul>
                    </nav>
                    <Routes >
                        <Route path="/" element={<DesGal />} />
                        <Route path="/des" element={<DesGal />} />
                        <Route path="/des/galleryregform" element={<GalleryRegForm />} />

                        <Route path="/user" element={<UserGal />} />
                        <Route path='user/:usernum' element={<UserGalleryView />} />
                        <Route path='des/:desgalnum' element={<DesGalleryView />} />
                        <Route path='/*' element={<Error404 />} />
                    </Routes>

                </main>
                <Footer />
            </div>
        </div>
    );
}

export default GalleryList;