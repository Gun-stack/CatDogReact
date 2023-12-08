import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Reservation() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const reservationList = useSelector((state) => state.resv);



    useEffect(() => {
        axios.get(`http://localhost:8090/resinfo?userId=${user.id}`)
            .then((res) => {
                if (res.data !== undefined) {
                    dispatch({ type: 'SET_RESERVATION', payload: res.data });
                    console.log(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
        , [user.id]);







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

                {reservationList.length === 0 ? (
                    <form action="" className="shop-form-container">
                        <div className="input-img-click sm-input-img">
                            <p>예약한 내역이 없습니다</p>
                        </div>
                    </form>
                ) : (
                    reservationList.map((res, index) => (
                        <div key={index} className="reservation-container">
                            <hr className="divide-line" />
                            <div className="re-shop-info">
                                <span className="re-text">샵 이름 :</span>
                                <span className="re-shop-name">{res.shopName}</span>
                                <span className="re-pet-name">{res.petName}</span>
                            </div>
                            <div className="re-date">{res.date} {(res.time).slice(0, -3)}</div>
                            <div className="re-btns">
                                <span className="is-visit">{res.status === "true" ? '방문 완료' : '방문 예정'}  </span>
                                <span className="is-visit">{res.status === "true" ? '' : <Link to ={'/usermy/review'}>리뷰쓰기</Link>}  </span>
                                <button className="small-btn"><Link to={`/usermy/check/${res.num}`} className="btn-text" >예약확인</Link></button>
                            </div>
                            <hr className="divide-line" />
                        </div>
                    ))

                )}
            </section>
        </main>

    );
}
export default Reservation;