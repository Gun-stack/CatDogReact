import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Loding from '../../tools/Loding';
import axios from 'axios';
import Swal from 'sweetalert2';
import {useSelector} from 'react-redux';


function UserModi_Tel() {

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
            const res = await axios.post('http://localhost:8090/moditel', { num: user.num, userTel : userTel });
            console.log(res);
            if (res.data === "success") {
                Swal.fire({
                    html:'<img src="/img/logo/modal_success_logo.png"/></span>',
                    title: '<span class="sweet-modal-title">전화번호가 변경 되었습니다</span>',
                    confirmButtonColor: '#F9950F',
                    confirmButtonText: '확인',
                });
                navigate(-1);
            } else {
                Swal.fire({
                    html:'<img src="/img/logo/modal_fail_logo.png"/></span>',
                    title: '<span class="sweet-modal-title">전화번호 변경에 실패했습니다</span>',
                    confirmButtonColor: '#F9950F',
                    confirmButtonText: '확인',
                });
            }
        } catch (error) {
            console.error('전화번호 변경에 실패했습니다', error);
            Swal.fire({
                icon: 'error',
                html: "<p style='text-align:center;'>전화번호 변경에 실패했습니다<p>",
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