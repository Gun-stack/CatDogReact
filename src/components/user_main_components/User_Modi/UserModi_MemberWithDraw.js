import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function UserModi_MemberWithDraw() {
    const [user, setUser] = useState({id:"", password:""});
    let navigate = useNavigate();
    function goBack(e){
        e.preventDefault();
        navigate(-1);
    }

    const onSubmit = (e) => {
            e.preventDefault();
        }

    
    return (<>
        <div className="react-modal-css">
            <img src="/img/logo/withdraw.png" alt="회원 탈퇴이미지" className="withdraw-img"/>
            <div className="withdraw-text">회원탈퇴를 원하시면 <br/>한번 더 로그인 해주세요</div>

            {/** 보호자 ID */}
            <input type="text" id="id" name="id" placeholder="댕냥꽁냥 아이디" className="input-text"/>
            {/** 보호자 비밀번호 */}
            <input type="password" id="password" name="password" placeholder="비밀번호" className="input-text"/>

            {/* 취소버튼 */}
            <button className="main-btn btn-text magin-t-1 btn-gray" onClick={goBack} >취소</button>
            {/* 탈퇴버튼 */}
            <button className="main-btn btn-text magin-t-1 btn-red" onClick={onSubmit}>탈퇴하기</button>
        </div>
    </>);
}

export default UserModi_MemberWithDraw;