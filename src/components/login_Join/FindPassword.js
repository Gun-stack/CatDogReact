import React from 'react';
import Footer from '../screens/Footer';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {url} from'../../config';
import axios from 'axios';

function FindPassword() {
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const onChangeId = (e) => {
        setId(e.target.value);
    }

    const sendPassword = () => {
        axios.post(`${url}/temppasswordemail?id=${id}&email=${email}`)
        .then(res => {
            console.log(res.data);
            alert('임시 비밀번호가 발송되었습니다.');
            window.location.href = '/catdog';
        })
        .catch(err => {
            console.log(err);
        })
    }





    return (
        <div>
            <div className="web-container">
                <div className="cd-container bg-white bg-dogs">
                    <main className="cd-main">
                    <Link to="/">
                        <section className="main-logo">
                            <img src="/img/logo/logo_color.png" alt="댕냥꽁냥 로고" />
                            <span className="main-logo-text">비밀번호 찾기</span>
                        </section>
                    </Link>

                        <section className="form-section">
                                <div className="form-container">
                                    <div className="input-container">
                                         <input type="text" id="id" name="id" placeholder="아이디를 입력해주세요" className="input-text" onChange={onChangeId} />
                                        <input type="text" id="email" name="email" placeholder="가입한 이메일을 입력하세요" className="input-text" onChange={onChangeEmail} />

                                        <div className="login-tools">
                                            <span></span>
                                            <div>
                                                <span className="logintool-text"><Link to="/userjoin">회원가입</Link></span>
                                                <span className="logintool-text"><Link to="/findid">아이디 찾기</Link></span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="button-container">
                                        <button type="submit" onClick={sendPassword} className="main-btn magin-t-1">비밀번호 찾기</button>
                                    </div>
                                </div>
                        </section>
                    </main>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default FindPassword;