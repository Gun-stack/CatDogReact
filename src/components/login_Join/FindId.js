import Footer from "../screens/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";

import {url} from'../../config';
import axios from 'axios';





function FindId() {
    const [email, setEmail] = useState('');

    
    

    const onChange = (e) => {
        setEmail(e.target.value);
    }
    const checkEmail = () => {
        axios.get(`${url}/findid?email=${email}`)
        .then(res => {
            console.log(res.data);
                
        })
        .catch(err => {
            console.log(err);
        })



    }
    




    return (
    <>
        <div className="web-container">
            <div className="cd-container bg-white bg-dogs">
                <main className="cd-main">
                <Link to="/">
                    <section className="main-logo">
                        <img src="/img/logo/logo_color.png" alt="댕냥꽁냥 로고" />
                        <span className="main-logo-text">계정 찾기</span>
                    </section>
                </Link>
                    <section className="form-section">
                            <div className="form-container">
                                <div className="input-container">

                                <div className="duplication-check">
                                    <input type='text' id='email' name='email' placeholder='이메일'className='input-text' onChange={onChange} />
                                    <button className="duplication-btn small-btn" onClick={checkEmail} >아이디 조회</button>
                                </div>

                                    <div className="login-tools">
                                        <span></span>
                                        <div>
                                            <span className="logintool-text"><Link to="/userjoin">회원가입</Link></span>
                                            <span className="logintool-text"><Link to="/findpassword">비밀번호 찾기</Link></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="button-container">
                                    <button type="submit" className="main-btn magin-t-1"><Link to="/userlogin" className="btn-text">로그인</Link></button>
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

export default FindId;