import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserModi_MemberWithDraw() {
    const [user, setUser] = useState({id:"", password:""});
    let navigate = useNavigate();
    function goBack(){
        navigate(-1);
    }
    
    return (<>
        <div className="react-modal-css">
            <img src="/img/logo/withdraw.png" alt="회원 탈퇴이미지" className="withdraw-img"/>
            <div className="withdraw-text">회원탈퇴를 원하시면 <br/>한번 더 로그인 해주세요</div>
            {/** 보호자 ID */}
            <input type="text" id="id" name="id" placeholder="댕냥꽁냥 아이디" className="input-text" value={user.username}/>
            {/** 보호자 비밀번호 */}
            <input type="password" id="password" name="password" placeholder="비밀번호" className="input-text" value={user.password} />
            <button className="main-btn btn-text magin-t-1" onClick={goBack} style={{ backgroundColor: 'rgb(219, 219, 219)' }}>취소</button>

            <button className="main-btn btn-text magin-t-1"  style={{ backgroundColor: "rgb(158, 0, 0)" }}>탈퇴하기</button>
        </div>
    </>);
}

export default UserModi_MemberWithDraw;