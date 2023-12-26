
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import SwalCustomAlert from '../../Alerts/SwalCustomAlert';
import { url } from '../../../config';

function ReservationCheck() {
    const params = useParams();

    const [inputValue, setInputValue] = useState('')
    const [Modal, setModal] = useState(false);

    const user = useSelector((state) => state.user);
    const [pet, setPet] = useState([]);
    const [resv, setResv] = useState([]);
    const [des, setDes] = useState([]);
    const navigate = useNavigate();
    const token = useSelector(state => state.token);



    async function updateStyleT() {
        setModal(true);
        const { value: formValues } = await Swal.fire({
            title: '<span class="sweet-modal-title">스타일을 입력하세요.</span>',
            html: `
                <input id="swal-input2" type="text">
                `,
            focusConfirm: false,
            confirmButtonText:'수정',
            confirmButtonColor: '#F9950F',
            reverseButtons:true,
            showCancelButton:true,
            cancelButtonText: '취소',
            preConfirm: () => {
                return [
                    document.getElementById("swal-input2").value
                ];
            },
            inputValue,
        });
        if (formValues) {
            setInputValue(formValues[0]);
            SwalCustomAlert(
                'success',
                '스타일 저장되었습니다!'
            );
        }
    }

    //  유저의 펫 정보 리스트를 가져옴 
    useEffect(() => {

        console.log(user.id);
        console.log(params.num);


        // console.log("로그인 후 토큰 값 : " + token);
        axios.get(`${url}/user`, {
            headers: {
                Authorization: token,
            }
        })
            .then(res => {
                console.log("Res : " + res.data);
            })
            .catch(err => {
                // console.log("Err : " + err);
                SwalCustomAlert(
                    'warning',
                    "로그인 이후 사용 가능합니다."
                );
                navigate('/userlogin');
            })


        // console.log(resv);
        axios.get(`${url}/reservedetail?num=${params.num}`)
            .then((res) => {
                console.log(res.data);
                setResv(res.data.resv);
                setPet(res.data.pet);
                setDes(res.data.des);
            }
            )
            .catch((err) => {
                console.log(err);
            })
    }
        , [user.id, params.num]);




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
                <div className="re-date"> {resv.date} '{resv.time}'' 시</div>
                예약번호 : {resv.num}
                <div className='input-for-label'>
                    <label htmlFor="shopName" className="label-text">예약한 샵 이름</label>
                        <input name='shopName' type='text' className="input-text" value={resv.shopName} readOnly/>
                </div>

                <div className='input-for-label'>
                    <label htmlFor="petName" className="label-text">반려동물 이름</label>
                        <input name='petName' type='text' className="input-text" value={resv.petName} readOnly/>
                </div>

                <div className='input-for-label'>
                    <label htmlFor="breed" className="label-text">반려동물 품종</label>
                        <input name='breed' type='text' className="input-text" value={pet.breed} readOnly/>
                </div>

                <div className='input-for-label'>
                    <label htmlFor="age" className="label-text">반려동물 나이</label>
                        <input name='age' type='text' className="input-text" value={pet.age} readOnly/>
                </div>

                <div className='input-for-label'>
                    <label htmlFor="age" className="label-text">반려동물 성별</label>
                        <input name='age' type='text' className="input-text" value={pet.gender == '1' ? '수컷' : '암컷 '} readOnly/>
                </div>

                <div className='input-for-label'>
                    <label htmlFor="neuter" className="label-text">반려동물 중성화 여부</label>
                        <input name='neuter' type='text' className="input-text" value={pet.neuter == '1' ? '완료' : '미완료'} readOnly/>
                </div>

                {/* <div className='input-for-label'>
                    <label htmlFor="neuter" className="label-text">특이사항</label>
                        <input name='neuter' type='text' className="input-text" value={pet.petNote} readOnly/>
                </div> */}

                <div className='input-for-label magin-t-05'>
                    <label htmlFor="refText" className="label-text">스타일</label>
                        <input name='refText' type='text' className="input-text" Value={resv.refText}  readOnly/>
                        <button id="submit-btn" className="bg-orange style-btn" onClick={updateStyleT} >
                            <span className="tx-lightorg" >스타일 수정하기<i className="fas fa-cut tx-lightorg"></i>
                            </span>
                        </button>
                </div>

            </div>

        </section>

    );
}
export default ReservationCheck;