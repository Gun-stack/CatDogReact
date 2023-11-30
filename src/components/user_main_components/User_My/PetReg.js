import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';


function PetReg() {


    return ( 
    <>
    <main className="cd-main dis-center">
        <section className="shop-main-section bg-white">
            <ul className="nav-ul">
                <li className="nav-li">
                    <div>
                        <i className="fas fa-caret-square-right mypage-arrow"></i>예약 확인 하기
                    </div>
                    <i className="fas fa-store"></i>
                </li>
            </ul> 
            <form action="" className="shop-form-container">
                
                <div className="input-img-click sm-input-img">
                    <p> 등록한 반려동물이 없습니다 <br/>
                        <Link to="/usermy/petregform">반려동물 등록하기 <i className="fas fa-plus-circle"></i></Link></p>
                </div>
            </form>

            <div class="stylelist-content">
                        <div className="st-profile-container">

                            <div className="st-profile-img">
                                <img src="/img/gallrey-img/textimg.png" alt="등록한 반려동물 사진" className="st-profile-img" />
                            </div>

                            <div className="st-profile-context">
                                <div className="st-profile-name">
                                    반려동물
                                </div>
                                <div className="st-profile-shop">
                                    반려동물 종류
                                </div>
                            </div>

                        </div>

                        <div className="st-button-container">
                            <a href="cl-petmodify.html"><button className="st-button">편집<i className="fas fa-pen btn-icon"></i></button></a>
                        </div>
                    </div>
                </section>


                </main>
            </> 
            );
        }

        export default PetReg;
