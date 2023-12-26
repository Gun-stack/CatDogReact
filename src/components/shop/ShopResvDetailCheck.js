
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate,useLocation } from 'react-router';
import { url } from '../../config';
import { useSelector } from 'react-redux';
import SwalCustomAlert from '../Alerts/SwalCustomAlert';
import Server500Err_Alert from '../Alerts/Server500Err_Alert';




function DesResvDetail(props) {
    const resvInfo = useSelector(state => state.resvCheck);
    const shopInfo = props.shopInfo;
    const desInfo = props.desInfo;
    const user = useSelector(state => state.user);


    const navigate = useNavigate();


    const params = useParams();
    const [inputValue, setInputValue] = useState('')
    const [resv, setResv] = useState(resvInfo);
    const [pet1, setPet1] = useState({});
    
    

    useEffect(() => {
        console.log("resv"+ JSON.stringify(resvInfo));
        axios.get(`${url}/petinfobyidandname?userNum=${user.num}&petName=${resvInfo.petName}`)
        .then((res) => {
            console.log(res.data);
            setPet1(res.data);
        }
        )
        .catch((err) => {
            console.log(err);
        }
        )
    }, [resvInfo]);



    //swal창으로 이미지 업로드하기
    const CompleteImg = () => {
        console.log(resv);
        Swal.fire({
            title: '스타일 사진 업로드',
            text: '스타일 사진을 업로드해주세요',
            input: 'file',
            inputPlaceholder: '스타일 사진을 업로드해주세요',
            showCancelButton: true,
            confirmButtonText: '확인',
            cancelButtonText: '취소',
            showLoaderOnConfirm: true
        }).then((result1) => {
            if (result1.isConfirmed) {
                console.log(result1.value);
               const formData = new FormData();
               Swal.fire({
                   title: '스타일에 관한 설명',
                   input: 'text',
                   inputPlaceholder: '스타일을 설명해 주세요',
                   showCancelButton: true,
                   confirmButtonText: '확인',
                   cancelButtonText: '취소',
                   showLoaderOnConfirm: true
                }
                ).then(async (result2) => {
                    if (result2.isConfirmed) {
                        console.log(result2.value);
                        if (!(resv.petName === null)) {
                            try {
                                axios.post(`${url}/makereservation`,resv)
                                .then((res)=>{
                                    formData.append('text',result2.value);
                                    formData.append('file',result1.value);
                                    formData.append('num',res.data.num);
                                    axios.post(`${url}/addresvfile`,formData);
                                }
                                )
                                SwalCustomAlert(
                                    'success',
                                    '예약이 완료 되었습니다',
                                );
                                navigate(`/usermy/reservation`);
                            } catch (err) {
                                console.log(err);
                                Server500Err_Alert();
                            }
                        } else {
                            SwalCustomAlert(
                                'fail',
                                '펫을 선택해 주세요.',
                            );
                            return false;
                        }
                    }
                    
                }
                );
            }

        })
    }


    //  유저의 펫 정보 리스트를 가져옴 


    return (
        <section className="shop-main-section bg-white">
            <div className="reservation-container">
                <hr className="divide-line" />
                <div className="re-date"> {resvInfo.date} {'       '} '{resvInfo.time}' 시</div>
                {/* 예약번호 : {resv.num} */}
                <div className='input-for-label'>
                    <label htmlFor="shopName" className="label-text">예약한 샵 이름</label>
                        <input name='shopName' type='text' className="input-text" value={resvInfo.shopName} readOnly/>
                </div>

                <div className='input-for-label'>
                    <label htmlFor="petName" className="label-text">반려동물 이름</label>
                        <input name='petName' type='text' className="input-text" value={resvInfo.petName} readOnly/>
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


                <div className='input-for-label magin-t-05'>
                    <label htmlFor="refText" className="label-text">스타일</label>
                        {/* <input name='refText' type='text' className="input-text" defaultValuevalue={resv.refText} placeholder='원하는 스타일의 설명과 사진을 보여주세요' /> */}
                    <button id="submit-btn" className="bg-orange style-btn input-text" onClick={CompleteImg} ><span className="tx-lightorg" >사진 보여주고 예약하기 <i className="fas fa-cut tx-lightorg"></i></span></button>
                    
                </div>

                <hr className="divide-line" />
            </div>
        </section>

    );




}
export default DesResvDetail;