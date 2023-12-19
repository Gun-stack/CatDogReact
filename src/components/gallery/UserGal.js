import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';



function UserGal() {
    const [galleryList, setGalleryList] = useState([
    ]);
    const [page, setPage] = useState(0);

    const PlusPage = () => {
        setPage(page + 1);
        console.log(page);
    }
    const [hasMore, setHasMore] = useState(true);


    useEffect(() => {
        axios.get('http://localhost:8090/usergallery', {
            params: {
                page: page, // 필요한 페이지 번호
                size: 12, // 페이지당 아이템 개수
            },
        })
            .then((res) => {
                console.log(res.data.content);
                setGalleryList([...galleryList, ...res.data.content]);

                if (res.data.content.length == 0) {
                    setHasMore(false);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [page]);



    return (
        <section className="st-gallery-section">
            <Link to='/gallery/user/galleryregform'> <button className='info-input-btn'>사진 올리기</button></Link>
            <div className="st-gallery-grid">
                {galleryList.map((gallery, index) => (
                    <div className="st-gallery-img" key={index} >
                        <Link to={"/gallery/user/" + gallery.num}><img src={`http://localhost:8090/usergalview/${gallery.num}`} alt="" className="hover-img" /></Link>
                        <div className="img-comment-hover left020">
                            <span className="img-hover-icon">
                                <i className="fas fa-heart hover-icon" ></i><span className='hover-text'>{gallery.likeCnt}</span>
                                <i className="fas fa-comment hover-icon-comm"></i><span className='hover-text'>{gallery.commentCnt}</span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            {hasMore ?
                <div className="main-btn main-sm-btn" onClick={PlusPage}><span className="btn-text">더보기</span></div>
                : <div className="main-btn main-sm-btn"><span className="btn-text">마지막 페이지 입니다.</span></div>
            }


        </section>
    );
}

export default UserGal;