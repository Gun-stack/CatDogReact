import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { url } from '../../../config';
import SwalCustomAlert from "../../Alerts/SwalCustomAlert";
import { setToken } from "../../../actions";

function UserModi_MemberWithDraw() {
    const [user, setUser] = useState({ id: "", password: "" });
    const changeUser = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const dispatch = useDispatch();
    let navigate = useNavigate();
    function goBack(e) {
        e.preventDefault();
        navigate(0);
        return;
    }
    const token = useSelector(state => state.token);

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post(`${url}/exit`, user, {
            headers: {
                Authorization: token,
            }
        }).then((result) => {
            SwalCustomAlert(
                '<img src="/img/logo/modal_success_logo.png"/>',
                '탈퇴하였습니다.'
            )
            dispatch(setToken("")); // 토큰 값이 남아 있어서 서버에 이전 로그인 사용자의 토큰값이 서버에 넘어감
            navigate("/userlogin");
        })
            .catch((err) => {
                if (err == 'AxiosError: Request failed with status code 403') {
                    SwalCustomAlert(
                        'fail',
                        'ID가 일치하지 않습니다.',
                    )
                } else if (err == 'AxiosError: Request failed with status code 400') {
                    SwalCustomAlert(
                        'fail',
                        'PASSWORD가 일치하지 않습니다.',
                    )
                }
            })


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