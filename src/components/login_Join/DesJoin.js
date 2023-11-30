import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Footer from "../screens/Footer";
import { useState } from "react";

function DesJoin() {
    const[id,setId] = useState('');
    const[password,setPassword] = useState('');
    const[passwordCheck,setPasswordCheck] = useState('');
    const[desname,setDesName] = useState('');
    const[nickname,setNickname] = useState('');
    const[idcheck,setIdCheck] = useState(false);
    const[nicknamecheck,setNicknameCheck] = useState(false);
    
    //회원가입 버튼 클릭시 폼으로 서버에 전송
    const submit = (e) => {
        // e.preventDefault();
        const joinInfo = {
            id : id,
            password : password,
            desname : desname,
            nickname : nickname,
        }
        console.log(joinInfo);
        // axios.post('http://localhost:8090/des/join',joinInfo)
        // .then((res)=>{
        //     console.log(res);
        //     console.log(res.data);
        //     if(res.data === 1){
        //         Swal.fire({
        //             icon: 'success',
        //             title: '회원가입 성공',
        //             text: '로그인 페이지로 이동합니다.',
        //             confirmButtonColor: '#F9950F',
        //             confirmButtonText: '확인',
        //         });
        //         history.push('/login');
        //     }else{
        //         Swal.fire({
        //             icon: 'error',
        //             title: '회원가입 실패',
        //             text: '다시 시도해주세요.',
        //             confirmButtonColor: '#F9950F',
        //             confirmButtonText: '확인',
        //         });
        //     }
        // })
    }



    //아이디 중복체크 여부 
    const checkId = (e) => {
        e.preventDefault();
        if(id === ''){
            Swal.fire({
                title: '아이디를 입력해주세요',
                icon: 'warning',
                confirmButtonColor: '#F9950F',
                confirmButtonText: '확인',
            });
        }else{
            Swal.fire({
                title: '사용 가능한 아이디 입니다.',
                icon: 'success',
                confirmButtonColor: '#F9950F',
                confirmButtonText: '확인',
            });
            setIdCheck(true);
        }
    }
    //닉네임 중복체크 여부
    const checkNickname = (e) => {
        e.preventDefault();
        if(nickname === ''){
            Swal.fire({
                title: '닉네임을 입력해주세요',
                icon: 'warning',
                confirmButtonColor: '#F9950F',
                confirmButtonText: '확인',
            });
        }else{
            Swal.fire({
                title: '사용 가능한 닉네임 입니다.',
                icon: 'success',
                confirmButtonColor: '#F9950F',
                confirmButtonText: '확인'
            });
            setNicknameCheck(true);
        }
    }
    //password 일치 여부
    const checkPassword = (e) => {
        e.preventDefault();
        if(password !== passwordCheck){
            Swal.fire({
                title: '비밀번호가 일치하지 않습니다.',
                icon: 'warning',
                confirmButtonColor: '#F9950F',
                confirmButtonText: '확인',
            });
        }else{
            Swal.fire({
                title: '비밀번호가 일치합니다.',
                icon: 'success',
                confirmButtonColor: '#F9950F',
                confirmButtonText: '확인',
            });
        }
    }

    //입력잘되나
    const onChange = (e) => {
        const {value,name} = e.target;
        if(name === 'id'){
            setId(value);
            console.log('id  : ' + id);
        }else if(name === 'password'){
            setPassword(value);
            console.log('password  : ' + password);
        }else if(name === 'passwordCheck'){
            setPasswordCheck(value);
            console.log('passwordCheck  : ' + passwordCheck);
        }else if(name === 'desname'){
            setDesName(value);
            console.log('name  : ' + desname);
        }else if(name === 'nickname'){
            setNickname(value);
            console.log('nickname  : ' + nickname);
        }
    }
    //회원가입 버튼 클릭시

    {/**모달 창 */ }
    const handleSubBtnClick = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "디자이너",
            text: '가입 하시겠습니까?',
            iconHtml: '<i class="fa-solid fa-user tx-gray"></i>',
            showCancelButton: true,
            cancelButtonText: '취소',
            confirmButtonColor: '#F9950F',
            confirmButtonText: "가입하기",
        }).then((result) => {
            if (result.isConfirmed) {
                idcheck && nicknamecheck ? 
                submit() :  
                Swal.fire({
                    title: '아이디 또는 닉네임 중복확인을 해주세요',
                    icon: 'warning',
                    confirmButtonColor: '#F9950F',
                    confirmButtonText: '확인',
                });          
                ;
            }

        });
    };


    return (
        <>
            <div className="web-container">
                <div className="cd-container bg-white bg-dogs">
                    <main className="cd-main">

                        <section className="main-logo">
                            <img src="/img/logo/logo_color.png" alt="댕냥꽁냥 로고" />
                            <span className="main-logo-text">스타일리스트 회원가입</span>
                        </section>


                        <section className="form-section">
                            <form action="#" method="post" className="form-css">
                                <div className="form-container">

                                    {/** 디자이너 회원가입
                                     * name : 디자이너 이름
                                     * id : 디자이너 아이디 - 중복체크
                                     * nickname : 디자이너 닉네임 - 중복체크
                                     * password : 디자이너 패스워드
                                     * passwordCheck : 패스워드 일치 체크
                                     */}

                                    <div className="input-container">

                                        {/* 디자이너 이름 */}
                                        <input type="text" id="desname" name="desname" placeholder="이름" className="input-text" onChange={onChange} />


                                        {/* 디자이너 아이디 : 중복체크 필요 */}
                                        <div className="duplication-check">
                                            <input type="text" id="id" name="id" placeholder="아이디" className="input-text" onChange={onChange} />
                                            <button className="duplication-btn small-btn" onClick={checkId}>중복확인</button>
                                        </div>

                                        {/* 디자이너 닉네임 : 중복체크 필요 */}
                                        <div className="duplication-check">
                                            <input type="text" id="nickname" name="nickname" placeholder="닉네임" className="input-text"onChange={onChange} />
                                            <button className="duplication-btn small-btn" onClick={ checkNickname}>중복확인</button>
                                        </div>

                                        {/* 디자이너 비밀번호 */}
                                        <input type="password" id="password" name="password" placeholder="비밀번호"
                                            className="input-text"onChange={onChange} />

                                        {/* 디자이너 비밀번호  일치체크*/}
                                        <input type="password" id="passwordCheck" name="passwordCheck" placeholder="비밀번호 확인"
                                            className="input-text" onChange={onChange} />

                                        {/* 로그인, 계정찾기, 비밀번호 찾기 */}
                                        <div className="login-tools">
                                            <div></div>
                                            <div>
                                                <span className="logintool-text"><Link to="/deslogin">로그인</Link></span>
                                                <span className="logintool-text"><Link to="/findid">계정찾기</Link></span>
                                                <span className="logintool-text"><Link to="cl-findpassword.html">비밀번호 찾기</Link></span>
                                            </div>
                                        </div>

                                    </div>
                                    
                                    {/* */}
                                    <div className="button-container">
                                        <button onClick={handleSubBtnClick} type="submit" className="main-btn btn-text magin-t-1">회원 가입</button>
                                        <div className="main-btn kakao-login-btn"><i className="fas fa-comment"></i>카카오톡 로그인</div>
                                    </div>

                                </div>
                            </form>
                        </section>
                    </main>

                <Footer/>
                </div>
            </div>
        </>
    )
}
export default DesJoin;