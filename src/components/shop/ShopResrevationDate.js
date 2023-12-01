import React from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function ShopResrevationDate(props) {
    //today
    const shopInfo = props.shopInfo;
    const desInfo = props.desInfo;
    const [selectDate, setSelectDate] = useState( new Date().toISOString().slice(0, 10));


    const onChangeDate = (e) => {
        setSelectDate(e.target.value);
    }  ;
    

    const resList = [{
        desNum: '1',
        date: '2023-12-01',
        time: '10:00'
    },
    {desNum: '1',
        date: '2021-09-09',
        time: '14:00'
    },
    {desNum: '1',
        date: '2021-09-09',
        time: '16:00'
    },
]

    // 예약된 시간인지 확인
    const isReserved = (date, time) => {    
        const reserved = resList.find(res => res.date === date && res.time === time);
        return reserved;
    };
    // 
    const availableTimes = ['10:00', '12:00', '14:00', '16:00'];





    return (
        <div>
            <hr className="divide-line" />
            <input type="date" placeholder=" 날짜를 선택해주세요."  onChange={onChangeDate} />   
            <span className="form-text" style={{ cursor: 'pointer' }} >{selectDate}</span>
            <hr className="divide-line" />
            {availableTimes.map(time => (
                <div key={time}>
                    {isReserved(selectDate, time) ? (
                        <div className={`reser-time-container btn-gray`}>
                            <div className="reser-time">
                                <span className="reser-time-text">{time}</span>
                            </div>
                        </div>
                    ) : (
                        <Link to= {`/shop/${shopInfo.num}/reservation/${desInfo.num}/form`} state={{ data1: time, data2: selectDate }}>
                            <div className="reser-time-container">
                                <div className="reser-time">
                                    <span className="reser-time-text">{time}</span>
                                </div>
                            </div>
                        </Link>
                    )}



                <hr className="divide-line" key={`hr-${time}`} />
                </div>
                ))} 
        </div>
    );
}

export default ShopResrevationDate;
