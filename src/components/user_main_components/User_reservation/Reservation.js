import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Reservation() {

const[res, setRes] = useState({
    resNum: '1',
    userId:'user1',
    desId: 'des1',
    petName: '석탄' ,
    shopId : 'shop1',
    resDate: '2023-12-01',
    resTime: '12:00',
    resState: false ,
    refImg: '',
    refText: '샤기컷으로 해주세요',
    notice: '배가고파요',
    isReview: false,
});



// useEffect(() => {
//     axios.get('http://localhost:8080/catdog/reservation/user/catdog')
//     .then((res) => {
//         console.log(res);
//         setRes(res.data);
//     })
//     .catch((err) => {
//         console.log(err);
//     })

// }
// , []);







return (
                <main className="cd-main dis-center">
                    <section className="shop-main-section bg-white">
                        <ul className="nav-ul">
                            <li className="nav-li">
                                <div>
                                    <i className="fas fa-caret-square-right mypage-arrow"></i>예약 확인 하기
                                </div>
                                <i className="fas fa-store"></i>
                            </li>
                        </ul>

                        {/* 예약한 내역이 없다면 */}
                        <form action="" className="shop-form-container">
                            <div className="input-img-click sm-input-img">
                                <p>예약한 내역이 없습니다</p>
                            </div>
                        </form>

                        {/* 예약한 내역이 있다면 */}
                        <div className="reservation-container">
                                <hr className="divide-line"/>
                                <div className="re-shop-info">
                                    <span className="re-text">샵 이름 :</span> 
                                    <span className="re-shop-name">{res.shopId}</span> 
                                    <span className="re-pet-name">{res.petName}</span>
                        </div>
                                <div className="re-date">{res.resDate} {res.resTime}</div>
                                <div className="re-btns"><span className="is-visit">{res.resState? '방문 완료': '방문 예정'}  </span>
                                <button className="small-btn" ><Link to="/usermy/check" className="btn-text" >예약확인</Link></button></div>
                                <hr className="divide-line"/>

                        </div>
                    </section>
                </main>

);
    }
export default Reservation;