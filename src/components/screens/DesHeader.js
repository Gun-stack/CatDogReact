import { useState } from "react";
import { Link } from "react-router-dom";


function DesHeader() {
    {/**
        디자이너 헤더 : 디자이너 ID 로 로그인 했을때 보여지는 네비
    */}
    const [isNavVisible, setIsNavVisible] = useState(false);
    const toggleNav = () => {
        setIsNavVisible(!isNavVisible);
    };
    return (
        <header className="cd-header">
            <div className="logo-icon-container">
                <div className="header-logo">
                    <Link to="/desmy"><img src="img/logo/logo_color.png" alt="로고 이미지" className="header-logo" /></Link>
                </div>

                <div className="icon-container">
                    <span className="header-btn header-btn-text">스타일리스트</span>
                    <button className="header-btn header-btn-text">로그아웃</button>
                    <i className="fa-solid fa-bars nav-icon" id="navIconBar" onClick={toggleNav}></i>
                </div>
            </div>

            <nav id="cdNavDropDown" className={`cd-nav ${isNavVisible ? '' : 'hidden'}`}>
                <ul className="nav-ul">
                    <li className="nav-li"><Link to="st-mypage.html">마이 페이지</Link><i className="fas fa-clipboard-list"></i></li>
                    <li className="nav-li"><Link to="st-shopreg.html">샵 정보 등록/수정</Link><i className="fas fa-store"></i></li>
                    <li className="nav-li"><Link to="st-dereg.html">디자이너 등록/수정</Link><i className="fas fa-cut"></i></li>
                    <li className="nav-li"><Link to="st-reschadule.html">예약관리</Link><i className="fas fa-clipboard-list"></i></li>
                </ul>
            </nav>
        </header>
    );
}

export default DesHeader;