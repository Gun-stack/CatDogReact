import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loding from '../../tools/Loding';
import { useSelector } from 'react-redux';
import SwalCustomAlert from '../../Alerts/SwalCustomAlert';
import Server500Err_Alert from '../../Alerts/Server500Err_Alert';
import { url } from '../../../config';

function UserModi_Password() {
    const [password, setPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [newpasswordCheck, setNewPasswordCheck] = useState('');
    const [passMessage, setPassMessage] = useState('비밀번호를 입력하세요');
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user);
    const [isPass, setIsPass] = useState(false);

    let navigate = useNavigate();
    function goBack(e) {
        e.preventDefault();
        navigate(-1);
    }

    const changePass = (e) => {
        setPassword(e.target.value);
    }



    const token = useSelector(state => state.token);
    useEffect(() => {
        // console.log("로그인 후 토큰 값 : " + token);
        axios.get(`${url}/user`, {
            headers: {
                Authorization: token,
            }
        })
            .then(res => {
                console.log("Res : " + res.data);
            })
            .catch(err => {
                // console.log("Err : " + err);
                SwalCustomAlert(
                    'warning',
                    "로그인 이후 사용 가능합니다."
                );
                navigate('/userlogin');
            })
        if (newpassword && newpasswordCheck) {
            if (newpassword !== newpasswordCheck) {
                setPassMessage('비밀번호가 일치하지 않습니다.');
            } else {
                setPassMessage('비밀번호가 일치합니다.');
            }
        }
    }, [newpassword, newpasswordCheck]);



    // useEffect(() => {
    //     if (password && passwordCheck) {
    //         if (password !== passwordCheck) {
    //             setPassMessage('비밀번호가 일치하지 않습니다.');
    //         } else {
    //             setPassMessage('비밀번호가 일치합니다.');
    //         }
    //     }
    // }, [password, passwordCheck]);

    function changePassCheck(e) {
        setNewPasswordCheck(e.target.value);
    }

    const onSubmitCheck = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(`${url}/ispassword`, { id: user.id, password: password }, {
                headers: {
                    Authorization: token,
                }
            });

            console.log(res.data);
            if (res.data) {
                setIsPass(true);
                SwalCustomAlert(
                    'success',
                    '비밀번호가 확인 되었습니다.',
                )
            } else {
                console.log(res);
                SwalCustomAlert(
                    'fail',
                    '비밀번호가 일치하지 않습니다.',
                )
            }
        } catch (error) {
            //500Err 처리
            console.error('서버통신에 실패했습니다', error);
            <Server500Err_Alert />
        } finally {
            setLoading(false);
        }
    }


    const onSubmitModi = async (e) => {

        console.log("UserNum : " + user.num);
        e.preventDefault();
        setLoading(true);
        // if (newpassword !== newpasswordCheck) {
        //     setPassMessage('비밀번호가 일치하지 않습니다.');
        // } else {
        //     setPassMessage('비밀번호가 일치합니다.');
        // }
        if (newpassword === newpasswordCheck) {
            try {
                const res = await axios.post(`${url}/modipassword`, { num: user.num, password: password });
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
        }else{
            setLoading(false);
            return;
        }
    }

    const onChange = (e) => {
        const { value, name } = e.target;
        if (name === 'newpassword') {
            setNewPassword(value);

        } else if (name === 'newpasswordCheck') {
            setNewPasswordCheck(value);

        }
    }

    return (
        <>
            {loading ? <Loding /> :
                <section className="form-section magin-t-5">
                    <form className="form-container">

                        {isPass === false ?
                            <div className="input-container magin-t-1">
                                <input type="password" id="password" name="password" placeholder="현재 비밀번호 입력하세요"
                                    className="input-text" onChange={(e) => { onChange(e); changePass(e); }} />
                            </div>

                            : <div className="input-container magin-t-1">
                                <input type="password" id="newpassword" name="newpassword" placeholder="비밀번호 입력"
                                    className="input-text" onChange={(e) => { onChange(e); changePass(e); }} />

                                <input type="password" id="newpasswordCheck" name="newpasswordCheck" placeholder="비밀번호 확인"
                                    className="input-text" onChange={(e) => { onChange(e); changePassCheck(e); }} />
                                <span className="notice">{passMessage}</span>
                            </div>
                        }




                        <div>
                            {isPass === false ?
                                <button id="submit-btn" type="submit" className="main-btn btn-text magin-t-1"
                                    onClick={onSubmitCheck}
                                >비밀번호 확인 </button>
                                :
                                <button id="submit-btn" type="submit" className="main-btn btn-text magin-t-1"
                                    onClick={onSubmitModi}
                                >비밀번호 수정 </button>
                            }
                            <button className="main-btn btn-text magin-t-1"
                                style={{ backgroundColor: 'rgb(219, 219, 219)' }} onClick={goBack}>취소</button>
                        </div>
                    </form>
                </section>
            }
        </>
    );
}

export default UserModi_Password;
