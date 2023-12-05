import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function ShopMainStyle(props) {
    const shopInfo = props.shopInfo;
    const galleryList = [
        { galNum: 1, galLike: 10, galComment: 20, desNum: 1, desName: '행복행', desImg: '/img/gallrey-img/1.jpg' },
        { galNum: 2, galLike: 10, galComment: 20, desNum: 1, desName: '복행복', desImg: '/img/gallrey-img/2.jpg' },
        { galNum: 3, galLike: 10, galComment: 20, desNum: 1, desName: '행복행', desImg: '/img/gallrey-img/3.jpg' },
        { galNum: 4, galLike: 10, galComment: 20, desNum: 1, desName: '복행복', desImg: '/img/gallrey-img/4.jpg' },
        { galNum: 5, galLike: 10, galComment: 20, desNum: 1, desName: '행복행', desImg: '/img/gallrey-img/5.jpg' },
        { galNum: 6, galLike: 10, galComment: 20, desNum: 1, desName: '복행복', desImg: '/img/gallrey-img/6.jpeg' },
        { galNum: 7, galLike: 10, galComment: 20, desNum: 1, desName: '행복행', desImg: '/img/gallrey-img/7.jpg' },
        { galNum: 8, galLike: 10, galComment: 20, desNum: 1, desName: '복행복', desImg: '/img/gallrey-img/8.jpg' },
        { galNum: 9, galLike: 10, galComment: 20, desNum: 1, desName: '행복행', desImg: '/img/gallrey-img/1.jpg' },
        { galNum: 10, galLike: 10, galComment: 20, desNum: 1, desName: '복행복', desImg: '/img/gallrey-img/2.jpg' },
        { galNum: 11, galLike: 10, galComment: 20, desNum: 1, desName: '행복행', desImg: '/img/gallrey-img/3.jpg' },
        { galNum: 12, galLike: 10, galComment: 20, desNum: 1, desName: '복행복', desImg: '/img/gallrey-img/4.jpg' },
        { galNum: 13, galLike: 10, galComment: 20, desNum: 1, desName: '행복행', desImg: '/img/gallrey-img/5.jpg' },
    ];




    return (
        <div>
            <section className="st-gallery-section">
                <div className="st-gallery-grid">
                    {galleryList.map((gallery, index) => (
                        <div className="st-gallery-img" key={index} >
                            <Link to={"/gallery/des/" + gallery.galNum}><img src={gallery.desImg} alt="" className="hover-img" /></Link>
                            <div className="img-comment-hover">
                                <span className="img-hover-icon"><i className="fas fa-heart" ></i>{gallery.galLike}</span>
                                <span className="img-hover-icon"><i className="fas fa-comment"></i>{gallery.galComment}</span>
                            </div>
                        </div>
                    ))}

                </div>
                <div className="main-btn main-sm-btn"><span className="btn-text">더보기</span></div>
            </section>

        </div>
    );
}

export default ShopMainStyle;