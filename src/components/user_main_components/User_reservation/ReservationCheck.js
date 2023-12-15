
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useSelector ,useDispatch } from 'react-redux';
import { PetStore } from '../../../actions';
function ReservationCheck() {
    const params = useParams();
    const [inputValue, setInputValue] = useState('')
    const [Modal, setModal] = useState(false);
    const [styleT, setStyleT] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const petList = useSelector((state) => state.petList);
    const resvList = useSelector((state) => state.resvList);

    
    //선택한 예약넘버와 같은 예약을 찾아온다
    //가져온 펫리스트중에 예약넘버의 펫이름과 같은 펫정보를 찾아온다
    
    const resv = resvList.find((resv) => resv.num == params.num);
    const pet1 = petList.find((pet) => pet.name == resv.petName);

    async function updateStyleT() {
        setModal(true);
        const { value: formValues } = await Swal.fire({
            title: "스타일을 수정하세요",
            html: `
                <input id="swal-input1" type="file">
                <input id="swal-input2" type="text">
                `,
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById("swal-input1").value,
                    document.getElementById("swal-input2").value
                ];
            },
            inputValue,
            showCancelButton: true,
            cancelButtonText: '취소'
        });
        if (formValues) {
            Swal.fire(JSON.stringify(formValues));
        }
    }

//  유저의 펫 정보 리스트를 가져옴 
    useEffect(() => {
        
        console.log(user.id);
        console.log(params.num);
        console.log(resv);
        axios.get(`http://localhost:8090/petinfo?userId=${user.id}`)    
        .then((res) => {
            console.log(res.data);
                dispatch(PetStore(res.data));
            }
        )
        .catch((err) => {
            console.log(err);
        })  
    }
    , []);




    return (

        <section className="shop-main-section bg-white">
            <ul className="nav-ul">
                <li className="nav-li">
                <Link to="/usermy/reservation">
                    <div>
                        <i className="fas fa-caret-square-right mypage-arrow"></i>예약 확인 하기
                    </div>
                </Link>

                    <i className="fas fa-store"></i>
                </li>
            </ul>

            <div className="reservation-container">
                <hr className="divide-line" />
                <div className="re-date">{resv.date} {(resv.time).slice(0,-3)}시</div>
                예약번호 : {resv.num}
                <div className="magin-t-1"><span className="re-text">샵 이름 :</span><span className="magin-l-05">{resv.shopName}</span></div>
                <div className="magin-t-1"><span className="re-text">반려동물 이름 :</span><span className="magin-l-05">{resv.petName}</span></div>

                <div className="magin-t-1"><span className="re-text">품종 :</span><span className="magin-l-05">{pet1.breed}</span></div>
                <div className="magin-t-1"><span className="re-text">나이 :</span><span className="magin-l-05">{pet1.age}</span></div>

                <div className="magin-t-1"><span className="re-text">성별 :</span><span className="magin-l-05">{pet1.gender=='1' ? '수컷' : '암컷 '}</span></div>
                <div className="magin-t-1"><span className="re-text">중성화 여부 :</span><span className="magin-l-05">{pet1.neuter=='1' ? '완료' : '미완료'}</span></div>
                <div className="magin-t-1"><span className="re-text">특이사항 :</span><span className="magin-l-05">{pet1.petNote}</span></div>
                
                <div className="magin-t-1"><span className="re-text">스타일 :</span><span className="magin-l-05">{inputValue}{resv.refText} </span>

                    <button id="submit-btn" className="bg-orange style-btn" onClick={updateStyleT} ><span className="tx-lightorg" >스타일 수정하기<i className="fas fa-cut tx-lightorg"></i></span></button></div>
                <hr className="divide-line" />
            </div>
        </section>

    );




}
export default ReservationCheck;