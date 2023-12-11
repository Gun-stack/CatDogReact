import { Link, Route, Routes } from "react-router-dom";
import Header from "../../screens/Header";
import DesMyList from "./DesMyList";
import Error404 from "../../error/Error404";
import ShopReg from "./ShopReg";
import ShopRegForm from "./ShopRegForm";
import DesInfo from "./DesInfo";
import DesReg from "./DesReg";
import DesResvList from "../Des_reservation/DesResvList";

function DesMy() {
    return (
        <div className="web-container ">
            <div className="cd-container bg-white bg-dogs">
                <Header />

                <main className="cd-main dis-center ">

                    <section className="section-header">
                        <div className="section-header-container">
                            <span className="section-header-text">마이 페이지</span>
                        </div>
                    </section>

                    {/* <Routes>
                        <Route path='/' element={<DesMyList />} />

                        <Route exact path='/shopreg' element={<ShopReg />} />
                        <Route exact path='/shopregform' element={<ShopRegForm />} />
                        {/* <Route exact path='/desinfo' element={<DesInfo />} />
                        <Route exact path='desreg' element={<DesReg />} />
                        <Route exact path='desresvlist' element={<DesResvList />} /> */}

                    {/* <Route exact path='/petreg' element={<PetReg />} />
                        <Route exact path='/petregform' element={<PetRegForm />} /> */}


                    {/* <Route path='modinick' element={<UserModi_Nickname />} />
                        <Route path='moditel' element={<UserModi_Tel />} />
                        <Route path='modipassword' element={<UserModi_Password />} />


                        <Route exact path='/check' element={<ReservationCheck />} />  */}
                    {/* <Route path='/*' element={<Error404/>}/>

                    </Routes> */}
                </main>

            </div>
        </div>
    );
}

export default DesMy;