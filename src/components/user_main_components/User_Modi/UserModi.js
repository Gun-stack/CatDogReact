import { Link } from "react-router-dom";
import React from "react";
import UserModi_loginMidal from './UserModi_loginMidal';
import { useState } from "react";
import ReactModal from 'react-modal';
import UserModi_MemberWithDraw from "./UserModi_MemberWithDraw";



function UserModi() {

    const [ismodal, setismodal] = useState(false);

    const customModalStyles: ReactModal.Styles = {
        overlay: {
            backgroundColor: " rgba(0, 0, 0, 0.4)",
            width: "100%",
            height: "100vh",
            zIndex: "100",
            position: "fixed",
            top: "0",
            left: "0",
        },
        content: {
            width: "500px",
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
            >
                <UserModi_MemberWithDraw />
            </ReactModal>

            <section className="form-section">
                <div className="form-container">
                    <div>유저정보</div>
                    <hr className="divide-line"></hr>                    
                    <div className="input-container magin-t-1">
                        <div className="button-container">
                            <button className="main-btn magin-t-1">
                                <Link to="/usermy/modinick" className="btn-text">
                                    닉네임 변경
                                </Link>
                            </button>
                            <button className="main-btn magin-t-1">
                                <Link to="/usermy/moditel" className="btn-text">
                                    전화번호 변경
                                </Link>
                            </button>
                            <button className="main-btn magin-t-1">
                                <Link to="/usermy/modipassword" className="btn-text">
                                    비밀번호 변경
                                </Link>
                            </button>
                            {/* 회원탈퇴는 모달창 띄워서 비밀번호 한번 더 치게 한 다음에 탈퇴하는게 어떨가요..? 아니면 비번 바꾸는거처럼 바꿀게요  */}
                            <button
                                className="main-btn magin-t-1"
                                style={{ backgroundColor: "rgb(158, 0, 0)" }}
                                onClick={() => setismodal(true)}
                            >
                                <div className="btn-text">
                                    회원탈퇴
                                </div>{" "}
                            </button>
                        </div>
                        <Link to="/usermy" className="btn-text">

                            <button
                                className="main-btn btn-text magin-t-1"
                                style={{ backgroundColor: "rgb(219, 219, 219)" }}
                            >
                                취소
                            </button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default UserModi;






