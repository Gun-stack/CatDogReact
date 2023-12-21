import { Link } from "react-router-dom";
import Footer from "./screens/Footer";


function Index() {

    return (
    <>
    <div className="web-container">
    <div className="cd-container main-background">
        <main className="cd-main ">
            {/* 인덱스 타이틀 로고 */}
            <section className="main-logo">
                <img src="/img/logo/logo_color.png" alt="댕냥꽁냥 로고"/>
                <h3 className="main-logo-text">댕댕이 냐옹이 토탈 미용서비스</h3>
            </section>


            <section className="main-login-join magin-b-5">

                {/* 보호자 회원가입 */}
                <div className="join-container">
                    <span className="main-info-text">강아지/고양이 보호자이신가요 ?</span>
                    <div className="main-btn">
                    <Link to="/userjoin" className="btn-text">회원가입</Link>
                    </div>
                </div>

                {/* 보호자 로그인 */}
                <div className="login-container">
                    <span className="main-info-text">댕냥꽁냥 회원이신가요 ?</span>
                    <div className="main-btn">
                        <Link to="/userlogin" className="btn-text">로그인</Link>
                    </div>
                </div>

            </section>

        </main>

    {/* 푸터입니다 */}
    <Footer/>
    </div>
    </div>
    </>

);
}

export default Index;