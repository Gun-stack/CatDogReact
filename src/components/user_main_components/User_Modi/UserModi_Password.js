import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loding from '../../tools/Loding';
import {useSelector} from 'react-redux';
import SwalCustomAlert from '../../Alerts/SwalCustomAlert';
import Server500Err_Alert from '../../Alerts/Server500Err_Alert';


function UserModi_Password() {
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passMessage, setPassMessage] = useState('비밀번호를 입력하세요');
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user);

    let navigate = useNavigate();
    function goBack(e) {
        e.preventDefault();
        navigate(-1);
    }

    const changePass = (e) => {
        setPassword(e.target.value);
    }

    useEffect(() => {
        if (password && passwordCheck) {
            if (password !== passwordCheck) {
                setPassMessage('비밀번호가 일치하지 않습니다.');
            } else {
                setPassMessage('비밀번호가 일치합니다.');
            }
        }
    }, [password, passwordCheck]);

    function changePassCheck(e) {
        setPasswordCheck(e.target.value);
    }
    const onSubmit = async (e) => {

        console.log("UserNum : " + user.num );
        e.preventDefault();
        setLoading(true);
        if (password !== passwordCheck) {
            setPassMessage('비밀번호가 일치하지 않습니다.');
        } else {
            setPassMessage('비밀번호가 일치합니다.');
        }
        try {
            const res = await axios.post('http://localhost:8090/modipassword', { num: user.num, password : password });
            if (res.data === "success") {
                SwalCustomAlert(
                    'success',
                    '비밀번호가 변경 되었습니다.',
                )
            } else {
                console.log(res);
                SwalCustomAlert(
                    'fail',
                    '비밀번호 변경 에 실패했습니다',
                    )
                }
            } catch (error) {
                //500Err 처리
                console.error('서버통신에 실패했습니다', error);
                <Server500Err_Alert />
            } finally {
            navigate(-1);
            setLoading(false);
        }

    }

    return (
        <>
            {loading ? <Loding /> :
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
                            >비밀번호 수정하기</button>
                        </div>
                    </form>
                </section>
            }
        </>
    );
}

export default UserModi_Password;
