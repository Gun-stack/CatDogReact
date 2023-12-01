import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';


function DesGal() {

    const galleryList=[
        {
            galNum: '1', galWriter: '23', galImg: '/img/gallrey-img/textimg.png', galLike: '50', galComment: '50', galDate: '2023-10-10'
        },
        {
            galNum: '2', galWriter: '22', galImg: '/img/gallrey-img/1.jpg', galLike: '50', galComment: '50', galDate: '2023-10-11'
        },
        {
            galNum: '3', galWriter: '21', galImg: '/img/gallrey-img/2.jpg', galLike: '50', galComment: '50', galDate: '2023-10-12'
        },
        {
            galNum: '4', galWriter: '20', galImg: '/img/gallrey-img/3.jpg', galLike: '50', galComment: '50', galDate: '2023-10-13'
        },
        {
            galNum: '5', galWriter: '19', galImg: '/img/gallrey-img/4.jpg', galLike: '50', galComment: '50', galDate: '2023-10-14'
        },
        {
            galNum: '6', galWriter: '18', galImg: '/img/gallrey-img/5.jpg', galLike: '50', galComment: '50', galDate: '2023-10-15'
        },
        {
            galNum: '7', galWriter: '17', galImg: '/img/gallrey-img/2.jpg', galLike: '50', galComment: '50', galDate: '2023-10-16'
        },
        {
            galNum: '8', galWriter: '16', galImg: '/img/gallrey-img/3.jpg', galLike: '50', galComment: '50', galDate: '2023-10-17'
        },
        {
            galNum: '9', galWriter: '15', galImg: '/img/gallrey-img/2.jpg', galLike: '50', galComment: '50', galDate: '2023-10-18'
        },
        {
            galNum: '10', galWriter: '14', galImg: '/img/gallrey-img/3.jpg', galLike: '50', galComment: '50', galDate: '2023-10-19'
        }
        

    ]
    

    // useEffect(() => {
    //     axios.get('http://localhost:8080/gallery/des')
    //         .then((res) => {
    //             setGalleryList(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }, []);




    return (
        <section className="st-gallery-section">
        <div className="st-gallery-grid">

            {galleryList.map((gallery, index) => (
                <div className="st-gallery-img" key={index} >
                    <Link to={"/gallery/des/"+gallery.galNum}><img src={gallery.galImg} alt="" className="hover-img" /></Link>
                    <div className="img-comment-hover">
                        <span className="img-hover-icon"><i className="fas fa-heart" ></i>{gallery.galLike}</span>
                        <span className="img-hover-icon"><i className="fas fa-comment"></i>{gallery.galComment}</span>
                    </div>
                </div>
            ))}
        </div>
        <div className="main-btn main-sm-btn"><span className="btn-text">더보기</span></div>
    </section>
    );
}

export default DesGal;