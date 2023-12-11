import { Link, Route, Routes } from "react-router-dom";
import Footer from "../../screens/Footer";
import Header from "../../screens/Header";
import PetReg from "./PetReg";
import UserModi from "../User_Modi/UserModi";
import { useEffect } from "react";
import UserMylist from './UserMyList';
import Reservation from '../User_reservation/Reservation';
import ReservationCheck from '../User_reservation/ReservationCheck';
import UserModi_Nickname from '../User_Modi/UserModi_Nickname';
import UserModi_Tel from '../User_Modi/UserModi_Tel';
import UserModi_Password from '../User_Modi/UserModi_Password';
import PetRegForm from './PetRegForm';
import Error404 from "../../error/Error404";
import { useSelector } from 'react-redux';

import UserReviewForm from "../User_reservation/UserReviewForm";
import PetModi from './PetModi';
import { useNavigate } from "react-router";
import DesReg from "../../des_main_component/Des_My/DesReg";
import UserReviewList from '../User_reservation/UserReviewList';


function UserMy() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const navigate = useNavigate();

    useEffect(() => {

        if (!isLoggedIn) {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/main');
        }

    }, []);

    return (
        <div className="web-container">
            <div className="cd-container bg-white bg-dogs">

                <Header />
                <main className="cd-main dis-center">
                    <section className="section-header">
                        <div className="section-header-container">
                            <Link to="/usermy" > <span className="section-header-text">마이 페이지</span></Link>
                        </div>
                    </section>

                    <Routes>
                        <Route path='/' element={<UserMylist />} />

                        <Route exact path='/petreg' element={<PetReg />} />
                        <Route exact path='/petregform' element={<PetRegForm />} />
                        <Route exact path='/petmodi/:num' element={<PetModi />} />

                        <Route path='usermodi' element={<UserModi />} />
                        <Route path='modinick' element={<UserModi_Nickname />} />
                        <Route path='moditel' element={<UserModi_Tel />} />
                        <Route path='modipassword' element={<UserModi_Password />} />

                        <Route exact path='/reservation' element={<Reservation />} />
                        <Route exact path='/check/:num' element={<ReservationCheck />} />
                        <Route path='/reviewregform/:resnum' element={<UserReviewForm />} />
                        <Route path='/reservationdone/:desnum' element={<UserReviewList/>}/>

                        <Route exact path='/desreg' element={<DesReg />} />

                        <Route path='/*' element={<Error404 />} />

                    </Routes>
                </main>
                <Footer />

            </div>
        </div>
    );
}

export default UserMy;
