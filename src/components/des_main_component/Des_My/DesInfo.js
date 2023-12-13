import { Link, Route, Routes } from "react-router-dom";
import Home from "./Home";

function DesReg() {
    return (<>
        <div className="web-container wed-bg">
            <div className="cd-container bg-white bg-dogs">
                <main className="cd-main dis-center ">

                    <section className="shop-main-section bg-white">
                        <ul className="nav-ul">
                            <li className="nav-li">
                                <div>
                                    <i className="fas fa-caret-square-right mypage-arrow"></i>디자이너 수정하기
                                </div>
                                <i className="fas fa-cut"></i>
                            </li>
                        </ul>

                        {/* <!-- 디자이너 프로필 --> */}
                        <div className="stylelist-content">
                            <div className="st-profile-container">

                                <div className="st-profile-img">
                                    <img src="/img/gallrey-img/1.jpg" alt="디자이너 이미지" className="st-profile-img" />
                                </div>

                                <div className="st-profile-context">
                                    <div className="st-profile-name">
                                        스타일리스트 이름
                                    </div>
                                    <div className="st-profile-shop">
                                        스타일리스트 근무 샵
                                    </div>
                                    <div className="st-profile-info">
                                        스타일리스트 소개
                                    </div>
                                </div>

                            </div>

                            <div className="st-button-container">
                                <button className="st-button"><Link to="/usermy/home">갤러리<i className="fa-solid fa-image btn-icon"></i></Link></button>
                                <button className="st-button"><Link to="/usermy/usermodi">수정하기<i className="far fa-calendar-alt btn-icon"></i></Link></button>
                            </div>

                        </div>
                    </section>

                </main>


            </div>
        </div >
        <Routes>
                <Route path='/home' element={<Home />} />
        </Routes>

    </>);
}

export default DesReg;