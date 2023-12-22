import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { setToken, logoutStore } from "../../actions";
import Swal from "sweetalert2";
import { persistor } from "../../App"
import axios from 'axios';


function UserHeader() {
    const user = useSelector((state) => state.user);
    const des = useSelector((state) => state.des);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const onLogout = () => {
        Swal.fire({
            html: '<img src="/img/logo/modal_notice_logo.png"/></span>',
            title: '<span class="sweet-modal-title">로그아웃 하시겠습니까?</span>',
            confirmButtonColor: '#F9950F',
            confirmButtonText: '네',
            showCancelButton: true,
            cancelButtonText: '아니오',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                persistor.purge();
                dispatch(logoutStore());
                dispatch(setToken("")); // 토큰 값이 남아 있어서 서버에 이전 로그인 사용자의 토큰값이 서버에 넘어감
                Swal.fire({
                    html: '<img src="/img/logo/modal_success_logo.png"/></span>',
                    title: '<span class="sweet-modal-title">로그아웃 되었습니다</span>',
                    confirmButtonColor: '#F9950F',
                    confirmButtonText: '확인',
                
                })
                navigate('/');
            }
        })
    }
    
    useEffect(() => {
        if (user.roles === 'ROLE_DES' || user.roles === 'ROLE_SHOP') {
            axios.get(`http://localhost:8090/desinfobyid?desId=${user.id}`)
                .then((res) => {
                    console.log("header" + JSON.stringify(res.data.des.num));
                    dispatch({ type: 'SET_DES', payload: res.data.des });
                })
        }
    }, [])


    {/* User 헤더 네비 */ }
    const [isNavVisible, setIsNavVisible] = useState(false);

    const toggleNav = () => {
        setIsNavVisible(!isNavVisible);
    };

    const hideNav = () => {
        setIsNavVisible(false);
    };
    const goBack = () => {
        navigate(-1);
    }



    return (
        <header className="cd-header" onMouseLeave={hideNav}>
            <div className="logo-icon-container">
                <div className="header-logo">
                <span onClick={goBack} ><i className="fa-solid fa-sharp fa-chevron-left fa-beat fa-lg goback-btn"></i></span>
                    <Link to="/main"><img src="/img/logo/logo_color.png" alt="로고 이미지" className="header-logo" /></Link>
                </div>
                <div className="icon-container">

                    {user.roles === 'ROLE_DES' || user.roles === 'ROLE_SHOP' &&
                        <Link to={`/des/${des.num}`} className="header-btn header-btn-text">디자이너</Link>
                    }

                    {isLoggedIn ?
                        <button className="header-btn header-btn-text" onClick={onLogout}>로그아웃</button>
                        :
                        <Link to="/userlogin"><button className="header-btn header-btn-text">로그인</button></Link>
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