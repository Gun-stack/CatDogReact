import { DateCalendar, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../../screens/Footer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import SwalCustomAlert from '../../Alerts/SwalCustomAlert';
import { url } from '../../../config';



function DesResvList() {
    const navigate = useNavigate();
    //today
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const desInfo = useSelector((state) => state.des);
    const [sqlDate, setSqlDate] = useState(new Date().getFullYear() + '-' + (new Date().getMonth() + 1).toString().padStart(2, '0') + '-' + new Date().getDate().toString().padStart(2, '0'));
    const [selectDate, setSelectDate] = useState(new Date().toLocaleDateString('ko-KR').slice(0, 12));



    const onChangeDate = (newValue) => {
        //toISOString: UTF 시간 기준이라 우리나라 시간으로 만들려면 9시간 빼야합니다
        const date = new Date(newValue.toISOString());
        // 한국 시간대로 조정 (UTC+9)
        const offset = date.getTimezoneOffset() * 60000;
        const koreaTime = new Date(date.getTime() - offset + (9 * 60 * 60000)); // UTC+9

        const isoString = koreaTime.toLocaleDateString('ko-KR').slice(0, 12);
        console.log(isoString);
        setSelectDate(isoString);
        const month = (koreaTime.getMonth() + 1).toString().padStart(2, '0');
        const day = koreaTime.getDate().toString().padStart(2, '0');
        const sqlDate = `${koreaTime.getFullYear()}-${month}-${day}`;
        setSqlDate(sqlDate);
        console.log(sqlDate);

    };

    const resList = useSelector(state => state.resvList);


    const token = useSelector(state => state.token);


    useEffect(() => {
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
        if (user.roles == null || user.roles === 'ROLE_USER') {
            alert('잘못된 접근입니다.');
            navigate(-1);
        }

        axios.get(`${url}/resinfobydesnum?desNum=${desInfo.num}&date=${sqlDate}`)
            .then((res) => {
                dispatch({ type: 'SET_RESV_LIST', payload: res.data })
            }
            )
            .catch((err) => {
                console.log(err);
            })
        console.log(resList);
    }, [sqlDate]);




    // 예약된 시간인지 확인
    const isReserved = (date, time) => {
        const reserved = resList.find(resv => resv.date === date && resv.time === time);
        return reserved;
    };
    // 
    const availableTimes = ["10:00", "12:00", "14:00", "16:00"];



    return (<>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                showDaysOutsideCurrentMonth
                onChange={onChangeDate} />
        </LocalizationProvider>

        <span className="form-text" style={{ cursor: 'pointer' }} >{selectDate}</span>

        {availableTimes.map(time => (
            <section key={time} className='reser-time-section'>
                {isReserved(sqlDate, time) && isReserved(sqlDate, time).status == "예약" ?
                    (
                        <>
                            <Link to={`/usermy/deservedetail/${isReserved(sqlDate, time).num}`} state={{ data1: time, data2: sqlDate }} className='reser-time-done-container' >
                                <div className="reser-time-container ">
                                    <div className="reser-time reser-time-sm">
                                        <span className="reser-time-text">{time} 예약됨</span>
                                    </div>
                                </div>
                            <p>
                                <br />
                                <span className='f-w-600'>반려동물 이름 : {isReserved(sqlDate, time).petName}</span>
                                <br />
                                <span className='magin-t-1 f-size-14px'>주의사항  : {isReserved(sqlDate, time).notice} </span>
                                <br />
                            </p>
                            </Link>
                        </>

                    )
                    : isReserved(sqlDate, time) === undefined ?

                        (
                            <div className={`reser-time-container btn-gray`}>
                                <div className="reser-time">
                                    <span className="reser-time-text">{time} 예약안됨</span>
                                </div>
                            </div>
                        )
                        :
                        (
                            <div className={`reser-time-container btn-gray`}>
                                <div className="reser-time">
                                    <span className="reser-time-text">{time} 시술완료</span>
                                </div>
                            </div>
                        )
                }
                <hr className="divide-line magin-t-1" key={`hr-${time}`} />
            </section>
        ))}



    </>);
}

export default DesResvList;