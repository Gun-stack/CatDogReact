import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';


function UserModi_Password() {

    let navigate = useNavigate();
    function goBack(){
        navigate(-1);
    }
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passMessage, setPassMessage] = useState('비밀번호를 입력하세요');

    const changePass = (e) => {
        setPassword(e.target.value);
    }


    async function changePassCheck(e) {
        setPasswordCheck(e.target.value);

        if (password !== passwordCheck) {
            setPassMessage('비밀번호가 일치하지 않습니다.');
        } else {
            setPassMessage('비밀번호가 일치합니다.');
        }

    }

    async function onSubmit(e) {
        if (password !== passwordCheck) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        e.preventDefault();
        const response = await fetch('http://localhost:8090/user/usermodi/password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password, passwordCheck })
        });
        if (response.ok) {
            alert('회원정보가 수정되었습니다.');
            return <Navigate to="/usermy" />
        }
    }

    return (
        <div>
            <section className="form-section magin-t-5">
                <form className="form-container">
                    <div className="input-container magin-t-1">
                        <input type="password" id="password" name="password" placeholder="비밀번호 입력"
                            className="input-text" onChange={changePass} />


                        <input type="password" id="passwordCheck" name="passwordCheck" placeholder="비밀번호 확인"
                            className="input-text" onChange={changePassCheck} />
                        <span className="notice">{passMessage}</span>
                    </div>
                    <div>
                        <button className="main-btn btn-text magin-t-1"
                            style={{ backgroundColor: 'rgb(219, 219, 219)' }} onClick={goBack}>취소</button>
                        <button id="submit-btn" type="submit" className="main-btn btn-text magin-t-1"
                            onClick={onSubmit}
                        >회원 정보 수정
                            하기</button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default UserModi_Password;
