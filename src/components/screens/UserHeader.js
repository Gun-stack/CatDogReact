import { useState } from "react";
import { useSelector,useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { logoutStore } from "../../actions";
import Swal from "sweetalert2";



function UserHeader() {

    const navigate = useNavigate();
    
    const onLogout = () => {
        Swal.fire({
            title: '로그아웃 하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '네',
            cancelButtonText: '아니오'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(logoutStore());
                Swal.fire(
                '로그아웃 되었습니다.',
                '',
                'success'
                )
                navigate('/');
            }
            })
            
    }





    {/* User 헤더 네비 */}
    const [isNavVisible, setIsNavVisible] = useState(false);

    const toggleNav = () => {
        setIsNavVisible(!isNavVisible);
    };

    const hideNav = () => {
            setIsNavVisible(false);
    };

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    return (
        <header className="cd-header" onMouseLeave={hideNav}>
        <div className="logo-icon-container">
            <div className="header-logo">
                <Link to="/main"><img src="/img/logo/logo_color.png" alt="로고 이미지" className="header-logo"/></Link>
            </div>
            <div className="icon-container">
                
                {isLoggedIn?
                <button className="header-btn header-btn-text" onClick={onLogout}>로그아웃</button>
                :
                <Link to ="/userlogin"><button className="header-btn header-btn-text">로그인</button></Link>
            }



                <i className="fa-solid fa-bars nav-icon" id="navIconBar" onClick={toggleNav}></i>
            </div>
        </div>
        <nav id="cdNavDropDown" className={`cd-nav ${isNavVisible ? '' : 'hidden'}`} >
            <ul className="nav-ul">
                <li className="nav-li"><Link to="/around">근처 샵 보기</Link><i className="fa-solid fa-map"></i></li>
                <li className="nav-li"><Link to="/gallery">갤러리 구경하기</Link><i className="fas fa-camera-retro"></i></li>
                <li className="nav-li"><Link to="/usermy/petregform">반려동물 등록하기</Link><i className="fas fa-paw"></i></li>
                <li className="nav-li"><Link to="/usermy/reservation">예약 확인하기</Link><i className="fas fa-clipboard-list"></i></li>
                <li className="nav-li"><Link to="/usermy">마이 페이지</Link><i className="fas fa-user"></i></li>
            </ul>
        </nav>
    </header>
    );
}

export default UserHeader;