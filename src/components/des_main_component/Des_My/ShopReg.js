import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function ShopReg() {
    const params = useParams();
    const user = useSelector((state) => state.user);
    const [shopList, setShopList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user.roles!=="ROLE_SHOP"){
            alert("권한이 없습니다.");
            navigate(-1);
        }
        console.log(params);
        axios.get(`http://localhost:8090/shoplist?id=${user.id}`)
            .then((res) => {
                console.log("RES:");
                res.data.forEach((shop, index) => {
                    console.log(`Object ${index + 1}:`, shop);
                });
                setShopList(Array.isArray(res.data) ? res.data : []);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [user.id]);

    return (
        <>
            <div className="web-container ">
                <div className="cd-container bg-white bg-dogs">
                    <main className="cd-main dis-center ">

                        <section className="shop-main-section bg-white">

                            <ul className="nav-ul">
                                <li className="nav-li">
                                    <div>
                                        <i className="fas fa-caret-square-right mypage-arrow"></i> <a href="#">샵 정보 등록 / 수정하기</a>
                                    </div>
                                    <i className="fas fa-store"></i>
                                </li>
                            </ul>

                            {/* 등록한 샵이 없다면 */}
                            <form action="" className="shop-form-container">
                                <div className="input-img-click sm-input-img">
                                    <p>
                                        <Link to="/desmy/shopregform">샵 등록하기<i className="fas fa-plus-circle"></i></Link>
                                    </p>
                                </div>
                            </form>

                            {/* 등록한 샵이 있다면 */}
                            <div className="stylelist-content">
                                {shopList.map((shop, index) => (
                                    <div className="shpo-list-li" key={index}>
                                        {/* 구분선 */}
                                        <hr className="divide-line" />
                                        {/* 샵 정보 컨테이너 */}
                                        <div className="nearby-shop-container">
                                            <div className="nearby-shop-address-container">
                                                
                                                {/* 샵 이미지 */}
                                                <div className="nearby-shop-img-container">
                                                    <div className="nearby-shop-img">
                                                        <img src={`http://localhost:8090/shopimg/${shop.profImg}`} alt="등록한 샵 사진" className="st-profile-img" />
                                                    </div>
                                                </div>

                                                {/* 주소 컨테이너 */}
                                                <div className="shop-text-container">
                                                    <h3 className="shop-name">{shop.name}</h3>
                                                    <div className="shop-adderss">
                                                        <p className="shop-adderss-text">
                                                            {shop.addressRoad}
                                                        </p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="st-button-container">
                                            <button className="st-button"><a href="shoppagemain.html">바로가기</a><i className="fas fa-pen btn-icon"></i></button>
                                            <Link to={`/usermy/shopmodiform/${shop.num}`}>
                                                <div className="st-button">편집<i className="fas fa-pen btn-icon"></i></div>
                                            </Link>
                                        </div>
                                    </div>
                                ))}

                            </div>

                        </section>

                    </main>
                </div>
            </div>


        </>
    );
}

export default ShopReg;