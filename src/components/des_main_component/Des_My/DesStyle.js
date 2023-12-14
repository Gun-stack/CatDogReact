import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function DesStyle(props) {
    const des = props.desInfo;
    const [galleryList, setGalleryList] = useState([]);
    const [page, setPage] = useState(0);
    const PlusPage = () => {    
        setPage(page+12);
    }
    const [hasMore, setHasMore] = useState(true);


useEffect(() => {
    console.log(des.num);
    console.log(page);
    axios.get('http://localhost:8090/desgallerydesigner', {params: {
    num: des.num,
    offset: page, // 필요한 페이지 번호
    limit: 12, // 페이지당 아이템 개수
    },})
    .then((res) => {
        console.log(res.data);
        setGalleryList([...galleryList, ...res.data]);
        if (res.data.length === 0) {
            setHasMore(false);
        }
    })
    .catch((err) => {
        console.log(err);
    })
}, [page]);
    return (
        <div>
            
<div className="shop-title-text sm-text ma-top2rem">스타일</div>
<section className="st-gallery-section">
    <div className="st-gallery-grid">
        {galleryList.map((gallery, index) => (
        <div className="st-gallery-img" key={index}>

             <Link to={"/gallery/des/"+gallery.num}><img src={`http://localhost:8090/desgalview/${gallery.num}`} alt="" className="hover-img" /></Link>
            <div className="img-comment-hover">
                <span className="img-hover-icon"><i className="fas fa-heart" ></i>{gallery.likeCnt}</span>
            </div>
        </div>
         ))}
    </div >
    {hasMore?
        <div className="main-btn main-sm-btn" onClick={PlusPage}><span className="btn-text">더보기</span></div>
            :<div className="main-btn main-sm-btn"><span className="btn-text">마지막 페이지 입니다.</span></div>
        }
</section >
<hr className="divide-line" />

        </div>
    );
}

export default DesStyle;







