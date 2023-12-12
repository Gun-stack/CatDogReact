import React from 'react';
import Footer from '../screens/Footer';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function FindPassword() {
    const [email, setEmail] = useState('');
    const onChange = (e) => {
        setEmail(e.target.value);
    }

    return (
        <div>
            <div className="web-container">
                <div className="cd-container bg-white bg-dogs">
                    <main className="cd-main">

                        <section className="main-logo">
                            <img src="/img/logo/logo_color.png" alt="댕냥꽁냥 로고" />
                            <span className="main-logo-text">비밀번호 찾기</span>
                        </section>


                        <section className="form-section">
                            <form action="#" method="post" className="form-css">
                                <div className="form-container">
                                    <div className="input-container">
                                        <input type="text" id="email" name="email" placeholder="가입한 이메일을 입력하세요" className="input-text" onChange={onChange} />

                                        <div className="login-tools">
                                            <span></span>
                                            <div>
                                                <span className="logintool-text"><Link to="/userjoin">회원가입</Link></span>
                                                <span className="logintool-text"><Link to="/findid">아이디 찾기</Link></span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="button-container">
                                        <button type="submit" className="main-btn magin-t-1">비밀번호 찾기</button>
                                    </div>
                                </div>
                            </form>
                        </section>
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default FindPassword;