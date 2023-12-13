import { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';



function PetReg() {

    //store에 있는 user.id로 서버에 요청해서 반려동물 정보 가져오기
    const user = useSelector(state => state.user);
    const petList = useSelector(state => state.pet);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`http://localhost:8090/petinfo?userId=${user.id}`)
        .then((res) => {
                dispatch({type:'SET_PET', payload:res.data} );
                console.log(res.data);
            }
        )
        .catch((err) => {
            console.log(err);
        })
    }
    , [user.id]);

    return ( 
    <>

    <main className="cd-main dis-center">
        <section className="shop-main-section bg-white">
            <ul className="nav-ul">
                <li className="nav-li">
                    <div>
                        <i className="fas fa-caret-square-right mypage-arrow"></i>반려동물 등록/수정 하기
                    </div>
                    <i className="fas fa-store"></i>
                </li>
            </ul> 

            <div className="shop-form-container">
                <div className="input-img-click sm-input-img">
                    {petList.length < 1 ?
                    <p> 등록한 반려동물이 없습니다 <br/>
                    <Link to="/usermy/petregform">반려동물 등록하기 <i className="fas fa-plus-circle"></i></Link></p>
                    : <p> <Link to="/usermy/petregform">반려동물 추가 등록하기 <i className="fas fa-plus-circle"></i></Link></p>
                }
                </div>
            </div>
            
            {petList.map((pet, idx) =>
                <div className="stylelist-content" key={idx}>
                        <div className="st-profile-container">
                            <div className="st-profile-img">
                                <img src={`http://localhost:8090/petimg/${pet.num}`}  alt="등록한 반려동물 사진" className="st-profile-img" />
                            </div>
                            <div className="st-profile-context">
                                <div className="st-profile-name">
                                    {pet.name}   / {pet.age} 살 
                                </div>
                                <div className="st-profile-shop">
                                    {pet.breed}
                                </div>
                                <div className="st-profile-shop" >
                                    {pet.petNote}
                                </div>
                            </div>
        
                        </div>

                        <div className="st-button-container">
                            <Link to ={`/usermy/petmodi/${pet.num}`}>
                            <button className="st-button">편집<i className="fas fa-pen btn-icon"></i></button></Link>
                        </div>
            </div>
            )}

            
        
                </section>
                </main>
                </> 
            );
        }

        export default PetReg;
