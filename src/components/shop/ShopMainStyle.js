import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import SwalCustomAlert from '../Alerts/SwalCustomAlert';
import { url } from '../../config';


function ShopMainStyle() {
    const shopInfo = useSelector((state) => state.shop);

    const [galleryList, setGalleryList] = useState([]);
    const [offset, setOffset] = useState(0);

    const PlusOffset = () => {
        setOffset(offset + 12);
        console.log(offset);
    }
    const [hasMore, setHasMore] = useState(true);


    const token = useSelector(state => state.token);
    const navigate = useNavigate();



    useEffect(() => {


        // console.log("로그인 후 토큰 값 : " + token);
        axios.get(`${url}/user`, {
            headers: {
                Authorization: token,
            }
        })
            .then(res => {
                console.log("Res : " + res.data);
            })
            .catch(err => {
                // console.log("Err : " + err);
                SwalCustomAlert(
                    'warning',
                    "로그인 이후 사용 가능합니다."
                );
                navigate('/userlogin');
            })


        axios.get(`${url}/desgalleryshop`, {
            params: {
                num: shopInfo.num,
                offset: offset, // 필요한 페이지 번호
                limit: 12, // 페이지당 아이템 개수
            },
        })
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
    }, [offset]);




    return (
        <div>
            <section className="st-gallery-section">
                <div className="st-gallery-grid">
                    {galleryList.map((gallery, index) => (
                        <div className="st-gallery-img" key={index} >
                            <Link to={"/gallery/des/" + gallery.num}><img src={`${url}/desgalview/${gallery.num}`} alt="" className="hover-img" /></Link>
                            <div className="img-comment-hover">
                                <span className="img-hover-icon"><i className="fas fa-heart hover-icon" ></i><span className='hover-text'>{gallery.likeCnt}</span></span>
                            </div>
                        </div>
                    ))}
                </div>
                {hasMore ?
                    <div className="main-btn main-sm-btn" onClick={PlusOffset}><span className="btn-text">더보기</span></div>
                    : <div className="main-btn main-sm-btn"><span className="btn-text">마지막 페이지 입니다.</span></div>
                }

            </section>

        </div>
    );
}

export default ShopMainStyle;