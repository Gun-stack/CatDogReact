import { Link, Route, Routes } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState } from "react";


function DesReg() {
    const user = useSelector((state) => state.user);
    const [des, setDes] = useState({});
    const [shop, setShop] = useState({});

    
    
    useEffect(() => {
        axios.get(`http://localhost:8090/desinfobyid?desId=${user.id}`)
            .then((res) => {
                console.log(res.data);
                setDes(res.data.des);
                setShop(res.data.shop);
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
                                    {des.num &&<img src={`http://localhost:8090/desimg/${des.num}`} alt="디자이너 이미지" className="st-profile-img" />}
                                </div>

                                <div className="st-profile-context">
                                    <div className="st-profile-name">
                                        {des.position} {des.desNickname} 
                                    </div>
                                    <div className="st-profile-shop">
                                        {shop.name}
                                    </div>
                                    <div className="st-profile-info">
                                        {des.info}

                                    </div>
                                </div>

                            </div>

                            <div className="st-button-container">
                                <button className="st-button"><Link to={`/des/${des.num}/home`}>갤러리<i className="fa-solid fa-image btn-icon"></i></Link></button>
                                <button className="st-button"><Link to="/usermy/desmodi">수정하기<i className="far fa-calendar-alt btn-icon"></i></Link></button>
                            </div>

                        </div>
                    </section>

                </main>


            </div>
        </div >


    </>);
}

export default DesReg;