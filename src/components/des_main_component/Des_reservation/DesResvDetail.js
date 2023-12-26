
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { url } from '../../../config';



function DesResvDetail() {
    const navigate = useNavigate();
    const params = useParams();
    const [inputValue, setInputValue] = useState('')

    const [resv, setResv] = useState({});
    const [pet1, setPet1] = useState({});

    //swal창으로 이미지 업로드하기
    const CompleteImg = () => {
        Swal.fire({
            title: '예약완료 사진 업로드',
            text: '예약완료 사진을 업로드해주세요',
            input: 'file',
            inputPlaceholder: '예약완료 사진을 업로드해주세요',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            showLoaderOnConfirm: true
        }).then((result1) => {
            if (result1.isConfirmed) {
                console.log(result1.value);
                Swal.fire({
                    title: '시술내용 입력',
                    input: 'text',
                    inputPlaceholder: '시술내용을 입력해주세요',
                    showCancelButton: true,
                    confirmButtonText: '확인',
                    cancelButtonText: '취소',
                    showLoaderOnConfirm: true
                }
                ).then((result2) => {
                    if (result2.isConfirmed) {
                        console.log(result2.value);
                        const formData = new FormData();
                        formData.append('file', result1.value);
                        formData.append('text', result2.value);
                        formData.append('num', resv.num);
                        axios.post(`${url}/completereserve`, formData)
                            .then((res) => {
                                console.log(res);
                                Swal.fire('업로드 완료', '', 'success');
                                navigate('/usermy/desresvlist');

                            })
                            .catch((err) => {
                                console.log(err);
                                Swal.fire('업로드 실패', '', 'error');
                            })
                    }
                }
                );
            }

        })
    }

    const viewImg = () => {
       
        Swal.fire({
            title: '스타일을 확인하세요',
            imageUrl: `${url}/resimg/${resv.refImg}`,
            imageWidth: 400,
            imageHeight: 400,
            imageAlt: 'Custom image',
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            showLoaderOnConfirm: true
        })
    }


    //  유저의 펫 정보 리스트를 가져옴 
    useEffect(() => {
        axios.get(`${url}/reservedetail?num=${params.resvnum}`)
            .then((res) => {
                console.log(res.data);
                setResv(res.data.resv);
                setPet1(res.data.pet);
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
                        <input name='breed' type='text' className="input-text" value={pet1.breed} readOnly/>
                </div>

                <div className='input-for-label'>
                    <label htmlFor="age" className="label-text">반려동물 나이</label>
                        <input name='age' type='text' className="input-text" value={pet1.age} readOnly/>
                </div>

                <div className='input-for-label'>
                    <label htmlFor="age" className="label-text">반려동물 성별</label>
                        <input name='age' type='text' className="input-text" value={pet1.gender == '1' ? '수컷' : '암컷 '} readOnly/>
                </div>

                <div className='input-for-label'>
                    <label htmlFor="neuter" className="label-text">반려동물 중성화 여부</label>
                        <input name='neuter' type='text' className="input-text" value={pet1.neuter == '1' ? '완료' : '미완료'} readOnly/>
                </div>

                {/* <div className='input-for-label'>
                    <label htmlFor="neuter" className="label-text">특이사항</label>
                        <input name='neuter' type='text' className="input-text" value={pet1.petNote} readOnly/>
                </div> */}

                <div className='input-for-label magin-t-05'>
                    <label htmlFor="refText" className="label-text">스타일</label>
                        <input name='refText' type='text' className="input-text" value={resv.refText} readOnly/>
                    <button id="submit-btn" className="bg-orange style-btn" onClick={viewImg} ><span className="tx-lightorg" >참조 사진 보기<i className="fas fa-cut tx-lightorg"></i></span></button>
                </div>

                <div className='input-for-label magin-t-05'>
                    <label htmlFor="status" className="label-text">시술상태</label>
                        <input name='status' type='text' className="input-text" value={resv.status}  readOnly/>
                        <button id="submit-btn" className="bg-orange style-btn" onClick={CompleteImg} ><span className="tx-lightorg" >예약완료 사진 올리기<i className="fas fa-cut tx-lightorg"></i></span></button>
                </div>

                <hr className="divide-line" />
            </div>
        </section>

    );




}
export default DesResvDetail;