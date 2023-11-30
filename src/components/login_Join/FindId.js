import Footer from "../screens/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";





function FindId() {


    const [clPhoneNumber, setClPhoneNumber] = useState('');
    const [clPassword, setClPassword] = useState('');

    const onChange = (e) => {
        setClPhoneNumber(e.target.value);
        setClPassword(e.target.value);
    }
    //아이디 찾기 버튼 클릭시 폼으로 서버에 전송
    const submit = (e) => {
        e.preventDefault();
        const findIdInfo = {
            clPhoneNumber: clPhoneNumber,
            clPassword: clPassword
        }
        console.log(findIdInfo);
        // axios.post('http://localhost:8090/user/findid',findIdInfo)
        // .then((res)=>{
        //     console.log(res);
        //     console.log(res.data);
        //     if(res.data === 1){
        //         Swal.fire({
        //             icon: 'success',
        //             title: '아이디 찾기 성공',
        //             text: '아이디를 확인해주세요.',
        //             confirmButtonColor: '#F9950F',
        //             confirmButtonText: '확인',
        //         });
        //         history.push('/login');
        //     }else{
        //         Swal.fire({
        //             icon: 'error',
        //             title: '아이디 찾기 실패',
        //             text: '다시 시도해주세요.',
        //             confirmButtonColor: '#F9950F',
        //             confirmButtonText: '확인',
        //         });
        //     }
        // })
    }






    return (
    <>
        <div className="web-container">
            <div className="cd-container bg-white bg-dogs">
                <main className="cd-main">

                    <section className="main-logo">
                        <img src="/img/logo/logo_color.png" alt="댕냥꽁냥 로고" />
                        <span className="main-logo-text">계정 찾기</span>
                    </section>


                    <section className="form-section">
                        <form action="#" method="post" className="form-css">
                            <div className="form-container">
                                <div className="input-container">
                                    <input type="text" id="clPhoneNumber" name="cl-phone-number" placeholder="핸드폰 번호를 입력하세요"
                                        className="input-text" onChange={onChange} />
                                    <input type="password" id="clPassword" name="cl-password" placeholder="비밀번호 를 입력하세요"
                                        className="input-text" onChange={onChange} />
                                    <div className="login-tools">
                                        <span></span>
                                        <div>
                                            <span className="logintool-text"><Link to="/userjoin">회원가입</Link></span>
                                            <span className="logintool-text"><Link to="/findpassword">비밀번호 찾기</Link></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="button-container">
                                    <button type="submit" className="main-btn magin-t-1" onClick={submit}><Link to="cl-idresult.html" className="btn-text">아이디 찾기</Link></button>
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

export default FindId;