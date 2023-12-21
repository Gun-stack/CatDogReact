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
import GalleryRegFormUser from './GalleryRegFormUser';
import DesGalSearch from './DesGalSearch';
import UserGalSearch from './UserGalSearch';
import {url} from'../../config';


function GalleryList() {

    return (
        <div className="web-container">
            <div className="cd-container bg-white">
                <Header />
                <section className="section-header">
                    <div className="section-header-container">
                        <Link to='/gallery'><span className="section-header-text">갤러리</span></Link>
                    </div>
                </section>
                <main className="cd-main">
                    <nav className="main-nav">
                        <ul className="main-nav-list">
                            <li className="main-nav-list-text"><Link to="des">디자이너 갤러리</Link></li>
                            <li className="main-nav-list-text"><Link to="user">회원 갤러리</Link></li>
                        </ul>
                    </nav>
                    <hr className="divide-line" />
                    <Routes >
                        <Route path="/" element={<DesGal />} />
                        <Route path="/des" element={<DesGal />} />
                        <Route path="/des/search/:search" element={<DesGalSearch/>} />
                        <Route path="/des/galleryregform" element={<GalleryRegForm />} />
                        <Route path="/user/galleryregform" element={<GalleryRegFormUser />} />

                        <Route path="/user" element={<UserGal />} />
                        <Route path='user/:usergalnum' element={<UserGalleryView />} />
                        <Route path="/user/search/:search" element={<UserGalSearch/>} />
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