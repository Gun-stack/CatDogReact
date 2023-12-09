import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { render } from '@testing-library/react';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function ShopResrevationDate(props) {
    //today
    const shopInfo = props.shopInfo;
    const desInfo = props.desInfo;
    const [selectDate, setSelectDate] = useState(new Date().toLocaleDateString('ko-KR').slice(0,11));
    

    const onChangeDate = (newValue) => {
        //toISOString: UTF 시간 기준이라 우리나라 시간으로 만들려면 9시간 빼야합니다
        const date = new Date(newValue.toISOString());

        // 한국 시간대로 조정 (UTC+9)
        const offset = date.getTimezoneOffset() * 60000;
        const koreaTime = new Date(date.getTime() - offset + (9 * 60 * 60000)); // UTC+9

        const isoString = koreaTime.toISOString().slice(0, 10);
        setSelectDate(isoString);
        console.log(isoString);
    };



    //지난 날짜는 선택못하게하기
    const disablePastDates = (date) => {
        //오늘날짜 기준
        return date.isBefore(new Date(), "day");
    };


    const resList = [{
        desNum: '1',
        date: '2023-12-08',
        time: '10:00'
    },
    {
        desNum: '1',
        date: '2021-09-09',
        time: '14:00'
    },
    {
        desNum: '1',
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    showDaysOutsideCurrentMonth
                    shouldDisableDate={disablePastDates}
                    onChange={onChangeDate} />
            </LocalizationProvider>
            {/* <input type="date" placeholder=" 날짜를 선택해주세요." onChange={onChangeDate} /> */}
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
                        <Link to={`/shop/${shopInfo.num}/reservation/${desInfo.num}/form`} state={{ data1: time, data2: selectDate }}>
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
