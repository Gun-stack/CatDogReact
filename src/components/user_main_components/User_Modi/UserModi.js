import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import ReactModal from 'react-modal';
import UserModi_MemberWithDraw from "./UserModi_MemberWithDraw";
import { useSelector } from 'react-redux';
import { useEffect } from "react";

function UserModi() {
    const user = useSelector((state) => state.user);

    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const [ismodal, setismodal] = useState(false);



    const customModalStyles = ReactModal.Styles = {
        overlay: {
            backgroundColor: " rgba(0, 0, 0, 0.4)",
            width: "100%",
            height: "100%",
            zIndex: "100",
            position: "fixed",
            top: "0",
            left: "0",
        },
        content: {
            width: "80%",
            height: "400px",
            zIndex: "200",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "10px",
            boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.25)",
        },
    };

    return (
        <>
            <ReactModal
                isOpen={ismodal}
                onRequestClose={() => setismodal(false)}
                style={customModalStyles}
                ariaHideApp={true}
                contentLabel="회원 인증 하세요"
                shouldCloseOnOverlayClick={true}
            >  <UserModi_MemberWithDraw />
            </ReactModal>



            {/* <section className="form-section"> */}
            <section className="form-section magin-b-5">

                <div className="usermy-id-card" onClick={handleFlip}>
                    <div className={`id-cards ${isFlipped ? 'flipped' : ''}`}>

                        <div className="id-card-front">
                            <span className="id-card-title">유저정보</span>
                            {/* 카카오 가입 유저면 카카오가 보임 */}
                            <div className="id-front-display">
                                {user.provider === "Kakao" ?
                                    <div className="id-card-content">
                                        <p className="id-text">
                                            <span className="tx-orange f-w-600">댕냥꽁냥 아이디</span>  : <span className="f-w-600">{user.id}</span> <br />
                                            <span className="tx-orange f-w-600">댕냥꽁냥 닉네임</span> : <span className="f-w-600">{user.nickname}</span> <br />
                                            <span className="tx-orange f-w-600">소셜 로그인</span>  : <span className="f-w-600">카카오</span> <br />
                                            <span className="tx-orange f-w-600">이 메일</span> : <span className="f-w-600">{user.email}</span> <br />
                                        </p>
                                        <img src="/img/logo/pet_defult_img.png" alt="기본이미지" className="id-card-img" />
                                    </div>
                                    :
                                    <div className="id-card-content">
                                        <p className="id-text">
                                            <span className="tx-orange f-w-600">댕냥꽁냥 아이디</span>  : <span className="f-w-600">{user.id}</span> <br />
                                            <span className="tx-orange f-w-600">댕냥꽁냥 닉네임</span> : <span className="f-w-600">{user.nickname}</span> <br />
                                            <span className="tx-orange f-w-600">이 름</span>  : <span className="f-w-600">{user.name}</span> <br />
                                            <span className="tx-orange f-w-600">이 메일</span>  : <span className="f-w-600">{user.email}</span> <br />
                                            <span className="tx-orange f-w-600">전 화 번 호</span>  : <span className="f-w-600">{user.tel}</span> <br />
                                        </p>
                                        <img src="/img/logo/pet_defult_img.png" alt="기본이미지" className="id-card-img" />
                                
                                    </div>
                                }
                            </div>
                        </div>
                        {/* 
                        <div>
                            {userType === "일반유저" ? (
                                <NormalUserPage />
                            ) : userType === "디자이너" ? (
                                <DesignerPage />
                            ) : (
                                <ShopOwnerPage />
                            )}
                        </div> */}
                        {/* 일반유저면 */}
                        <div className="id-card-back">
                            <img src="/img/logo/logo_color.png" alt="로고 이미지" className="id-logo" />
                            <span className="id-card-title tx-white">유저 정보 카드</span>
                        </div>
                        {/* 디자이너면 */}
                        <div className="id-card-back">
                            <img src="/img/logo/logo_color.png" alt="로고 이미지" className="id-logo" />
                            <span className="id-card-title tx-white">유저 정보 카드</span>
                        </div>
                        {/* 샵주라면 */}
                        <div className="id-card-back">
                            <img src="/img/logo/logo_color.png" alt="로고 이미지" className="id-logo" />
                            <span className="id-card-title tx-white">유저 정보 카드</span>
                        </div>

                    </div>
                </div>

                <div className="user-modi-container">
                    <div className="input-container magin-t-1">
                        <div className="button-container">

                            <Link to="/usermy/modinick">
                                <button className="main-btn magin-t-1 btn-text wi-30 btn-display">
                                    <span className="btn-inner-text">닉네임 변경</span>
                                    <i className="fas fa-id-card tx-white"></i>
                                </button>
                            </Link>

                            <Link to="/usermy/moditel">
                                <button className="main-btn magin-t-1 btn-text wi-30 btn-display">
                                    <span className="btn-inner-text">전화번호 변경</span>
                                    <i className="fas fa-mobile-alt tx-white"></i>
                                </button>
                            </Link>

                            <Link to="/usermy/modipassword">
                                <button className="main-btn magin-t-1 btn-text wi-30 btn-display">
                                    <span className="btn-inner-text">비밀번호 변경</span>
                                    <i className="fas fa-unlock-alt tx-white"></i>
                                </button>
                            </Link>

                            <Link to="/usermy/desmodi">
                                <button className="main-btn magin-t-1 btn-text wi-30 btn-display">
                                    <span className="btn-inner-text">디자이너 정보 변경</span>
                                    <i className="fas fa-unlock-alt tx-white"></i>
                                </button>
                            </Link>


                            <button className="main-btn magin-t-1 btn-red btn-text wi-30 btn-display" onClick={() => setismodal(true)}>
                                <span className="btn-inner-text">회원탈퇴</span>
                                <i className="fas fa-sign-out-alt tx-white"></i>
                            </button>

                            <Link to="/usermy">
                                <button className="main-btn btn-text magin-t-1 btn-gray wi-30">
                                    취소
                                </button>
                            </Link>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default UserModi;