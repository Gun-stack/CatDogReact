import { useNavigate } from "react-router-dom";
import Footer from "../screens/Footer";

function Error404() {
    let navigate = useNavigate();
    function goBack(){
        navigate(-1);
    }

    return (
        <div className="web-container">
            <div className="cd-container bg-white bg-dogs">
                <main className="cd-main">

                    <section className="err-section">
                        <div className="errpage-img-container">
                            <img src="/img/logo/err404.png" alt="404에러 그림" className="errpage-img" />
                        </div>
                        <div className="err-text">
                            <br />
                            <br />
                            <span className="err-title"> 404 ERROR </span> <br />
                            <br />
                            <hr className="divide-line" />
                            페이지를 찾을 수 없습니다.<br />
                            주소를 확인해주세요.
                            <br />
                            <br />
                            <div className="goback-div" onClick={goBack}><i className="fas fa-paw home-icon"></i><span className="f-w-600 goback-div">이전 페이지로 돌아가기</span></div>
                            <hr className="divide-line" />

                        </div>

                    </section>

                </main>
            </div>
        </div>
    );
}

export default Error404;