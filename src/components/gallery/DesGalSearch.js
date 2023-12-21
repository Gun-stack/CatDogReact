import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {url} from'../../config';



function DesGalSearch() {
    const [galleryList, setGalleryList] = useState([
    ]);
    const [page, setPage] = useState(0);
    const user = useSelector((state) => state.user);

    const PlusPage = () => {
        setPage(page + 1);
        console.log(page);
    }
    const [hasMore, setHasMore] = useState(true);
    const[search,setSearch]=useState('');
    const[search2,setSearch2]=useState('');

    const[preSearch,setPreSearch]=useState('');

    
    const onChangeSearch=(e)=>{
        setPreSearch(e.target.value);
    }
    const params =useParams();

    const searchHandler = (e) => {
        if(e.key === 'Enter')
        {
            searchGallery();
        }
    }
    
    const searchGallery = () => {
        setSearch2(preSearch);
        if(search2){
        axios.get(`${url}/desgallerysearch`, {
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

        if(search){
        axios.get(`${url}/desgallerysearch`, {
            params: {
                page: page, // 필요한 페이지 번호
                size: 12, // 페이지당 아이템 개수
                search : search
            },
        })
            .then((res) => {
                console.log(res.data.content);
                setGalleryList([...res.data.content]);
                if (res.data.content.length === 0) {
                    setHasMore(false);
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }, [page,search]);




    return (
        <section className="st-gallery-section">
                {/* 검색창 만들기 */}
            <div className="search-box">
                <input type="text" onChange={onChangeSearch} className="input-text search-txt" defaultValue={search} placeholder="태그로 검색을 해보자" onKeyPress={searchHandler} />
                <button className="search-btn" onClick={searchGallery}>
                    <i className="fas fa-search tx-orange"></i>
                </button>
                {user.roles === 'ROLE_DES' || user.roles === 'ROLE_SHOP' &&
                    <Link to='/gallery/des/galleryregform'> <button className='info-input-btn'>사진 올리기</button></Link>
                }
            </div>
            
           {search &&
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
            }

            {hasMore ?
                <div className="main-btn main-sm-btn" onClick={PlusPage}><span className="btn-text">더보기</span></div>
                : <div className="main-btn main-sm-btn"><span className="btn-text">마지막 페이지 입니다.</span></div>
            }
        </section>
    );
}

export default DesGalSearch;