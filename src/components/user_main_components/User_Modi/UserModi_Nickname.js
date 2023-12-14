import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loding from '../../tools/Loding';

import {useSelector} from 'react-redux';





function UserModi_Nickname() {

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
        console.log("UserNickname : " +userNickname);
    }

    const checkNickname = async (e) => {
        e.preventDefault();

        if (userNickname === '' && userNickname.trim() === '' ) {
            Swal.fire({
                html:'<img src="/img/logo/modal_notice_logo.png"/></span>',
                title: '<span class="sweet-modal-title">닉네임을 입력해주세요</span>',
                confirmButtonColor: '#F9950F',
                confirmButtonText: '확인',
            });
        } else {
            //닉네임 정규식
            const nicknameRegExp = /^[가-힣a-zA-Z0-9]{2,10}$/;
            if (!nicknameRegExp.test(userNickname)) {
                Swal.fire({
                    html:'<img src="/img/logo/modal_notice_logo.png"/></span>',
                    title: '<span class="sweet-modal-title">닉네임은 한글,영문 대소문자와<br/> 숫자 2~10자리로 입력해주세요</span>',
                    confirmButtonColor: '#F9950F',
                    confirmButtonText: '확인',
                });
                return false;
            }

            try {
                const res = await axios.get(`http://localhost:8090/checkusernickname?nickname=${userNickname}`)
                if (res.data === "success") {
                    Swal.fire({
                        html:'<img src="/img/logo/modal_success_logo.png"/></span>',
                        title: '<span class="sweet-modal-title">사용가능한 닉네임 입니다</span>',
                        confirmButtonColor: '#F9950F',
                        confirmButtonText: '확인'
                    });
                } else {
                    Swal.fire({
                        title: '중복된 닉네임 입니다',
                        icon: 'warning',
                        confirmButtonColor: '#F9950F',
                        confirmButtonText: '확인',
                    });
                }
            } catch (error) {
                console.error('서버통신에 실패했습니다', error);
                Swal.fire({
                    html:'<img src="/img/logo/modal_fail_logo.png"/></span>',
                    title: '<span class="sweet-modal-title">서버통신에 실패했습니다</span>',
                    confirmButtonColor: '#F9950F',
                    confirmButtonText: '확인',
                });
            } finally {
                console.log('닉네임 확인 완료');
            }
        }
    };

    const onSubmit = async (e) => {
        
        e.preventDefault();
        setLoading(true); // 로딩 시작
        console.log("Nickname : " + userNickname);

        try {
            const res = await axios.post('http://localhost:8090/modinickname', {num : user.num, nickname : userNickname});

            console.log(res);
            if (res.data === "success") {
                Swal.fire({
                    html:'<img src="/img/logo/modal_success_logo.png"/></span>',
                    title: '<span class="sweet-modal-title">닉네임이 변경되었습니다</span>',
                    confirmButtonColor: '#F9950F',
                    confirmButtonText: '확인',
                });
                navigate(-1);
            } else {
                Swal.fire({
                    html:'<img src="/img/logo/modal_fail_logo.png"/></span>',
                    title: '<span class="sweet-modal-title">닉네임 변경에 실패했습니다</span>',
                    confirmButtonColor: '#F9950F',
                    confirmButtonText: '확인',
                });
            }
        } catch (error) {
            console.error('서버통신에 실패했습니다', error);
            Swal.fire({
                html:'<img src="/img/logo/modal_fail_logo.png"/></span>',
                title: '<span class="sweet-modal-title">서버통신에 실패했습니다</span>',
                confirmButtonColor: '#F9950F',
                confirmButtonText: '확인',
            });
        } finally {
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