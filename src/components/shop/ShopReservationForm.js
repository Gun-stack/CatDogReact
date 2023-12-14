import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {useLocation} from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';



function ShopReservationForm(props) {

    const dispatch = useDispatch();
    const shopInfo = props.shopInfo;
    const desInfo = props.desInfo;
    const user = useSelector((state) => state.user);
    const pets = useSelector((state) => state.petList);

                

    const location= useLocation();
    const time = location.state?.data1;
    const sqlDate = location.state?.data2;
    
    const selectDays = new Date(sqlDate).getDay();
    const day = ['일', '월', '화', '수', '목', '금', '토'];
    const selectDay = day[selectDays];

    const [resvInfo, setResvInfo] = useState({
        userId: user.id,
        desId: desInfo.id,
        sid: shopInfo.sId,
        shopName: shopInfo.shopname,
        time: time,
        date: sqlDate,
        petName: '',
        status: '예약',
        isReview: 0
    });
    
    
    //선택된pet의 정보를 resvInfo에 넣어준다

    const selectPet = (pet) => {
        setResvInfo({
            ...resvInfo,
            petName: pet.name
        });
        console.log(resvInfo);
    }


    
    const goBack = () => {
        window.history.back();
    }
    useEffect(() => {
        axios.get(`http://localhost:8090/petinfo?userId=${user.id}`)
        .then((res) => {
            console.log(res);
            dispatch({type:'SET_PET_LIST',payload:res.data});

        })
        .catch((err) => {
            console.log(err);
        })
    
    }
    ,[]);

    const onSubmit = () => {
        axios.post('http://localhost:8090/makereservation',resvInfo)
        .then((res) => {
            console.log(res);
            dispatch({type:'SET_RESV',payload:res.data});
            Swal.fire({
                icon: 'success',
                title: '예약이 완료되었습니다',
                showConfirmButton: false,
                timer: 1500
            });
            window.history.back();
        })
        .catch((err) => {
            console.log(err);
        })
    }



    return (
        <div>
            <div>
                <hr className="divide-line" />
                <span className="form-text" >{sqlDate} {selectDay}</span>
                <hr className="divide-line" />
                <div className="reser-time-container magin-t-1">
                    <div className="reser-time">
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
                {user.pet ==='' ?   
                <div className="input-img-click sm-input-img">
                    <p>반려동물을 추가하세요!</p>
                </div>
                :

                pets.map((pet,index) => (
                <div className="stylelist-content" onClick={()=> selectPet(pet)} key={index}> 
                    <div className="st-profile-container"  >
                        <div className="st-profile-img">
                            <img src={`http://localhost:8090/petimg/${pet.num}`} alt="등록한 반려동물 사진" className="st-profile-img" />
                        </div>
                        <div className="st-profile-context">
                            <div className="st-profile-name">
                                {pet.name}
                            </div>
                            <div className="st-profile-shop">
                                {pet.dogOrCat=== true ? '강아지' : '고양이'}
                            </div>
                        </div>
                    </div>
                </div>
                ))
                
                }
            </div>

                    <div className="shop-btns">
                        <Link to ={`/shop/${shopInfo.num}/designer`}>   
                        <button className="shop-btn small-btn btn-gray btn-text">
                            취소
                            </button></Link>
                        <button className="shop-btn small-btn btn-text" onClick={onSubmit} >예약하기</button>
                    </div>

        </div>
    );
}

export default ShopReservationForm;