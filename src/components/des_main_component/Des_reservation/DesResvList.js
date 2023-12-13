import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../screens/Footer';



function DesResvList(props) {
    //today
    const shopInfo = props.shopInfo;
    const desInfo = props.desInfo;
    const [selectDate, setSelectDate] = useState(new Date().toLocaleDateString('ko-KR').slice(0, 11));


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

    const resList = [{
        desNum: '1',
        date: '2023-12-07',
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
    return (<>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                showDaysOutsideCurrentMonth
                onChange={onChangeDate} />
        </LocalizationProvider>

        <span className="form-text" style={{ cursor: 'pointer' }} >{selectDate}</span>

        {availableTimes.map(time => (
            <section key={time} className='reser-time-section'>
                {isReserved(selectDate, time) ? (
                    <div className={`reser-time-container btn-gray`}>
                        <div className="reser-time">
                            <span className="reser-time-text">{time}</span>
                        </div>
                    </div>
                ) : (
                    <Link to={``} state={{ data1: time, data2: selectDate }}>
                        <div className="reser-time-container reser-time-sm">
                            <div className="reser-time">
                                <span className="reser-time-text">{time}</span>
                            </div>
                        </div>
                        <p>
                            <br />
                            <span className='f-w-600'>반려동물 이름</span>
                            <br />
                            <span className='magin-t-1 f-size-14px'>반려동물 종류</span>
                            <br />
                        </p>
                    </Link>
                )}
                <hr className="divide-line magin-t-1" key={`hr-${time}`} />
            </section>
        ))}

    </>);
}

export default DesResvList;