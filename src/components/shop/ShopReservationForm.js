import React, { useEffect } from 'react';

function ShopReservationForm({selectDate,time}) {
const selectDay= new Date(selectDate).getDay();
useEffect(() => {
    console.log(selectDay);
    console.log(selectDate);
    console.log(time);
}, [])


const user={
    userId: '1',
    nickName: '행복행',
    pet: '',
    petType: ''
}

    return (
        <div>
            <div>
                <hr className="divide-line" />
                <span className="form-text">{selectDate} {selectDay}</span>
                <hr className="divide-line" />
                <div className="reser-time-container magin-t-1">
                    <div className="reser-time">
                        <span className="reser-time-text">{time}</span>
                    </div>
                </div>
                <hr className="divide-line" />
                <div> <span className="form-text">예약자 닉네임 :</span> {user.nickName}</div>
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
                <div className="stylelist-content">
                    <div className="st-profile-container">
                        <div className="st-profile-img">
                            <img src="./img/gallrey-img/textimg.png" alt="등록한 반려동물 사진" className="st-profile-img" />
                        </div>
                        <div className="st-profile-context">
                            <div className="st-profile-name">
                                {user.pet}
                            </div>
                            <div className="st-profile-shop">
                                {user.petType}
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>

                    <div class="shop-btns">
                        <a href="shoppagestylelist.html"><button class="shop-btn small-btn btn-gray btn-text">취소</button></a>
                        <button class="shop-btn small-btn btn-text">예약하기</button>
                    </div>

        </div>
    );
}

export default ShopReservationForm;