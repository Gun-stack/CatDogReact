import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SwalCustomAlert from '../Alerts/SwalCustomAlert';
import {url} from '../../config'



const PAGE_SIZE = 12;

function GalleryItem({ gallery }) {
    return (
        <div className="st-gallery-img">
            <Link to={`/gallery/des/${gallery.num}`}>
                <img src={`${url}/desgalview/${gallery.num}`} alt="" className="hover-img" />
            </Link>
            <div className="img-comment-hover">
                <span className="img-hover-icon">
                    <i className="fas fa-heart hover-icon"></i>
                    <span className='hover-text'>{gallery.likeCnt}</span>
                </span>
            </div>
        </div>
    );
}

function DesGal() {
    const [galleryList, setGalleryList] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const user = useSelector((state) => state.user);
    const token = useSelector(state => state.token);
    const navigate = useNavigate();
    
    const searchHandler = (e) => {
        if(e.key ==='Enter')
        {searchGallery();}
    }


    const searchGallery = () => {
            axios.get(`${url}/desgallerysearch`, {
                params: {
                    search: search,
                    page: 0,
                    size: 12,
                }
            })
            .then((res) => {
                searchResults.length = 0;
                setGalleryList([...res.data.content]);
                if (res.data.content.length === 0) {
                    setHasMore(false);
                }
            })
            .catch((err) => console.log(err))
    }

    const PlusPage = () => {
        setPage(page + 1);
    }
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const initialGet = () => {
        axios.get('http://localhost:8090/desgallery', {
            params: { page, size: PAGE_SIZE }
        })
        .then((res) => {
            setGalleryList(prevList => [...prevList, ...res.data.content]);
            if (res.data.content.length === 0) {
                setHasMore(false);
            }
        })
        .catch((err) => console.log(err));
    }


    useEffect(() => {
        axios.get('http://localhost:8090/user', {
            headers: { Authorization: token }
        })
        .then(res => console.log("Res: " + JSON.stringify(res.data)))
        .catch(err => {
            SwalCustomAlert(
                'warning',
                '로그인 이후 사용 가능합니다.'
            );
            navigate('/userlogin');
        });
            initialGet();
    }, [page]);


    return (
        <section className="st-gallery-section">
            <div className="search-box">
                <input type="text" onChange={onChangeSearch} className="input-text search-txt " placeholder="태그로 검색을 해보자" onKeyDown={searchHandler} />
                <button className="search-btn" onClick={searchGallery}>
                <i className="fas fa-search tx-orange"></i>
                </button>
                {user.roles === 'ROLE_DES' || user.roles === 'ROLE_SHOP' &&
                    <Link to='/gallery/des/galleryregform'> <button className='info-input-btn'>사진 올리기</button></Link>
                }
            </div>
                
            <div className="st-gallery-grid">
                {galleryList && galleryList.map((gallery, index) => (
                    <GalleryItem key={index} gallery={gallery} />
                ))}
            </div>

            {hasMore ? (
                <div className="main-btn main-sm-btn" onClick={PlusPage}>
                    <span className="btn-text">더보기</span>
                </div>
            ) : (
                <div className="main-btn main-sm-btn">
                    <span className="btn-text">마지막 페이지 입니다.</span>
                </div>
            )}
        </section>
    );
}


export default DesGal;