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
import axios from "axios";
import { useDispatch } from "react-redux";

import UserReviewForm from "../User_reservation/UserReviewForm";
import PetModi from './PetModi';
import { useNavigate } from "react-router";
import DesReg from "../../des_main_component/Des_My/DesReg";

//리뷰관련
import UserReviewList from '../User_reservation/UserReviewList';
import UserReviewDetail from '../User_reservation/UserReviewDetail';
import UserReviewModi from '../User_reservation/UserReviewModi';
import ShopReg from "../../des_main_component/Des_My/ShopReg";
import ShopRegForm from "../../des_main_component/Des_My/ShopRegForm";
import DesInfo from "../../des_main_component/Des_My/DesInfo";

import DesResvList from "../../des_main_component/Des_reservation/DesResvList";

import DesModi from "../../des_main_component/Des_Modi/Des_Modi";
import ShopModiForm from '../../des_main_component/Des_My/ShopModiForm';
import DesResvDetail from '../../des_main_component/Des_reservation/DesResvDetail';
import { url } from "../../../config";





function UserMy() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const desInfo = useSelector((state) => state.des);
    const token = useSelector(state => state.token);

    useEffect(() => {
        console.log(user);
        console.log(desInfo);
        if (!isLoggedIn) {
            // alert('로그인이 필요한 서비스입니다.');
            // navigate('/main');
        }
        if(user.roles === "ROLE_DES" || user.roles === "ROLE_SHOP"){
            axios.get(`${url}/desinfobyid?desId=${user.id}`)
            .then((res) => {
                console.log("DESINFO : "+ JSON.stringify(res.data.des));
                dispatch({ type: 'SET_DES', payload: res.data.des })
            })
        }
    }, [user.roles]);

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
                        <Route path='modipassword' element={<UserModi_Password />} />



                        <Route path='desmodi' element={<DesModi />} />


                        <Route exact path='/reservation' element={<Reservation />} />
                        <Route exact path='/check/:num' element={<ReservationCheck  />  } />
                        <Route path='/reviewregform/:resnum' element={<UserReviewForm />} />
                        <Route path='/reservationdone/:desnum' element={<UserReviewList/>}/>
                        <Route path='/reviewdetail/:resnum' element={<UserReviewDetail/>}/>
                        <Route path='/reviewmodi/:reviewnum' element={<UserReviewModi/>}/>



                        <Route exact path='/desreg' element={<DesReg />} />
                        <Route exact path='/shopreg' element={<ShopReg />} />
                        <Route exact path='/shopregform' element={<ShopRegForm />} />
                        <Route exact path='/shopmodiform/:shopnum' element={<ShopModiForm />} />
                        
                        <Route exact path='/desinfo' element={<DesInfo />} />
                        <Route exact path='desresvlist' element={<DesResvList />} />
                        <Route exact path='deservedetail/:resvnum' element={<DesResvDetail/>}/>

       
                    
                


                        <Route path='/*' element={<Error404 />} />

                    </Routes>
                </main>
                <Footer />

            </div>
        </div>
    );
}

export default UserMy;
