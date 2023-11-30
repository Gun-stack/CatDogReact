import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import axios from 'axios';
import Swal from 'sweetalert2';


function UserModi_loginMidal() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    onchange = (e) => {
        const { name, value } = e.target;
        if (name === 'id') setId(value);
        else if (name === 'password') setPassword(value);
        console.log(id, password);
    }

//   const onSubmit = (e) => {
//         e.preventDefault();
//         //회원정보 확인하기
//         axios.post('http://localhost:8090/user/login', {
//             id: id,
//             password: password
//         }).then((res) => {
//             console.log(res.data);
//             if (res.data === 1) {
//                 axios.delete('http://localhost:8090/user/delete', {
//                     id: id
//                 }).then((res) => {
//                     console.log(res.data);
//                     if (res.data === 1) {
//                         Swal.fire({
//                             icon: 'success',
//                             title: '회원탈퇴가 완료되었습니다.',
//                             text: '로그인 화면으로 이동합니다.',
//                             confirmButtonText: '확인',
//                             allowOutsideClick: false
//                         })
//                         window.location.href = '/userlogin';
//                     } else {
//                         Swal.fire({
//                             icon: 'error',
//                             title: '회원탈퇴가 실패하였습니다.',
//                             text: '다시 시도해주세요.',
//                             confirmButtonText: '확인',
//                             allowOutsideClick: false
//                         })
//                     }
//                 }).catch((err) => {
//                     console.log(err);
//                 })
//             } else {
//                 alert('회원정보가 일치하지 않습니다.');
//             }
//         }).catch((err) => {
//             console.log(err);
//         }
//         )
//     }

    



    return (
        <div>
            <section className="form-section">
                    <div className="form-container">
                        <div className="input-container magin-t-1">
                            <input
                                type="text"
                                id="id"
                                name="id"
                                placeholder="회원 아이디"
                                className="input-text"
                                onchange={onchange}
                            />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="비밀번호 입력"
                                className="input-text"
                                onchange={onchange}
                            />
                        </div>

                        {/* submit 버튼 */}
                        <div className="button-container">
                            <Link to="/usermy" className="btn-text">
                            <button
                                className="main-btn btn-text magin-t-1"
                                style={{ backgroundColor: 'rgb(219, 219, 219)' }}
                            >
                                취소
 
                            </button>
                                </Link>
                            <button
                                id="submit-btn"
                                type="submit"
                                className="main-btn btn-text magin-t-1"
                                // onClick={onSubmit}
                            >
                                회원 정보 수정 하기
                            </button>
                        </div>
                    </div>
            </section>
        </div>
    );
}

export default UserModi_loginMidal;