import { Link } from "react-router-dom";
import Footer from "../screens/Footer";
import Swal from "sweetalert2";
import { useEffect,useState   } from "react";
import axios from "axios";



function UserJoin() {
    const[id,setId] = useState('');
    const[password,setPassword] = useState('');
    const[username,setUserName] = useState('');
    const[nickname,setNickname] = useState('');
    const[tel,setTel] = useState('');
    const[email,setEmail] = useState('');
    
    const[passwordCheck,setPasswordCheck] = useState('');
    const[idcheck,setIdCheck] = useState(false);
    const[nicknamecheck,setNicknameCheck] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        const joinInfo = {
            id : id,
            password : password,
            name : username,
            nickname : nickname,
            tel : tel,
            email : email,
        }
        console.log(joinInfo);

        axios.post('http://localhost:8090/userjoin',joinInfo)
        .then((res)=>{
            console.log(res);
            console.log(res.data);
            if(res.data === "joinsuccess"){
                Swal.fire({
                    icon: 'success',
                    title: '회원가입 성공',
                    text: '로그인 페이지로 이동합니다.',
                    confirmButtonColor: '#F9950F',
                    confirmButtonText: '확인',
                });
                // window.location.href("/userlogin");
                window.location.replace("userlogin");
            }else{
                Swal.fire({
                    icon: 'error',
                    title: '회원가입 실패',
                    text: '다시 시도해주세요.',
                    confirmButtonColor: '#F9950F',
                    confirmButtonText: '확인',
                });
            }
        })
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
            //아이디 정규식
            const idRegExp = /^[a-zA-Z0-9]{4,12}$/;
            if(!idRegExp.test(id)){
                Swal.fire({
                    title: '아이디는 영문 대소문자와 숫자 4~12자리로 입력해주세요',
                    icon: 'warning',
                    confirmButtonColor: '#F9950F',
                    confirmButtonText: '확인',
                });
                return false;
            }
            // db 조회
            axios.get(`http://localhost:8090/checkuserid?id=${id}`)
            .then(res=>{
                console.log("res.data : " + res.data);
                if(res.data === "success"){
                    Swal.fire({
                        title: '사용 가능한 아이디 입니다.',
                        icon: 'success',
                        confirmButtonColor: '#F9950F',
                        confirmButtonText: '확인',
                    });
                    setIdCheck(true);
                }else{
                    Swal.fire({
                        title: '중복된 아이디 입니다',
                        icon: 'warning',
                        confirmButtonColor: '#F9950F',
                        confirmButtonText: '확인',
                    });
                }
            })
            .catch(err=>{
                
            })   
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

            //닉네임 정규식
            const nicknameRegExp = /^[가-힣a-zA-Z0-9]{2,10}$/;
            if(!nicknameRegExp.test(nickname)){
                Swal.fire({
                    title: '닉네임은 한글,영문 대소문자와 숫자 2~10자리로 입력해주세요',
                    icon: 'warning',
                    confirmButtonColor: '#F9950F',
                    confirmButtonText: '확인',
                });
                return false;
            }

            axios.get(`http://localhost:8090/checkusernickname?nickname=${nickname}`)
            .then(res=>{
                if(res.data === "success"){
                    Swal.fire({
                        title: '사용 가능한 닉네임 입니다.',
                        icon: 'success',
                        confirmButtonColor: '#F9950F',
                        confirmButtonText: '확인'
                    });
                    setNicknameCheck(true);
                }else{
                    Swal.fire({
                        title: '중복된 닉네임 입니다',
                        icon: 'warning',
                        confirmButtonColor: '#F9950F',
                        confirmButtonText: '확인',
                    });
                }
            })
            .catch(err=>{
                
            })
            
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
        }else if(name === 'username'){
            setUserName(value);
            console.log('name  : ' + username);
        }else if(name === 'nickname'){
            setNickname(value);
            console.log('nickname  : ' + nickname);
        }else if(name === 'tel'){
            setTel(value);
            console.log('tel  : ' + tel);
        }
        else if(name === 'email'){
            setEmail(value);
            console.log('email  : ' + email);
        }
    }

    {/**모달 창 */}
    const handleSubBtnClick = (e) => {
        e.preventDefault();
        Swal.fire({
            title: username + ' 님',
            text: '가입 하시겠습니까?',
            iconHtml: '<i class="fa-solid fa-user tx-gray"></i>',
            showCancelButton: true,
            confirmButtonColor: '#F9950F',
            confirmButtonText: "가입하기",
        }).then((result) => {
            if (result.isConfirmed) {
                idcheck && nicknamecheck ?
                submit(e) :
                Swal.fire({
                    title: '아이디 또는 닉네임 중복확인을 해주세요',
                    icon: 'warning',
                    confirmButtonColor: '#F9950F',
                    confirmButtonText: '확인',
                });
            }
        }
        );
    };



    return (
        <>
            <div className="web-container">

                <div className="cd-container bg-white bg-dogs">
                    <main className="cd-main">

                        <section className="main-logo">
                            <img src="/img/logo/logo_color.png" alt="댕냥꽁냥 로고" />
                            <span className="main-logo-text">보호자 회원가입</span>
                        </section>

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
                                        <input type="text" id="username" name="username" placeholder="이름" 
                                            className="input-text" onChange={onChange} />

                                        {/** 아이디 - 중복체크 */}
                                        <div className="duplication-check">
                                            <input type="text" id="id" name="id" placeholder="아이디"
                                                className="input-text"onChange={onChange} />
                                            <button className="duplication-btn small-btn" onClick={checkId} >중복확인</button>
                                        </div>

                                        {/** 닉네임 - 중복체크 */}
                                        <div className="duplication-check">
                                            <input type="text" id="nickname" name="nickname" placeholder="닉네임"
                                                className="input-text" onChange={onChange}/>

                                            <button className="duplication-btn small-btn" 
                                            onClick={checkNickname} >중복확인</button>
                                        </div>

                                        {/** 비밀번호 */}
                                        <input type="password" id="password" name="password" placeholder="비밀번호"
                                            className="input-text" onChange={onChange} />

                                        {/** 비밀번호  체크*/}
                                        <input type="password" id="passwordCheck" name="passwordCheck" placeholder="비밀번호 확인"
                                            className="input-text"  onChange={onChange}/>
                                        
                                        {/** 전화번호 */}
                                        <input type="text" id="tel" name="tel" placeholder="전화 번호"
                                            className="input-text"  onChange={onChange}/>
                                        {/* 이메일 */}
                                        <input type='text' id='email' name='email' placeholder='이메일'
                                            className='input-text' onChange={onChange} />

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
                                        <div className="main-btn kakao-login-btn"><i className="fas fa-comment"></i>카카오톡 로그인</div>
                                    </div>

                                </div>
                            </form>
                        </section>

                    </main>

                    <Footer />
                </div>
            </div>
        </>

    );
}

export default UserJoin;