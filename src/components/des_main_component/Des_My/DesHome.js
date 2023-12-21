import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { url } from '../../../config';

function DesHome() {
    const shopInfo = useSelector((state) => state.shop);

    const [images, setImages] = useState([]);



    // 스타일 리스트
    const [galleryList, setGalleryList] = useState([
    ]);

    useEffect(() => {
        axios.get(`${url}/desgalleryshop`, {
            params: {
                num: shopInfo.num,
                offset: 0, // 필요한 페이지 번호
                limit: 6, // 페이지당 아이템 개수
            },
        })
            .then((res) => {
                console.log(res.data);
                setGalleryList([...res.data]);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);


    return (
        <>


            {galleryList.length > 0 ?
                <>
                    <div className="shop-title-text sm-text ma-top2rem">스타일</div>

                    <div className="st-gallery-section">
                        <div className="st-gallery-grid">
                            {galleryList.map((gallery, index) => (
                                <div className="st-gallery-img" key={index} >
                                    <Link to={"/gallery/des/" + gallery.num}><img src={`${url}/desgalview/${gallery.num}`} alt="" className="hover-img" /></Link>
                                    <div className="img-comment-hover">
                                        <span className="img-hover-icon">
                                            <i className="fas fa-heart hover-icon" ></i>
                                            <span className='hover-text'>{gallery.likeCnt}</span>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
                :
                <div className="st-gallery-section">
                    <div className="input-img-click sm-input-img">등록된 스타일이 없습니다</div>
                </div>

            }
            <hr className="divide-line" />

        </>
    );


}

export default DesHome;