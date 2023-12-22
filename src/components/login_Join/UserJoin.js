import { Link } from "react-router-dom";
import Footer from "../screens/Footer";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import axios from "axios";
import Loding from "../tools/Loding";
import Server500Err_Alert from "../Alerts/Server500Err_Alert";
import SwalCustomAlert from "../Alerts/SwalCustomAlert";

import { url } from "../../config"
import { useLocation } from 'react-router';


function UserJoin() {

    const [id, setId] = useState('');
    const [username, setUserName] = useState('');
    const [nickname, setNickname] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const { state } = useLocation();

    //패스워드 관련
    const [password, setPassword] = useState('');
    const [passMessage, setPassMessage] = useState('비밀번호를 입력하세요');
    const [passwordCheck, setPasswordCheck] = useState('');

    const userinfo = state ? JSON.parse(state) : {};

    const changePass = (e) => {
        setPassword(e.target.value);
    }

    //이메일 인증관련
    const [emailCode, setEmailCode] = useState();
    const [code, setCode] = useState('');

    useEffect(() => {
        if (password && passwordCheck) {
            if (password !== passwordCheck) {
                setPassMessage('비밀번호가 일치하지 않습니다.');
            } else {
                setPassMessage('비밀번호가 일치합니다.');
            }
        }
        // console.log("Provider_Id : " + userinfo.providerId);
    }, [password, passwordCheck, userinfo.id]);


    function changePassCheck(e) {
        setPasswordCheck(e.target.value);
    }
    const [idcheck, setIdCheck] = useState(false);
    const [nicknamecheck, setNicknameCheck] = useState(false);
    const [emailCheck, setEmailCheck] = useState(false);

    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const formatPhoneNumber = (input) => {
        // 숫자만 추출
        const cleaned = ('' + input).replace(/\D/g, '');
        // 3자리-5자리-4자리 형식으로 포맷팅
        const formatted = cleaned.replace(/^(\d{3})(\d{0,4})(\d{0,4})/, (match, p1, p2, p3) => {
            let result = p1;
            if (p2) result += `-${p2}`;
            if (p3) result += `-${p3}`;
            return result;
        });
        setPhoneNumber(formatted.substring(0, 14));
    };
    const telChange = (e) => {
        e.preventDefault();
        setTel(e.target.value.replace(/\D/g, ''));
        formatPhoneNumber(e.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        setLoading(true);
        const joinInfo = {
            id: id,
            password: password,
            name: username,
            nickname: nickname,
            tel: tel,
            email: email,
            roles: 'ROLE_USER',
            provider: userinfo ? userinfo.provider : "",
            providerId: userinfo ? userinfo.providerId : "",
        }
        console.log(joinInfo);
        try {
            axios.post(`${url}/userjoin`, joinInfo)
                .then((res) => {
                    if (res.data === "joinsuccess") {
                        SwalCustomAlert(
                            'success',
                            '회원가입 성공! 로그인 페이지로 이동합니다',
                        );
                        window.location.replace("userlogin");
                    } else {
                        console.log(res);
                        SwalCustomAlert(
                            'fail',
                            '회원가입에 실패했습니다.',
                        );
                    }
                })
        } catch (error) {
            console.error('서버통신에 실패했습니다', error);
            <Server500Err_Alert />
        } finally {
            setLoading(false);
        }
    }


    //아이디 중복체크 여부 
    const checkId = (e) => {
        e.preventDefault();
        if (userinfo ? userinfo.id === "" : id === '') {
            SwalCustomAlert(
                'notice',
                '아이디를 입력해주세요',
            );
        } else {
            //아이디 정규식
            const idRegExp = /^[a-zA-Z0-9]{4,12}$/;
            if (!idRegExp.test(userinfo ? userinfo.id : id)) {
                SwalCustomAlert(
                    'notice',
                    '아이디는 영문 대소문자와 숫자 4~12자리로 입력해주세요',
                );
                return false;
            }
            // db 조회
            axios.get(`${url}/checkuserid?id=${id}`)
                .then(res => {
                    console.log("res.data : " + res.data);
                    if (res.data === "success") {
                        SwalCustomAlert(
                            'success',
                            '사용가능한 아이디 입니다',
                        )
                        setIdCheck(true);
                    } else {
                        SwalCustomAlert(
                            'fail',
                            '중복된 아이디 입니다.',
                        )
                    }
                })
                .catch(err => {
                    console.error(err);
                    <Server500Err_Alert />
                })
        }
    }
    //닉네임 중복체크 여부
    const checkNickname = (e) => {
        e.preventDefault();
        if (userinfo ? userinfo.nickname === "" : nickname === '') {
            SwalCustomAlert(
                'notice',
                '닉네임을 입력해주세요',
            )
        } else {

            //닉네임 정규식
            const nicknameRegExp = /^[가-힣a-zA-Z0-9]{2,10}$/;
            if (!nicknameRegExp.test(userinfo ? userinfo.nickname : nickname)) {
                SwalCustomAlert(
                    'notice',
                    '닉네임은 한글 영문 대소문자와 숫자 4~12자리로 입력해주세요.',
                )
                return false;
            }

            axios.get(`${url}/checkusernickname?nickname=${userinfo ? userinfo.nickname : nickname}`)
                .then(res => {
                    if (res.data === "success") {
                        SwalCustomAlert(
                            'success',
                            '사용가능한 닉네임 입니다',
                        )
                        setNicknameCheck(true);
                    } else {
                        SwalCustomAlert(
                            'fail',
                            '중복된 닉네임 입니다',
                        )
                    }
                })
                .catch(err => {
                    console.error(err);
                    <Server500Err_Alert />
                })

        }
    }


    // const checkEmail = (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     axios.get(`${url}/verify?email=${email}`)
    //         .then(res => {
    //             console.log(res.data);
    //             setEmailCode(res.data);
    //             SwalCustomAlert(
    //                 'success',
    //                 '인증번호가 전송되었습니다',
    //             )
    //         })
    //         .catch(err => {
    //             console.error(err);
    //             <Server500Err_Alert />
    //         })
    //         .finally(() => {
    //             setLoading(false);
    //         })
    // }

    const checkEmail = async (e) => {
        e.preventDefault();
    
        try {
            const res = await axios.get(`${url}/checkemail?email=${email}`);
            if (res.data === "success") {
                await SwalCustomAlert('success', '사용가능한 이메일 입니다');
    
                // 이메일 인증번호 요청
                setLoading(true);
                const response = await axios.get(`${url}/verify?email=${email}`);
                setEmailCode(response.data);
                await SwalCustomAlert('success', '인증번호가 전송되었습니다');
                setEmailCheck(true);
            } else {
                await SwalCustomAlert('fail', '중복된 이메일 입니다');
            }
        } catch (err) {
            console.error(err);
            <Server500Err_Alert />;
        } finally {
            setLoading(false);
        }    
    }

    const onChangeCode = (e) => {
        e.preventDefault();
        setCode(e.target.value);
        console.log(code);

    }
    const checkCode = (e) => {
        e.preventDefault();
        if (code == emailCode) {
            SwalCustomAlert(
                'success',
                '인증되었습니다',
            )

            setEmailCode();

        } else {
                SwalCustomAlert(
                'fail',
                '인증번호가 일치하지 않습니다',
                )
        }
            }

    const onChange = (e) => {
        e.preventDefault();
        const { value, name } = e.target;
        if (name === 'id') {
            setId(value);
            console.log("Id : " + value);

        } else if (name === 'password') {
            setPassword(value);

        } else if (name === 'passwordCheck') {
            setPasswordCheck(value);

        } else if (name === 'username') {
            setUserName(value);

        } else if (name === 'nickname') {
            setNickname(value);

        } else if (name === 'tel') {
            setTel(value);

        }
        else if (name === 'email') {
            setEmail(value);
        }
    }

    const handleSubBtnClick = (e) => {
        e.preventDefault();
        SwalCustomAlert(
            'agree',
            `<span class="tx-orange">${username}</span> 님 가입 하시겠습니까 ?`,
            '#F9950F',
            '가입하기',
            'true'
        ).then((result) => {
            if (result.isConfirmed) {
                idcheck && nicknamecheck ?
                    submit(e) :
                    SwalCustomAlert(
                        'notice',
                        '아이디 또는 닉네임 중복 확인해주세요',
                    );
            }
        }
        );
    };


    return (
        <>
            {loading ? <Loding /> :
                <div className="web-container">

                    <div className="cd-container bg-white bg-dogs">
                        <main className="cd-main">
                            <Link to="/">
                                <section className="main-logo">
                                    <img src="/img/logo/logo_color.png" alt="댕냥꽁냥 로고" />
                                    <span className="main-logo-text">보호자 회원가입</span>
                                </section>
                            </Link>

                            {/**회원가입 폼 */}
                            <section className="form-section">
                                <form action="#" method="post" className="form-css">
                                    <div className="form-container">
                                        <div className="input-container">


                                            {/** 보호자 회원가입 Page
                                         * name : 보호자 이름
                                         * id : 보호자 ID
                                         * nickname : 보호자 닉네임
                                         * password : 보호자 패스워드
                                         * passwordCheck : 비밀번호 같은지 확인
                                         * tel : 보호자 전화번호                                         * 
                                         */}

                                            {/** 이름 */}
                                            <div className='input-for-label'>
                                                <label htmlFor="username" className="label-text">보호자 이름</label>
                                                <input type="text" id="username" name="username" placeholder="이름"
                                                    className="input-text" onChange={onChange} value={username} />
                                            </div>

                                            {/** 아이디 - 중복체크 */}
                                            <div className='input-for-label'>
                                                <label htmlFor="id" className="label-text">아이디</label>
                                                <div className="duplication-check">
                                                    <input type="text" id="id" name="id" placeholder="영문 대소문자와 숫자 4~12자리" defaultValue={userinfo ? userinfo.id : ""}
                                                        className="input-text" onChange={onChange} value={id} />
                                                    <button className="duplication-btn small-btn" onClick={checkId} >중복확인</button>
                                                </div>
                                            </div>

                                            {/** 닉네임 - 중복체크 */}
                                            <div className='input-for-label'>
                                                <label htmlFor="nickname" className="label-text">닉네임</label>
                                                <div className="duplication-check">
                                                    <input type="text" id="nickname" name="nickname" placeholder="한글 영문 대소문자와 숫자 4~12자리"
                                                        className="input-text" onChange={onChange} value={nickname} defaultValue={userinfo ? userinfo.nickname : ""} />

                                                    <button className="duplication-btn small-btn"
                                                        onClick={checkNickname} >중복확인</button>
                                                </div>
                                            </div>

                                            {/** 비밀번호 */}
                                            <div className='input-for-label'>
                                                <label htmlFor="password" className="label-text">비밀번호</label>
                                                <input type="password" id="password" name="password" placeholder="비밀번호 입력"
                                                    className="input-text" onChange={(e) => { onChange(e); changePass(e); }} value={password} />
                                            </div>

                                            {/** 비밀번호  체크*/}
                                            <div className='input-for-label'>
                                                <label htmlFor="passwordCheck" className="label-text">비밀번호 확인</label>
                                                <input type="password" id="passwordCheck" name="passwordCheck" placeholder="비밀번호를 한번더 입력해주세요."
                                                    className="input-text" onChange={(e) => { onChange(e); changePassCheck(e); }} value={passwordCheck} />
                                            </div>
                                            <span className="notice">{passMessage}</span>


                                            {/** 전화번호 */}
                                            <div className='input-for-label'>
                                                <label htmlFor="tel" className="label-text">전화번호 (핸드폰 번호)</label>
                                                <input type="text" id="tel" name="tel" placeholder="전화 번호/ 핸드폰 번호 중복 불가 합니다."
                                                    className="input-text" value={phoneNumber} onChange={telChange} maxLength={13} />
                                            </div>

                                            {/* 이메일 */}
                                            <div className='input-for-label'>
                                                <label htmlFor="email" className="label-text">이 메일</label>
                                                <div className="duplication-check">
                                                    <input type='text' id='email' name='email' placeholder='이메일 입력 후 인증번호를 입력해주세요'
                                                        className='input-text' onChange={onChange} value={email} defaultValue={userinfo ? userinfo.email : ""} />
                                                    <button className="duplication-btn small-btn"
                                                        onClick={checkEmail} >이메일 인증하기</button>
                                                </div>
                                            </div>

                                            {/* 인증번호 */}
                                            {emailCode &&
                                                <div className='input-for-label'>
                                                    <label htmlFor="code" className="label-text">인증번호</label>
                                                    <div className="duplication-check">
                                                        <input type='text' id='code' name='code' placeholder='입력하신 메일의 인증 번호를 확인해주세요'
                                                            className='input-text' onChange={onChangeCode} />
                                                        <button className="duplication-btn small-btn"
                                                            onClick={checkCode} >인증</button>
                                                    </div>
                                                </div>
                                            }

                                            {/** 로그인 비번/아이디찾기 */}
                                            <div className="login-tools">
                                                <div></div>
                                                <div>
                                                    <span className="logintool-text"><Link to="/userlogin">로그인</Link></span>
                                                    <span className="logintool-text"><Link to="/findid">계정찾기</Link></span>
                                                    <span className="logintool-text"><Link to="/findpassword">비밀번호 찾기</Link></span>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="button-container">
                                            {/** submit */}
                                            <button onClick={handleSubBtnClick} id="submit-btn" type="submit" className="main-btn btn-text magin-t-1">회원 가입</button>
                                            {/** 카카오톡 로그인 */}
                                            <div className="main-btn kakao-login-btn"><i className="fas fa-comment" >
                                            </i>
                                                <Link to="http://localhost:8090/oauth2/authorization/kakao">카카오 로그인</Link>
                                            </div>
                                        </div>

                                    </div>
                                </form>
                            </section>

                        </main>

                        <Footer />
                    </div>
                </div>
            }
        </>

    );
}

export default UserJoin;