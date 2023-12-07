import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';




function UserModi_Nickname() {

    const [userNickname, setUserNickname] = useState('보호자 닉네임');

    let navigate = useNavigate();
    function goBack(){
        navigate(-1);
    }

    const onChange = (e) => {
        setUserNickname(e.target.value);
    }

    const checkNickname = () => {
        if (userNickname === '') {
            Swal.fire({
                icon: 'error',
                title: '닉네임을 입력해주세요.',
                showConfirmButton: false,
                timer: 1500
            })

            // axios.get(`http://localhost:8080/user/checkusernickname?nickname=${userNickname}`)
            //     .then((res) => {
            //         console.log(res);
            //         if (res.data === true) {
            //             Swal.fire({
            //                 icon: 'error',
            //                 title: '이미 사용중인 닉네임입니다.',
            //                 showConfirmButton: false,
            //                 timer: 1500
            //             })
            //         } else {
            //             Swal.fire({
            //                 icon: 'success',
            //                 title: '사용 가능한 닉네임입니다.',
            //                 showConfirmButton: false,
            //                 timer: 1500
            //             })
            //         }

            //     })
        }
    }


    const onSubmit = (e) => {
        
        if (userNickname === '') {
            Swal.fire({
                icon: 'error',
                title: '닉네임을 입력해주세요.',
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        e.preventDefault();
        const userNickname = document.getElementById('nickname').value;
        const user = {
            userNickname: userNickname
        }
        axios.post('http://localhost:8080/user/updatenickname', user)
            .then((res) => {
                console.log(res);
                if (res.data === true) {
                    Swal.fire({
                        icon: 'success',
                        title: '닉네임이 변경되었습니다.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate(-1);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: '닉네임 변경에 실패했습니다.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    return (
        <div>
            <section className="form-section magin-t-5">
                {/* <form action="" method="post" className="form-css"> */}
                <form className="form-container">
                    {/* 인풋 모여있는 컨테이너 */}
                    <div className="input-container magin-t-1">

                        {/* 중복확인 버튼 있음 */}
                        <div className="duplication-check">
                            {/* BEGIN: ed8c6549bwf9 */}
                            <input type="text" id="nickname" name="nickname" placeholder="닉네임" className="input-text" onChange={onChange} />
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
        </div>
    );
}
export default UserModi_Nickname;