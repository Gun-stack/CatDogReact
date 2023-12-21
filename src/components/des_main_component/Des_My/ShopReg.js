import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import SwalCustomAlert from '../../Alerts/SwalCustomAlert';
import { url } from "../../../config";

function ShopReg() {
    const navigate = useNavigate();
    const params = useParams();
    const user = useSelector((state) => state.user);
    const [shopList, setShopList] = useState([]);



    const token = useSelector(state => state.token);

    useEffect(() => {
        // if (user.roles!=="ROLE_SHOP"){
        //     alert("권한이 없습니다.");
        //     navigate(-1);
        // }

        axios.get(`${url}/user`, {
            headers: {
                Authorization: token,
            }
        })
            .then(res => {
                console.log("Res : " + res.data);
                if (res.data.roles === "ROLE_USER") {
                    SwalCustomAlert(
                        'warning',
                        "접근 권한이 없습니다. 디자이너 신청 해 주세요."
                    ).then(() => {
                        if (res) {
                            navigate('/usermy/desreg');
                            return;
                        }
                    })
                }
            })
            .catch(err => {
                // console.log("Err : " + err);
                SwalCustomAlert(
                    'warning',
                    "로그인 이후 사용 가능합니다."
                );
                navigate('/userlogin');
            })


        console.log(params);
        axios.get(`${url}/shoplist?id=${user.id}`)
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
                                        <Link to="/usermy/shopregform">샵 등록하기<i className="fas fa-plus-circle"></i></Link>
                                    </p>
                                </div>
                            </form>

                            {/* 등록한 샵이 있다면 */}
                            <div className="stylelist-content">
                                {shopList.map((shop, index) => (
                                    <div className="shpo-list-li" key={shop.num}>
                                        {/* 구분선 */}
                                        <hr className="divide-line" />
                                        {/* 샵 정보 컨테이너 */}
                                        <div className="nearby-shop-container">
                                            <div className="nearby-shop-address-container">

                                                {/* 샵 이미지 */}
                                                <div className="nearby-shop-img-container">
                                                    <div className="nearby-shop-img">
                                                        <img src={`${url}/shopimg/${shop.profImg}`} alt="등록한 샵 사진" className="nearby-shop-img" />
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
                                            <Link to={`/shop/${shop.num}`}> <button className="st-button">바로가기</button></Link>
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