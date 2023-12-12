import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';


function ShopMainDesLIst(props) {
const shopInfo = props.shopInfo;

    const desList  = [{
        num: '1',
        img: '/img/gallrey-img/1.jpg',    
        position:   '스타일리스트',  
        name: '행복행',
        shop: '복행복',
        info: '행복해 그리고 퇴근해'
    },
    {
        num: '2',
        img: '/img/gallrey-img/textimg.png',    
        position:   '스타일리스트',  
        name: '행복행',
        shop: '복행복',
        info: '행복해 그리고 박근해'
    },

];

// useEffect(() => {
//     console.log(shopInfo);
//     axios.get(`http://localhost:8090/deslist?shopNum=${shopInfo.num}`)
//     .then((res) => {
//         console.log(res.data);
//         }
//     )
//     .catch((err) => {
//         console.log(err);
//     })
// }
// ,[]);


    return (
        <div>
            <div action="" className="shop-form-container">
                <div className="input-img-click sm-input-img">
                    <p>스타일리스트 등록하기 <i className="fas fa-plus-circle"></i></p>
                </div>
            </div>

            <hr className="divide-line" />

            {desList.map((des) => (

            <div className="stylelist-content"key={des.num} >
                <div className="st-profile-container">
                    <div className="st-profile-img">
                        <img src={des.img}alt="프로필 이미지" className="st-profile-img" />
                    </div>

                    <div className="st-profile-context">
                        <div className="st-profile-name">{des.position}  {des.name}</div>
                        <div className="st-profile-shop">{des.shop}</div>
                        <div className="st-profile-info">{des.info}</div>
                    </div>
                </div>

                <div className="st-button-container">
                    <a href="#"><button className="st-button">편집<i className="fas fa-pen btn-icon"></i></button></a>
                    <Link to={`/shop/${shopInfo.num}/reservation/${des.num}`} ><button className="st-button">예약하기<i className="far fa-calendar-alt btn-icon"></i></button></Link>
                </div>
            </div>
            ))}

    <hr className="divide-line" />


        </div>
    );
}

export default ShopMainDesLIst;
