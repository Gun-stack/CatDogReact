import React from 'react';
import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

function ShopResrevationDate(desInfo) {
    const [selectDate, setSelectDate] = useState(new Date().toISOString().split('T')[0]);

    const onChangeDate = (e) => {
        setSelectDate(e.target.value);
    }   
    

    const resList = [{
        desNum: '1',
        date: '2023-11-30',
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


    const isReserved = (date, time) => {    
        const reserved = resList.find(res => res.date === date && res.time === time);
        return reserved;
    }

const availableTimes = ['10:00', '12:00', '14:00', '16:00'];




    return (
        <div>
            <hr className="divide-line" />
            <input type="date" placeholder="날짜를 선택해주세요."  onChange={onChangeDate} />   
            <hr className="divide-line" />
            {availableTimes.map(time => (
                <div key={time}>
                <div  className={`reser-time-container ${isReserved(selectDate, time) ? 'btn-gray' : ''}`}>
                    <div className="reser-time">
                        <Link to='form' selectDate={selectDate} time={time}  >
                            <span className="reser-time-text">{time}</span>
                        </Link>
                    </div>
                </div>
                <hr className="divide-line" key={`hr-${time}`} />
                </div>
                ))} 
        </div>
    );
}

export default ShopResrevationDate;
