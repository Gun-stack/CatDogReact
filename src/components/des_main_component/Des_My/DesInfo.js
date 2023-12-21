import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from "react";
import SwalCustomAlert from '../../Alerts/SwalCustomAlert';
import { url } from "../../../config";


function DesReg() {
    const user = useSelector((state) => state.user);
    const [des, setDes] = useState({});
    const [shop, setShop] = useState({});


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


        axios.get(`${url}/desinfobyid?desId=${user.id}`)
            .then((res) => {
                console.log(res.data);
                setDes(res.data.des);
                if (res.data.shop != null) {
                    setShop(res.data.shop);
                    console.log("Data : " + res.data.shop.name);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);




    return (<>
        <div className="web-container wed-bg">
            <div className="cd-container bg-white bg-dogs">
                <main className="cd-main dis-center ">

                    <section className="shop-main-section bg-white">
                        <ul className="nav-ul">
                            <li className="nav-li">
                                <div>
                                    <i className="fas fa-caret-square-right mypage-arrow"></i>디자이너 수정하기
                                </div>
                                <i className="fas fa-cut"></i>
                            </li>
                        </ul>

                        {/* <!-- 디자이너 프로필 --> */}
                        <div className="stylelist-content">
                            <div className="st-profile-container">

                                <div className="st-profile-img">
                                    {des.num && <img src={`${url}/desimg/${des.num}`} alt="디자이너 이미지" className="st-profile-img" />}
                                </div>

                                <div className="st-profile-context">
                                    <div className="st-profile-name">
                                        {des.position} {des.desNickname}
                                    </div>
                                    {shop !== null ? (
                                        <div className="st-profile-shop">
                                            {shop.name}
                                        </div>
                                    ) : (
                                        <div className="st-profile-shop">
                                        </div>)
                                    }
                                    <div className="st-profile-info">
                                        {des.info}

                                    </div>
                                </div>

                            </div>

                            <div className="st-button-container">
                            <Link to={`/des/${des.num}/home`}><button className="st-button">갤러리<i className="fa-solid fa-image btn-icon"></i></button></Link>
                            <Link to="/usermy/desmodi"><button className="st-button">수정하기<i className="far fa-calendar-alt btn-icon"></i></button></Link>
                            </div>

                        </div>
                    </section>

                </main>


            </div>
        </div >


    </>);
}

export default DesReg;