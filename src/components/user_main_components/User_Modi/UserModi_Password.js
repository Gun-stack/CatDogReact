import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loding from '../../tools/Loding';


function UserModi_Password() {
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passMessage, setPassMessage] = useState('비밀번호를 입력하세요');
    const [loading, setLoading] = useState(false);

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
        e.preventDefault();
        setLoading(true);
        if (password !== passwordCheck) {
            setPassMessage('비밀번호가 일치하지 않습니다.');
        } else {
            setPassMessage('비밀번호가 일치합니다.');
        }
        try {
            const res = await axios.post('http://localhost:8080/user/endpoint', { password });
            if (res.data === true) {
                Swal.fire({
                    icon: 'success',
                    html: "<p style='text-align:center;'>비밀번호가 변경되었습니다<p>",
                    confirmButtonColor: '#F9950F',
                    confirmButtonText: '확인',
                });
                navigate(-1);
            } else {
                Swal.fire({
                    icon: 'error',
                    html: "<p style='text-align:center;'>비밀번호 변경에 실패했습니다<p>",
                    confirmButtonColor: '#F9950F',
                    confirmButtonText: '확인',
                });
            }
        } catch (error) {
            console.error('닉네임 변경에 실패했습니다', error);
            Swal.fire({
                icon: 'error',
                html: "<p style='text-align:center;'>비밀번호 변경에 실패했습니다<p>",
                confirmButtonColor: '#F9950F',
                confirmButtonText: '확인',
            });
        } finally {
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
