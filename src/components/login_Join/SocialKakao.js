import KakaoLogin from "react-kakao-login";
import axios from "axios";
import Swal from "sweetalert2";
import React from 'react'
import {url} from'../../config';


const SocialKakao = () => {

    const kakaoClientId = 'da8e8b76192c86e4c2475b23d7c61cd8'
    const kakaoOnSuccess = async (data) => {
        console.log(data)
        const idToken = data.response.access_token  // 엑세스 토큰 백엔드로 전달
        console.log(idToken)

        const res = axios.get(`${url}/user/kakaoLogin`, { idToken })

        console.log(res)
        if (res.data === 1) {
            Swal.fire({
                icon: 'success',
                title: '로그인 성공',
                showConfirmButton: false,
                timer: 1500
            })
            setTimeout(() => {
                window.location.href = '/'
            }, 1500);
        } else {
            Swal.fire({
                icon: 'error',
                title: '로그인 실패',
                text: '로그인에 실패하셨습니다.',
                confirmButtonText: '확인'
            })
        }

    }
    const kakaoOnFailure = (error) => {
        console.log(error);
    };
    return (
        <>
            <KakaoLogin
                token={kakaoClientId}
                onSuccess={kakaoOnSuccess}
                onFail={kakaoOnFailure}
            />
        </>
    )

}

export default SocialKakao
