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
    const [shopInfo, setShopInfo] = useState({});
    const [date, setDate] = useState('');


    
    // 날짜 포맷팅
    
    const formatDate = (originalDateString) => {
        const dateObject = new Date(originalDateString);
        const date = new Intl.DateTimeFormat('ko-KR', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false, 
        }).format(dateObject);
        setDate(date);
}





    
    const [tags, setTags] = useState([]);

    const parseTags = (str) => {
        const tags = str.split(',').map((tag) => tag.trim());
        setTags(tags);
    };

    const tagClickHandler = (tag) => {
        navigate(`/gallery/des/search/${tag}`);
    };


    useEffect(() => { 
        axios.get(`http://localhost:8090/desgallerydetail?galnum=${galNum.desgalnum}&usernum=${user.num}`)
            .then((res) => {
                console.log(res.data);
                setGallery(res.data.desGallery);
                setDesInfo(res.data.designer);
                setLike(res.data.isLike);    
                setShopInfo(res.data.shop);

                parseTags(gallery.tag);

                formatDate(gallery.date);


                console.log(tags);
                

                                

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
                            <div className="view-img-nickname">{desInfo.position} {desInfo.desNickname}</div>
                            <div className="view-comment">{shopInfo.name}</div>
                            <div className="view-comment">({date})</div>
                        </div>
                        </Link>
                        {shopInfo && 
                        <Link to={`/des/${desInfo.num}/reservation`}>
                                    <button className="st-button">예약하기<i className="far fa-calendar-alt btn-icon"></i></button>
                        </Link>
                        }
                        
                        <div className="view-img-container">
                            <img src={`http://localhost:8090/desgalview/${galNum.desgalnum}`} onDoubleClick={likeClick} alt="스타일리스트 사진" className="view-img" />

                        </div>

                        <div className="view-img-icons magin-l-1">

                            <span onClick={likeClick} >{ like === true ? <i className="fa-solid fa-heart hover-icon"></i> :<i className="fa-regular fa-heart hover-icon"></i> } {gallery.likeCnt}</span>
                            {/* <span><i className="fa-regular fa-comment"></i>{gallery.galComment}</span> */}
                            



                            <div className="view-comment">
                                    {gallery.content}
                            </div>

                            <div className="tag">
                            
                            {tags && tags.map((tag, index) => (
                                <span key={index} className="tag" onClick={() => tagClickHandler(tag)}>
                                    <span >#{tag} {' '}</span>
                                </span>
                            ))}

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