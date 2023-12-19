import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loding from '../../tools/Loding';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import Server500Err_Alert from '../../Alerts/Server500Err_Alert';
import SwalCustomAlert from '../../Alerts/SwalCustomAlert';



function UserModi_Nickname() {
    const dispath = useDispatch();


    const [userNickname, setUserNickname] = useState('보호자 닉네임');
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user);


    //뒤로가기
    let navigate = useNavigate();

    function goBack(e) {
        e.preventDefault();
        navigate(-1);
    }

    const onChangeNick = (e) => {
        setUserNickname(e.target.value);
        console.log("UserNickname : " + userNickname);
    }

    const checkNickname = async (e) => {
        e.preventDefault();

        if (userNickname === '' && userNickname.trim() === '') {
            SwalCustomAlert(
                '닉네임을 입력해주세요',
            )
        } else {
            //닉네임 정규식 에서 틀린지 조건체크
            const nicknameRegExp = /^[가-힣a-zA-Z0-9]{2,10}$/;
            if (!nicknameRegExp.test(userNickname)) {
                SwalCustomAlert(
                    '닉네임은 한글 영문 대소문자와 숫자 4~12자리로 입력해주세요.',
                )
                return false;
            }

            try {
                const res = await axios.get(`http://localhost:8090/checkusernickname?nickname=${userNickname}`)

                if (res.data === "success") {
                    //닉네임 중복이 아니고 조건에 부합에 사용 가능하다면
                    SwalCustomAlert(
                        'success',
                        '사용 할 수 있는 닉네임 입니다.',
                    );
                } else {
                    // 중복 됐다면
                    SwalCustomAlert(
                        'fail',
                        '중복되는 닉네임 입니다.',
                    );
                }
            } catch (error) {
                //500 error 체크
                console.error('서버통신에 실패했습니다', error);
                <Server500Err_Alert />
            } finally {
                console.log('닉네임 확인 완료');
            }
        }
    };

    const onSubmit = async (e) => {

        e.preventDefault();
        setLoading(true); // 로딩 시작

        try {
            const res = await axios.post('http://localhost:8090/modinickname', { num: user.num, nickname: userNickname });
            dispath({ type: 'SET_USER', payload: res.data });
            SwalCustomAlert(
                'success',
                '닉네임이 변경되었습니다!',
            );
        } catch (error) {
            //500 error 처리
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
                <section className="form-section magin-t-5">

                    <form className="form-container">
                        {/* 인풋 모여있는 컨테이너 */}
                        <div className="input-container magin-t-1">

                            {/* 중복확인 버튼 있음 */}
                            <div className="duplication-check">
                                {/* BEGIN: ed8c6549bwf9 */}
                                <input type="text" id="nickname" name="nickname" placeholder="닉네임" className="input-text" onChange={onChangeNick} />
                                {/* END: ed8c6549bwf9 */}

                                <button className="duplication-btn small-btn" onClick={checkNickname}>중복확인</button>
                            </div>
                        </div>

                        {/* submit 버튼 */}
                        <div>
                            <button className="main-btn btn-text magin-t-1" onClick={goBack} style={{ backgroundColor: 'rgb(219, 219, 219)' }}>취소</button>
                            <button id="submit-btn" type="submit" className="main-btn btn-text magin-t-1" onClick={onSubmit}>닉네임 수정하기</button>
                        </div>
                    </form>
                </section>
            }
        </>

    );
}
export default UserModi_Nickname;