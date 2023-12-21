import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import SwalCustomAlert from '../../Alerts/SwalCustomAlert';
import Server500Err_Alert from '../../Alerts/Server500Err_Alert';
import { useNavigate } from "react-router";
import { url } from '../../../config';



function DesReservationForm(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const shopInfo = props.shopInfo;
    const desInfo = props.desInfo;
    const user = useSelector((state) => state.user);
    const pets = useSelector((state) => state.petList);
    const location = useLocation();
    const time = location.state?.data1;
    const sqlDate = location.state?.data2;

    const [selected, setSelected] = useState(false);

    const selectDays = new Date(sqlDate).getDay();
    const day = ['일', '월', '화', '수', '목', '금', '토'];
    const selectDay = day[selectDays];


    const [resvInfo, setResvInfo] = useState({
        userId: user.id,
        desId: desInfo.id,
        sid: shopInfo.sid,
        shopName: shopInfo.name,
        time: time,
        date: sqlDate,
        petName: '',
        status: '예약',
        isReview: 0,
        refText: '',
    });



    //선택된pet의 정보를 resvInfo에 넣어준다

    const selectPet = (pet) => {
        setResvInfo({
            ...resvInfo,
            petName: pet.name
        });
        console.log(resvInfo);
        setSelected(true);
    }




    const goBack = () => {
        navigate(-1);
    }


    const token = useSelector(state => state.token);
    useEffect(() => {
        console.log(shopInfo);

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

        axios.get(`${url}/petinfo?userId=${user.id}`)
            .then((res) => {
                console.log(res);
                dispatch({ type: 'SET_PET_LIST', payload: res.data });

            })
            .catch((err) => {
                console.log(err);
            })

    }
        , []);

    const onSubmit = async () => {
        try {

            // axios.post
            await axios.post(`${url}/makereservation`, resvInfo);
            SwalCustomAlert(
                '<img src="/img/logo/modal_success_logo.png"/>',
                '<span class="sweet-modal-title">예약이 완료 되었습니다</span>',
            );
            goBack();
        } catch (err) {
            console.log(err);
            Server500Err_Alert();
        }
    };








    return (
        <div>
            <div>
                <hr className="divide-line" />
                <span className="form-text" >{sqlDate} {selectDay}</span>
                <hr className="divide-line" />
                <div className="reser-time-container magin-t-1">

                    <div className="reser-time date-center">
                        <span className="reser-time-text"onClick={goBack}>{time}</span>
                    </div>
                </div>
                <hr className="divide-line" />
                <div> <span className="form-text">예약자 닉네임 :</span> {user.nickname}</div>
                <hr className="divide-line" />
                <div> <span className="form-text">반려동물 정보 </span>
                    <button className="bg-orange style-btn">
                        <span className="tx-lightorg">반려동물 정보 추가<i className="fas fa-cut tx-lightorg"></i></span>
                    </button>
                </div>
                <hr className="divide-line" />
                {user.pet === '' ?
                    <div className="input-img-click sm-input-img">
                        <p>반려동물을 추가하세요!</p>
                    </div>
                    :

                    pets.map((pet, index) => (
                        <div className='stylelist-content' onClick={() => selectPet(pet)} key={index}>
                            <div className="st-profile-container"  >
                                <div className="st-profile-img">
                                    <img src={`${url}/petimg/${pet.num}`} alt="등록한 반려동물 사진" className="st-profile-img" />
                                </div>
                                <div className="st-profile-context">
                                    <div className="st-profile-name">
                                        {pet.name}
                                    </div>
                                    <div className="st-profile-shop">
                                        {pet.dogOrCat === true ? '강아지' : '고양이'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))

                }
            </div>
            <div className="shop-btns">
                <Link to={`/shop/${shopInfo.num}/designer`}>
                    <button className="shop-btn small-btn btn-gray btn-text">
                        취소
                    </button></Link>
                <button className="shop-btn small-btn btn-text" onClick={onSubmit} >예약하기</button>
            </div>

        </div>
    );
}

export default DesReservationForm;