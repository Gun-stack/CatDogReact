import { Link, Route, Routes } from "react-router-dom";
import Footer from "../../screens/Footer";
import Header from "../../screens/Header";
import PetReg from "./PetReg";
import UserModi from "../User_Modi/UserModi";
import { useEffect, useState } from "react";
import UserMylist from './UserMyList';
import Reservation from '../User_reservation/Reservation';
import ReservationCheck from '../User_reservation/ReservationCheck';
import UserModi_Nickname from '../User_Modi/UserModi_Nickname';
import UserModi_Tel from '../User_Modi/UserModi_Tel';
import UserModi_Password from '../User_Modi/UserModi_Password';
import PetRegForm from './PetRegForm';
import Error404 from "../../error/Error404";
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';
import { setUserStore } from '../../../actions';




function UserMy() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const user = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const dispatch = useDispatch();
    
    useEffect(() => {
        console.log(token);
        if (!isLoggedIn) {
            alert('로그인이 필요한 서비스입니다.');
            window.location.href = '/catdog/userlogin';
        }
        axios.get(`http://localhost:8090/userinfo?id=${user.id}`)
        .then((res)=>{  
            // console.log(res.data);
            dispatch(setUserStore(res.data));
            }
        )
        .catch((err)=>{console.log(err);})

    }, []  );




    return (
        <div className="web-container">
            <div className="cd-container bg-white bg-dogs">

                <Header />
                <main className="cd-main dis-center">
                    <section className="section-header">
                        <div className="section-header-container">
                            <span className="section-header-text">마이 페이지</span>
                        </div>
                    </section>

                    <Routes>
                        <Route path='/' element={<UserMylist />} />


                        <Route exact path='/petreg' element={<PetReg />} />
                        <Route exact path='/petregform' element={<PetRegForm />} />


                        <Route path='usermodi' element={<UserModi />} />
                        <Route path='modinick' element={<UserModi_Nickname />} />
                        <Route path='moditel' element={<UserModi_Tel />} />
                        <Route path='modipassword' element={<UserModi_Password />} />


                        <Route exact path='/reservation' element={<Reservation />} />
                        <Route exact path='/check/:num' element={<ReservationCheck />} />
                        <Route path='/*' element={<Error404/>}/>

                    </Routes>
                </main>
                <Footer />

            </div>
        </div>
    );
}

export default UserMy;
