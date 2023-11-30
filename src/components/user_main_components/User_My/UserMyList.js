import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';

function UserMylist() {
    
    const [showSection, setShowSection] = useState(true);
    const [userNickname, setUserNickname] = useState('보호자 닉네임');



useEffect(() => {
    const userNickname = localStorage.getItem('userNickname');
    setShowSection(true);
    setUserNickname(userNickname);
}, []);

    return ( 
    <>
            <main className="cd-main dis-center">
            <section className="mypage-title-section">
                        <div className="mypage-title-container">
                            <div className="mypage-title-text">안녕하세요! <span className="color-nomal">{userNickname}</span>님!</div>
                        </div>
                    </section>
                        <section className={`shop-main-section ${showSection ? "" : "hidden"} bg-white`} >
                            <ul className="nav-ul">
                                <li className="nav-li ">
                                    <div>
                                        <i className="fas fa-caret-square-right mypage-arrow"></i><Link to="usermodi" >보호자 정보 수정하기</Link>
                                    </div>
                                    <i className="fas fa-store"></i>
                                </li>
                                <li className="nav-li">
                                    <div>
                                        <i className="fas fa-caret-square-right mypage-arrow"></i><Link to="reservation">예약 확인하기</Link>
                                    </div>
                                    <i className="fas fa-store"></i>
                                </li>
                                <li className="nav-li">
                                    <div>
                                        <i className="fas fa-caret-square-right mypage-arrow"></i><Link to= "petreg">반려동물 등록/수정하기</Link>
                                    </div>
                                    <i className="fas fa-store"></i>
                                </li>
                            </ul>
                        </section>
                </main>
            </> 
            );
        }

        export default UserMylist;
