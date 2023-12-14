import React, { useEffect } from 'react';
import Footer from '../screens/Footer';
import Header from '../screens/Header';
import { useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';



function UserGalleryView() {
    const params = useParams();
    const [gallery, setGallery] = useState({});
    const [writer, setWriter] = useState({});

    


    useEffect(() => { 
        console.log(params);
        axios.get(`http://localhost:8090/usergallerydetail?num=${params.usernum}`)
            .then((res) => {
                console.log(res.data);
                setGallery(res.data.userGallery);
                setWriter(res.data.user);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);






    return (
<div>   

                <section className="st-gallery-section">
                    <div className="st-gallery-view">
                        <div className="st-gallery-view-img">
                            <div className="view-gallery-profile-container magin-l-1">
                                <img src={`http://localhost:8090/usergalview/${params.usernum}`} alt="프로필 이미지" className="view-profile-img" />
                                <div className="view-img-nickname">{writer.nickname} </div>
                            </div>

                            <div className="view-img-container">
                                <img src={`http://localhost:8090/usergalview/${params.usernum}`} alt="스타일리스트 사진" className="view-img" />
                            </div>
                            <div className="view-img-icons magin-l-1">
                                <span><i className="fa-regular fa-heart"></i>{gallery.likeCnt} </span>
                               
                                <span><i className="fa-regular fa-comment"></i>{gallery.commentCnt} </span>

                                {/* <div className="view-comment">
                                    <span className="view-comment-nickname">{galComment.galCommentWriter} :</span>
                                    <span className="view-comment-text">{galComment.galCommentText}</span>
                                </div> */}
                                <button className="view-comment-more">덧글 더보기</button>
                            </div>
                        </div>
                    </div>
                    <hr className="divide-line" />
                    {/* 이미지 게시판 요소 끝 */}

                    <div>
                        <button className="main-btn main-sm-btn btn-text">더보기</button>
                    </div>
                </section>

                
        </div>
    );   
}

export default UserGalleryView;