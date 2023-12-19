import React, { useEffect } from 'react';

import { useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';




function DesGalleryView() {
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [like, setLike] = useState();
    function goBack(e) {
        e.preventDefault();
        navigate(-1);
    }

    const likeClick = () => {
        const fomrData = new FormData();
        fomrData.append("galNum", gallery.num);
        fomrData.append("userNum", user.num);

        axios.post('http://localhost:8090/desgallerylike', fomrData)
            .then((res) => {
                console.log(res.data);
                setLike(res.data);
            }
            )
            .catch((err) => {
                console.log(err);
            })

            
           

    }



    const dispatch = useDispatch();
    const galNum = useParams();

    
    const [gallery, setGallery] = useState({});
    const [desInfo, setDesInfo] = useState({});


    useEffect(() => { 
        axios.get(`http://localhost:8090/desgallerydetail?galnum=${galNum.desgalnum}&usernum=${user.num}`)
            .then((res) => {
                console.log(res.data);
                setGallery(res.data.desGallery);
                setDesInfo(res.data.designer);
                setLike(res.data.isLike);    
                                

            })
            .catch((err) => {
                console.log(err);
            })
    }, [like]);

    return (
        <>
            <section className="st-gallery-section">

                <div className="st-gallery-view">
                    <div className="st-gallery-view-img">
                        <Link to={`/des/${desInfo.num}/home`}>
                        <div className="view-gallery-profile-container magin-l-1">
                            {desInfo.num &&
                            <img src={`http://localhost:8090/desimg/${desInfo.num}`} alt="프로필 이미지" className="view-profile-img" />
                            }

                            <div className="view-img-nickname">{desInfo.position}  {desInfo.desNickname}</div>
                        </div>
                        </Link>

                        <div className="view-img-container">
                            <img src={`http://localhost:8090/desgalview/${galNum.desgalnum}`} alt="스타일리스트 사진" className="view-img" />
                        </div>
                        <div className="view-img-icons magin-l-1">

                            <span onClick={likeClick} >{ like === true ? <i className="fa-solid fa-heart hover-icon"></i> :<i className="fa-regular fa-heart hover-icon"></i> } {gallery.likeCnt}</span>
                            {/* <span><i className="fa-regular fa-comment"></i>{gallery.galComment}</span> */}

                            <div className="view-comment">
                                    {gallery.content}
                            </div>
                            {/* <button className="view-comment-more">덧글 더보기</button> */}
                        </div>
                    </div>
                </div>
                <hr className="divide-line" />
                {/* 이미지 게시판 요소 끝 */}

                <div>
                    <button className="main-btn main-sm-btn btn-text" onClick={goBack}>목록보기</button>
                </div>
            </section>
        </>
    );
}

export default DesGalleryView;