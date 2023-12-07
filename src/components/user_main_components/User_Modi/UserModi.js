import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import ReactModal from 'react-modal';
import UserModi_MemberWithDraw from "./UserModi_MemberWithDraw";



function UserModi() {
    const [ismodal, setismodal] = useState(false);

    const customModalStyles = ReactModal.Styles = {
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
            >  <UserModi_MemberWithDraw />
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

                            <button className="main-btn magin-t-1 btn-red btn-text" onClick={() => setismodal(true)}>
                                    회원탈퇴
                            </button>
                        </div>

                        <Link to="/usermy" className="btn-text">
                            <button className="main-btn btn-text magin-t-1 btn-gray">
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






