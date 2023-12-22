import { Link } from "react-router-dom";
import Footer from "../screens/Footer";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken, setUserStore, loginStore, setAutoLogin } from "../../actions"; // 액션 생성자 가져오기
import Loding from "../tools/Loding";
import { url } from '../../config';
import SwalCustomAlert from "../Alerts/SwalCustomAlert";
import { useLocation } from 'react-router';



function UserLogin() {
    const token = useSelector(state => state.token);
    const [user, setUser] = useState({ id: "", password: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAutoLogin = useSelector((state) => state.isAutoLogin);
    const [loading, setLoading] = useState(false);
    const changeUser = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const { state } = useLocation();
    const [exit, setExit] = useState(state === "exit" ? state : "");

    //Enter key 누르면 로그인
    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            login();
        }
    };

    const login = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${url}/login`, user);
            console.log(res);
            const token = res.headers.authorization;
            const user1 = res.data;
            // console.log("res : " + JSON.stringify(res.data));
            if (user1.state === "1") {
                dispatch(setToken(token));
                dispatch(setUserStore(user1));
                dispatch(loginStore());
                navigate('/main');
            } else {
                SwalCustomAlert(
                    'notice',
                    '탈퇴한 회원입니다.',
                )
                dispatch(setToken(""));
                navigate('/userlogin');
            }

        } catch (error) {
            Swal.fire({
                html: '<img src="/img/logo/modal_success_logo.png"/>',
                title: '<span class="sweet-modal-title">아이디 또는 비밀번호를 확인해주세요.</span>',
                footer: '<a href="findid" class="sweet-modal-title tx-gray f-size-14px">아이디 또는 비밀번호를 잊으셨나요?</a>',
                confirmButtonColor: '#F9950F',
            })

        } finally {
            setLoading(false);
        }
    };

    const handleAutoLogin = () => {
        dispatch(setAutoLogin(!isAutoLogin));
        // console.log(isAutoLogin);

    };

    useEffect(() => {
        if (exit === "exit") {
            SwalCustomAlert(
                'fail',
                '탈퇴한 회원입니다.',
            );
            window.history.replaceState({}, document.title, window.location.pathname);
            setExit("");
            return;
        }

        // 컴포넌트가 마운트될 때 로컬 스토리지에서 자동 로그인 상태를 확인하여 Redux에 업데이트
        const storedIsAutoLogin = localStorage.getItem("isAutoLogin");
        if (storedIsAutoLogin === "true") {
            dispatch(setAutoLogin(true));
        }
    }, [dispatch]);


    return (
        <>
            {loading ? <Loding /> :
                <div className="web-container">
                    <div className="cd-container bg-white bg-dogs">
                        <main className="cd-main">
                            <Link to="/">
                                <section className="main-logo">
                                    <img src="/img/logo/logo_color.png" alt="댕냥꽁냥 로고" />
                                    <span className="main-logo-text">보호자 로그인</span>
                                </section>
                            </Link>
                            <section className="form-section">
                                <div className="form-container">
                                    <div className="input-container">
                                        {/** 보호자 로그인 
                                         * id : 보호자 ID
                                         * password : 보호자 패스워드
                                         */}
                                        {/** 보호자 ID */}
                                        <input type="text" id="id" name="id" placeholder="댕냥꽁냥 아이디" className="input-text" value={user.username} onInput={changeUser} />
                                        {/** 보호자 비밀번호 */}
                                        <input type="password" id="password" name="password" placeholder="비밀번호" className="input-text" value={user.password} onInput={changeUser} onKeyDown={handleOnKeyPress} />

                                        {/** 자동로그인, 회원가입 , 계정찾기, 비밀번호 찾기 */}
                                        <div className="login-tools">
                                            <span onClick={handleAutoLogin}>
                                                <i className={`fas fa-check-circle ${isAutoLogin ? 'active' : ' '} `}>
                                                </i> 자동 로그인</span>
                                            <div>
                                                <span className="logintool-text"><Link to="/userjoin">회원가입</Link></span>
                                                <span className="logintool-text"><Link to="/findid">계정찾기</Link></span>
                                                <span className="logintool-text"><Link to="/findpassword">비밀번호 찾기</Link></span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="button-container">
                                        {/** Submit BTN */}
                                        <button type="submit" className="main-btn btn-text magin-t-1" onClick={login} ><div className="btn-text">로그인</div></button>
                                        {/** 카카오 로그인 */}
                                        <div className="main-btn kakao-login-btn"><i className="fas fa-comment" >
                                        </i>
                                            <Link to={`${url}/oauth2/authorization/kakao`}>카카오 로그인</Link>
                                        </div>


                                    </div>
                                </div>
                            </section>
                        </main>
                        <Footer />
                    </div>
                </div>
            }
        </>
    );
}
export default UserLogin;
