import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';


function UserReviewList() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const reservationList = useSelector((state) => state.resv) ;
    const resvList = reservationList.filter((resv) => resv.status === "완료" );
    


    useEffect(() => {
        console.log(reservationList)    
        axios.get(`http://localhost:8090/resinfobyuserid?userId=${user.id}`)
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
                <Link to={`/usermy/reservationdone/${user.num}`}>
                <div>
                    <i className="fas fa-caret-square-right mypage-arrow"></i>이용 완료 내역보기
                </div>
                </Link>
                <i className="fas fa-store"></i>
            </li>
            </ul>
    
            {resvList.length === 0 ? (
            <div action="" className="shop-form-container">
                <div className="input-img-click sm-input-img">
                <p>이전 이용 내역이 없습니다</p>
                </div>
            </div>
            ) : 
            (
                <div>
                {/* 최근 방문순서? */}
                {resvList.reverse().map((resv, index) => (
                <div key={index} className="reservation-container">
                    <hr className="divide-line" />
                    <div className="re-shop-info">
                    <span className="re-text">샵 이름 :</span>
                    <span className="re-shop-name">{resv.shopName}</span>
                    <span className="re-pet-name">{resv.petName}</span>
                    </div>
                    <div className="re-date">
                    {resv.date} {(resv.time).slice(0, -3)}
                    </div>
                    <div className="re-btns">
                    <span className="is-visit">
                        {resv.status === "예약" ? '방문 예정': '방문 완료'}
                    </span>
                    <span className="is-visit">
                        {resv.status ==="완료" && resv.isReview === 0 ?
                        (<Link to={`/usermy/reviewregform/${resv.num}`}>리뷰쓰기</Link>)
                        : (<Link to={`/usermy/reviewdetail/${resv.num}`}>리뷰보기</Link>) }
                    </span>
                    <button className="small-btn">
                        <Link to={`/usermy/check/${resv.num}`} className="btn-text">
                        예약확인
                        </Link>
                    </button>
                    </div>
                    <hr className="divide-line" />
                </div>
                ))}
            </div>
            )}
        </section>
        </main>
    );
}

export default UserReviewList;