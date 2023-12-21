import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loding from '../../tools/Loding';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import SwalCustomAlert from '../../Alerts/SwalCustomAlert';
import Server500Err_Alert from '../../Alerts/Server500Err_Alert';
import {url} from'../../../config';

function UserModi_Tel() {


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
    }, [])
    const dispatch = useDispatch();


    const [userTel, setUserTel] = useState('010-0000-0000');
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user);

    let navigate = useNavigate();
    function goBack(e) {
        e.preventDefault();
        navigate(-1);
    }

    const onChange = (e) => {
        setUserTel(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // 로딩 시작

        try {
            const res = await axios.post(`${url}/moditel`, { num: user.num, userTel: userTel });
            
            dispatch({ type: 'SET_USER', payload: res.data });
            SwalCustomAlert(
                'success',
                '전화번호가 변경되었습니다!',
            );
        }
        catch (error) {
            //500Err 처리
            console.error('서버통신에 실패했습니다', error);
            <Server500Err_Alert />
        } finally {
            navigate("/usermy/usermodi");
            setLoading(false); // 로딩 종료
        }
    };

    return (
        <>
            {loading ? <Loding /> :
                <div>
                    <section className="form-section">
                        <form className='react-modal-css magin-t-5'>
                            {/* 인풋 모여있는 컨테이너 */}

                            <div className="magin-t-1">
                                <input type="text" id="tel" name="tel" placeholder="전화 번호 입력" className="input-text" onChange={onChange} />
                            </div>

                            {/* submit 버튼 */}
                            <div className="button-container">
                                <button className="main-btn btn-text magin-t-1 btn-gray" onClick={goBack} >취소</button>
                                <button id="submit-btn" type="submit" className="main-btn btn-text magin-t-1" onClick={onSubmit}>전화번호 수정 하기</button>
                            </div>
                        </form>
                    </section>
                </div>
            }
        </>
    );
}

export default UserModi_Tel;