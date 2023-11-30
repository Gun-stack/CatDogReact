
import React, { useState } from 'react';
import Header from '../../screens/Header';
import Footer from '../../screens/Footer';
import { useEffect } from 'react';
import axios from 'axios';
import {  Link } from 'react-router-dom';
import Swal from 'sweetalert2';
function ReservationCheck() {

const [Modal, setModal] = useState(false);
const [styleT, setStyleT] = useState('');
// async function getRes(){
//     const res = await axios.get('http://localhost:8090/reservation/1');
//     console.log(res.data);
//     setRes(res.data);
// }
// async function getPet(){
//     const pet = await axios.get('http://localhost:8090/pet/1');
//     console.log(pet.data);
//     setPet(pet.data);
// // }
// useEffect(() => {
//     getRes();
//     getPet();
// }, []);


async function updateStyleT(){
    setModal(true);
    const { value: text } =  await Swal.fire({
        input: "textarea",
        inputLabel: "스타일을 수정하세요",
        inputPlaceholder: "내용을 수정하세요",
        inputAttributes: {
        "aria-label": "내용을 수정하세요"
        },
        showCancelButton: true
      });
      if (text) {
        Swal.fire(text);
        setStyleT(text);
        console.log(text);
      }
    }
    

// async function updateStyle(){
//     const res = await axios.put('http://localhost:8090/reservation/1', {
//         resNum: '1',
//         userId:'user1',
//         desId: 'des1',
//         petName: '석탄이' ,
//         shopId : 'shop1',
//         resDate: '2023-12-01',
//         resTime: '12:00',
//         resState: false ,
//         refImg: '',
//         refText: styleT,
//         notice: '배가 고파요',
//         isReview: false,

//     });


    
    
    
    

    const[res, setRes] = useState({
        resNum: '1',
        userId:'user1',
        desId: 'des1',
        petName: '석탄이' ,
        shopId : 'shop1',
        resDate: '2023-12-01',
        resTime: '12:00',
        resState: false ,
        refImg: '',
        refText: '샤기컷으로 해주세요',
        notice: '배가 고파요',
        isReview: false,
    });

    const[pet, setPet] = useState({
        petNum: '1',
        petNameame: '석탄이',
        DogOrCat : true,
        breed : '스코티시테리어',
        gender  : false,
        dointake   : true,
        petnote : '사나우니 조심해주세요',
        userId : 'user1',
        weight : '10',
        age : '10',
        vaccine : true,
    });





    
    return (
        <div>

            


        
            <section className="shop-main-section bg-white">
                <ul className="nav-ul">
                    <li className="nav-li">
                        <div>
                            <i className="fas fa-caret-square-right mypage-arrow"></i>예약 확인 하기
                        </div>
                        <i className="fas fa-store"></i>
                    </li>
                </ul>   





                <div className="reservation-container">
                    <hr className="divide-line" />
                    <div className="re-date">{res.resDate}  {res.resTime}시</div>

                    <div className="magin-t-1"><span className="re-text">샵 이름 :</span><span className="magin-l-05">{res.shopId}</span></div>
                    <div className="magin-t-1"><span className="re-text">반려동물 이름 :</span><span className="magin-l-05">{res.petName}</span></div>
                    <div className="magin-t-1"><span className="re-text">품종 :</span><span className="magin-l-05">{pet.breed}</span></div>
                    <div className="magin-t-1"><span className="re-text">성별 :</span><span className="magin-l-05">{pet.gender?'수컷':'암컷 '}</span></div>
                    <div className="magin-t-1"><span className="re-text">중성화 여부 :</span><span className="magin-l-05">{pet.dointake?'완료':'미완료'}</span></div>    
                    <div className="magin-t-1"><span className="re-text">특이사항 :</span><span className="magin-l-05">{pet.petnote}</span></div>
                    <div className="magin-t-1"><span className="re-text">스타일 :</span><span className="magin-l-05">{res.refText} </span>

                    <button id="submit-btn" className="bg-orange style-btn"onClick={updateStyleT} ><span className="tx-lightorg" >스타일 수정하기<i className="fas fa-cut tx-lightorg"></i></span></button></div>
                    <hr className="divide-line" />
                </div>
            </section>
    
    </div>

    );



    
}
export default ReservationCheck;