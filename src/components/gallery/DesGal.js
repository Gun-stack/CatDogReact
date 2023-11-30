import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';


function DesGal() {

    const gallery=
        {
            galNum: '1',
            galWriter: '',
            galImg: '',
            galLike: '50',
            galComment: '50',
            galDate: ''
        }
    

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
            {/* {galleryList.map((gallery, index) => { */}
                <div className="st-gallery-img">
                    <Link to={"/galleryview/"+gallery.galNum}><img src="/img/gallrey-img/textimg.png" alt="" className="hover-img" /></Link>
                    <div className="img-comment-hover">
                        <span className="img-hover-icon"><i className="fas fa-heart" ></i>{gallery.galLike}</span>
                        <span className="img-hover-icon"><i className="fas fa-comment"></i>{gallery.galComment}</span>
                    </div>
                </div>
            {/* })} */}
        </div>
        <div className="main-btn main-sm-btn"><span className="btn-text">더보기</span></div>
    </section>
    );
}

export default DesGal;