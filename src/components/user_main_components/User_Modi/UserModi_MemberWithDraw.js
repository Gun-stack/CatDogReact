import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import {url} from'../../../config';


function UserModi_MemberWithDraw() {
    const [user, setUser] = useState({ id: "", password: "" });
    const changeUser = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    let navigate = useNavigate();
    function goBack(e) {
        e.preventDefault();
        navigate(0);
        return;
    }
    const token = useSelector(state => state.token);

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log("user.id : " + user.id);
        console.log("user.password : " + user.password);

        const res = await axios.post(`${url}/exit`, user);

    }

    const kakaoexit = async (e) => {
        e.preventDefault();
        console.log("Token : " + token);
        const ACCESS_TOKEN = token.substring(7);
        console.log("Token without Bearer: " + ACCESS_TOKEN);
        await axios.post("https://kapi.kakao.com/v1/user/unlink", {
            headers: {
                Authorization: token,
            }
        });

    }

    return (<>
        <div className="react-modal-css">
            <img src="/img/logo/withdraw.png" alt="회원 탈퇴이미지" className="withdraw-img" />
            <div className="withdraw-text">회원탈퇴를 원하시면 <br />한번 더 로그인 해주세요</div>

            {/** 보호자 ID */}
            <input type="text" id="id" name="id" placeholder="댕냥꽁냥 아이디" className="input-text" onInput={changeUser} />
            {/** 보호자 비밀번호 */}
            <input type="password" id="password" name="password" placeholder="비밀번호" className="input-text" onInput={changeUser} />

            {/* 취소버튼 */}
            <button className="main-btn btn-text magin-t-1 btn-gray" onClick={goBack} >취소</button>
            {/* 탈퇴버튼 */}
            <button className="main-btn btn-text magin-t-1 btn-red" onClick={onSubmit}>탈퇴하기</button>
        </div>
    </>);
}

export default UserModi_MemberWithDraw;