
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useSelector ,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';



function DesResvDetail() {
    const navigate = useNavigate();
    const params = useParams();
    const [inputValue, setInputValue] = useState('')
    const [Modal, setModal] = useState(false);
    const [styleT, setStyleT] = useState('');
    const dispatch = useDispatch();
    
    const [resv,setResv] = useState({ });
    const [pet1,setPet1] = useState({ });
    const [user,setUser] = useState({ });






    


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
                    showLoaderOnConfirm: true}
                ).then((result2) => {
                    if (result2.isConfirmed) {
                        console.log(result2.value);
                        const formData = new FormData();
                        formData.append('file', result1.value);
                        formData.append('text', result2.value);
                        formData.append('num', resv.num);
                        axios.post(`http://localhost:8090/completereserve`, formData)
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


//  유저의 펫 정보 리스트를 가져옴 
    useEffect(() => {

        axios.get(`http://localhost:8090/reservedetail?num=${params.resvnum}`)
        .then((res) => {
            console.log(res.data);
                setResv(res.data.resv);
                setPet1(res.data.pet);
                setUser(res.data.user);
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
                <div className="magin-t-1"><span className="re-text">샵 이름 :</span><span className="magin-l-05">{resv.shopName}</span></div>
                <div className="magin-t-1"><span className="re-text">반려동물 이름 :</span><span className="magin-l-05">{resv.petName}</span></div>

                <div className="magin-t-1"><span className="re-text">품종 :</span><span className="magin-l-05">{pet1.breed}</span></div>
                <div className="magin-t-1"><span className="re-text">나이 :</span><span className="magin-l-05">{pet1.age}</span></div>

                <div className="magin-t-1"><span className="re-text">성별 :</span><span className="magin-l-05">{pet1.gender=='1' ? '수컷' : '암컷 '}</span></div>
                <div className="magin-t-1"><span className="re-text">중성화 여부 :</span><span className="magin-l-05">{pet1.neuter=='1' ? '완료' : '미완료'}</span></div>
                <div className="magin-t-1"><span className="re-text">특이사항 :</span><span className="magin-l-05">{pet1.petNote}</span></div>
                
                <div className="magin-t-1"><span className="re-text">스타일 :</span><span className="magin-l-05">{inputValue}{resv.refText} </span>

                    <button id="submit-btn" className="bg-orange style-btn" onClick={CompleteImg} ><span className="tx-lightorg" >참조 사진 보기<i className="fas fa-cut tx-lightorg"></i></span></button>
                    
                    
                </div>

                <div className="magin-t-1"><span className="re-text">시술상태 : </span><span className="magin-l-05">{inputValue}{resv.status} </span>

                    <button id="submit-btn" className="bg-orange style-btn" onClick={CompleteImg} ><span className="tx-lightorg" >예약완료 사진 올리기<i className="fas fa-cut tx-lightorg"></i></span></button>
                    
                    
                </div>




                <hr className="divide-line" />
            </div>
        </section>

    );




}
export default DesResvDetail;