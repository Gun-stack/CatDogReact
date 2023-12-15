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
    const [comment, setComment] = useState('');
    const user = useSelector((state) => state.user);
    const formData = new FormData();

    // const onClickComment = () => {
    //     //컨텐트 , 커멘트임
    //     formData.append("content", comment);
    //     formData.append("userId", user.id);
    //     formData.append("galleryNum", user.usergalnum);
    //     axios.post(`http://localhost:8090/usergallerycomment?num=${params.usergalnum}`, )
    //         .then((res) => {
    //             console.log(res.data);
    //             setGallery(res.data.userGallery);
    //             setWriter(res.data.user);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }


    const onChageComment = (e) => {
        setComment(e.target.value);
        console.log(comment);
    }



    useEffect(() => { 
        console.log(params);
        axios.get(`http://localhost:8090/usergallerydetail?num=${params.usergalnum}`)
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
                                <img src={`http://localhost:8090/usergalview/${params.usergalnum}`} alt="프로필 이미지" className="view-profile-img" />
                                <div className="view-img-nickname">{writer.nickname} </div>
                            </div>

                            <div className="view-img-container">
                                <img src={`http://localhost:8090/usergalview/${params.usergalnum}`} alt="스타일리스트 사진" className="view-img" />
                            </div>
                            <div className="view-img-icons magin-l-1">
                                <span><i className="fa-regular fa-heart"></i>{gallery.likeCnt} </span>
                               
                                <span><i className="fa-regular fa-comment"></i>{gallery.commentCnt} </span>

                                <div className="view-comment">
                                    <span className="view-comment-nickname">닉네임</span>
                                    <span className="view-comment-text"> 댓글 댓글 하나둘셋넨 다섯</span>
                                </div> 
                                
                                <div>
                                <input type='text' onChange={onChageComment}/>
                                <button >댓글 달기</button>
                                </div>
                                

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