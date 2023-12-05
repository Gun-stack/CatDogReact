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




function UserMy() {
    const [showSection, setShowSection] = useState(true);
    const [userNickname, setUserNickname] = useState('보호자 닉네임');



    useEffect(() => {
        const userNickname = localStorage.getItem('userNickname');
        setShowSection(true);
        setUserNickname(userNickname);
    }, []);



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
                        <Route exact path='/check' element={<ReservationCheck />} />
                        <Route path='/*' element={<Error404/>}/>

                    </Routes>
                </main>
                <Footer />

            </div>
        </div>
    );
}

export default UserMy;
