import { Link, Route,Routes } from "react-router-dom";
import Footer from "../screens/Footer";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import SocialKakao from './SocialKakao';
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";



function UserLogin() {
    const [user, setUser] = useState ({id:"", password:""});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isautoLogin, setIsAutoLogin] = useState(false);

    const changeUser = (e) => {
        setUser({...user, [e.target.name]:e.target.value});
    }

    const login = (e) => {
        
        e.preventDefault();
        axios.post("http://localhost:8090/login", user)
            .then(res=> {
                console.log("token : " + res.headers);
                dispatch({type:"token", payload:res.headers.authorization});
                navigate("/main");
            })
            .catch(err=> {
                console.log(err);
            })
        
    } 
    const handleAutoLogin = (e) => {
        const toggle = document.querySelector('.fa-check-circle');
        if (toggle.classList.contains('active')) {
            setIsAutoLogin(true);
            toggle.classList.remove('active');
            toggle.style.color = '#ccc';
            console.log('자동로그인 해제' + isautoLogin);
        } else {
            setIsAutoLogin(false);
            toggle.classList.add('active');
            toggle.style.color = 'black';
            console.log('자동로그인 설정' + isautoLogin);
        }
    }

            

    

    return (
        <>
            {/** 보호자 로그인 페이지 */}
            <div className="web-container">
                <div className="cd-container bg-white bg-dogs">
                    <main className="cd-main">
                        <section className="main-logo">
                            <img src="/img/logo/logo_color.png" alt="댕냥꽁냥 로고" />
                            <span className="main-logo-text">보호자 로그인</span>
                        </section>
                        <section className="form-section">
                                <div className="form-container">
                                    <div className="input-container">
                                        {/** 보호자 로그인 
                                         * id : 보호자 ID
                                         * password : 보호자 패스워드
                                         */}
                                        {/** 보호자 ID */}
                                        <input type="text" id="id" name="id" placeholder="댕냥꽁냥 아이디" className="input-text" value={user.username} onInput={changeUser}/>
                                        {/** 보호자 비밀번호 */}
                                        <input type="password" id="password" name="password" placeholder="비밀번호" className="input-text" value={user.password} onInput={changeUser} />

                                        {/** 자동로그인, 회원가입 , 계정찾기, 비밀번호 찾기 */}
                                        <div className="login-tools">
                                            <span onClick={handleAutoLogin}><i className="fas fa-check-circle active"></i> 자동 로그인</span>
                                            <div>
                                                <span className="logintool-text"><Link to="/userjoin">회원가입</Link></span>
                                                <span className="logintool-text"><Link to="/findid">계정찾기</Link></span>
                                                <span className="logintool-text"><Link to="/findpassword">비밀번호 찾기</Link></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="button-container">
                                        {/** Submit BTN */}
                                        <button type="submit" className="main-btn btn-text magin-t-1"><div className="btn-text" onClick={login} >로그인</div></button>
                                        {/** 카카오 로그인 */}
                                        
                                            <div className="main-btn kakao-login-btn"><i className= "fas fa-comment" ></i><Link to="kakaologin">카카오톡 로그인</Link></div>
                                            <SocialKakao/>


                                        <Routes>
                                        <Route exactpath='/kakaologin/*' element={<SocialKakao/>}/>
                                        </Routes>

                                    </div>
                                </div>
                        </section>
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
}
export default UserLogin;
