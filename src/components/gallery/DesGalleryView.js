import React, { useEffect } from 'react';

import { useState } from 'react';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import UserGalleryView from './UserGalleryView';



function DesGalleryView() {
    const galNum = useParams();


    // const [galleryList, setGalleryList] = useState([]);
    // const [galCommentList, setGalComment] = useState([]);

    const gallery = {
        galNum: galNum,
        galWriter: '튀김이랑달퐁이랑',
        galImg: '',
        galLike: '20',
        galComment: '1',
        galDate: '2023-01-01'
    }
    const galComment = {
        galCommentNum: '1',
        galNum: '1',
        galCommentWriter: '악플러',
        galCommentText: '외않되',
        galCommentDate: '2023-01-01'
    }

    // useEffect(() => {
    //     axios.get('http://localhost:8080/gallery/des/{galNum}')
    //         .then((res) => {
    //             setGalleryList(res.data);
    //             setGalComment(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }, []);

    return (
        <>
            <section className="st-gallery-section">

                {/* 이미지 게시판 요소  */}
                <hr className="divide-line" />
                <div className="st-gallery-view">
                    <div className="st-gallery-view-img">
                        <div className="view-gallery-profile-container magin-l-1">
                            <img src="./img/gallrey-img/textimg.png" alt="프로필 이미지" className="view-profile-img" />
                            <div className="view-img-nickname">{gallery.galWriter}</div>
                        </div>

                        <div className="view-img-container">
                            <img src="/img/gallrey-img/textimg.png" alt="스타일리스트 사진" className="view-img" />
                        </div>
                        <div className="view-img-icons magin-l-1">
                            <span><i className="fa-regular fa-heart"></i>{gallery.galLike}</span>
                            <span><i className="fa-regular fa-comment"></i>{gallery.galComment}</span>

                            <div className="view-comment">
                                <span className="view-comment-nickname">{galComment.galCommentWriter} :</span>
                                <span className="view-comment-text">{galComment.galCommentText}</span>
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
        </>
    );
}

export default DesGalleryView;