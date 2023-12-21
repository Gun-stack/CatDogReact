import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import SwalCustomAlert from '../Alerts/SwalCustomAlert';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {url} from'../../config';



function UserGalSearch() {
    const [galleryList, setGalleryList] = useState([
    ]);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState('');
    const [search2, setSearch2] = useState('');
    const token = useSelector(state => state.token);
    const navigate = useNavigate();
    const [hasMore, setHasMore] = useState(true);
    const params = useParams();
    const PlusPage = () => {
        setPage(page + 1);
        console.log(page);
    }
    const[preSearch,setPreSearch]=useState('');

    
    const onChangeSearch = (e) => {
        setPreSearch(e.target.value);
    }   

    const searchHandler = (e) => {
        if(e.key ==='Enter')
        {searchGallery();}
    }

    const searchGallery = () => {
        setSearch2(preSearch);
    if(search2){
        axios.get(`${url}/usergallerysearch`, {
            params: {
                search: search2,
                page: 0,
                size: 12,
            }
        })
        .then((res) => {
            setGalleryList([...res.data.content]);
            if (res.data.content.length === 0) {
                setHasMore(false);
            }
        })
        .catch((err) => console.log(err))
    }
}



    useEffect(() => {
        setSearch(params.search);
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
        if(search){
         axios.get(`${url}/usergallerysearch`, {
            params: {
                search: search,
                page: 0,
                size: 12,
            }
        })
        .then((res) => {
            setGalleryList([...res.data.content]);
            if (res.data.content.length === 0) {
                setHasMore(false);
            }
        })
        .catch((err) => console.log(err))        
    }
    }, [page,search]);



    return (
        <section className="st-gallery-section">

            <div className="search-box">
                <input type="text" onChange={onChangeSearch} className="input-text search-txt" defaultValue={search} placeholder="태그로 검색을 해보자" onKeyPress={searchHandler} />
                <button className="search-btn" onClick={searchGallery}>
                <i className="fas fa-search tx-orange"></i>
                </button>
                <Link to='/gallery/user/galleryregform'> <button className='info-input-btn'>사진 올리기</button></Link>
            </div>

            {search  &&
            <div className="st-gallery-grid">
                {galleryList.map((gallery, index) => (
                    <div className="st-gallery-img" key={index} >
                        <Link to={"/gallery/user/" + gallery.num}><img src={`${url}/usergalview/${gallery.num}`} alt="" className="hover-img" /></Link>
                        <div className="img-comment-hover left020">
                            <span className="img-hover-icon">
                                <i className="fas fa-heart hover-icon" ></i><span className='hover-text'>{gallery.likeCnt}</span>
                                <i className="fas fa-comment hover-icon-comm"></i><span className='hover-text'>{gallery.commentCnt}</span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            }
            {hasMore ?
                <div className="main-btn main-sm-btn" onClick={PlusPage}><span className="btn-text">더보기</span></div>
                : <div className="main-btn main-sm-btn"><span className="btn-text">마지막 페이지 입니다.</span></div>
            }


        </section>
    );
}

export default UserGalSearch;