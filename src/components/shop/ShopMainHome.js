import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loding from '../tools/Loding';

function ShopMainHome({ shopInfo }) {
    const { num } = useParams();
    console.log(shopInfo);

    const [loading, setLoading] = useState(false);

    const handleBtnClick = async (e) => {
        e.preventDefault();
        let btnValue = e.target.value;

        try {
            let result;
            switch (btnValue) {

                case 'titleimg':
                    result = await Swal.fire({
                        title: '타이틀 사진',
                        input: 'file',
                        inputLabel: '사진을 가져오세요',
                        inputPlaceholder: '이미지 파일만 가능',
                        confirmButtonColor: '#F9950F',

                    });
                    break;

                case 'notice':
                    result = await Swal.fire({
                        title: '공지사항',
                        input: 'textarea', // 텍스트 영역 입력
                        inputLabel: '공지사항을 작성하세요',
                        inputPlaceholder: '공지 내용 입력',
                        confirmButtonColor: '#F9950F',

                    });
                    break;

                case 'worktime':
                    result = await Swal.fire({
                        title: '영업시간',
                        input: 'text', // 일반 텍스트 입력
                        inputLabel: '영업시간을 입력하세요',
                        inputPlaceholder: '예: 월-금 9시 - 6시',
                        confirmButtonColor: '#F9950F',

                    });
                    break;

                case 'shopinfo':
                    result = await Swal.fire({
                        title: '매장 정보',
                        input: 'text', // 일반 텍스트 입력
                        inputLabel: '영업시간을 입력하세요',
                        inputPlaceholder: '예: 월-금 9시 - 6시',                   
                        confirmButtonColor: '#F9950F',
                    });
                    break;

                default:
                    return;
            }

            if (result.isConfirmed && result.value) {
                // setLoading(true);
                // try{
                //     const res = await axios.post('http://localhost:8090/regshopnotice',result.value);
                //     console.log(res);
                // }catch(error){
                //     console.error;
                //     Swal.fire({
                //         title: '서버와의 통신이 실패했습니다',
                //         confirmButtonColor: '#F9950F'
                //     });
                // }finally{
                //     setLoading(false);
                // }
                console.log('입력한값:', result.value );
            }
        } catch (error) {
            console.error('에러 발생:', error);
        }
    };

    return (
        <>
        { loading ? <Loding/> :
            <div>
            <div className="shop-title-text sm-text magin-t-1">공지사항 <i class="fas fa-check btn-icon"></i>
                <button className='info-input-btn' value='titleimg' onClick={handleBtnClick}>매장그림 올리기<i class="far fa-plus-square"></i></button>
                <button className='info-input-btn' value='notice' onClick={handleBtnClick}>공지사항 입력 <i class="far fa-plus-square"></i></button>
            </div>

            <div className="shop-form-container">
                <div className="input-img-click sm-input-img">{shopInfo.notice}</div>
            </div>
            <div className="shop-title-text sm-text">영업시간<i className="fas fa-clock btn-icon"></i>
                <button className='info-input-btn' value='worktime' onClick={handleBtnClick}>영업시간 입력 <i class="far fa-plus-square"></i></button>
            </div>

            <div className="shop-form-container">
                <div className="input-img-click sm-input-img">{shopInfo.worktime}</div>
            </div>
            <div className="shop-title-text sm-text">매장위치<i className="fas fa-map-pin btn-icon"></i></div>
            <div className="shop-address">{shopInfo.address}</div>
            <hr className="divide-line" />
            <div className="shop-main-icons">

                <a href={shopInfo.tel}>
                    <div className="main-icon">
                        <i className="fas fa-phone main-icon-style color-nomal"></i>
                        <div>전화문의</div>
                    </div>
                </a>

                <Link to="style">
                    <div className="main-icon">
                        <i className="fas fa-dog main-icon-style"></i>
                        <div>스타일 보기</div>
                    </div>
                </Link>

                <Link to="designer">
                    <div className="main-icon">
                        <i className="far fa-calendar-alt main-icon-style color-nomal"></i>
                        <div>예약하기</div>
                    </div>
                </Link>

            </div>
            <hr className="divide-line" />

            <div className="shop-title-text sm-text ma-top2rem">매장정보<i class="fas fa-info-circle btn-icon"></i>
                <button className='info-input-btn' value='shopinfo' onClick={handleBtnClick}>매장정보 입력 <i class="far fa-plus-square"></i></button>
            </div>
            <div className="shop-form-container">
                <p className="input-img-click sm-input-img">{shopInfo.info} </p>
            </div>

            <div className="shop-title-text sm-text ma-top2rem">스타일</div>
            <div className="shop-form-container">
                <div className="input-img-click sm-input-img">등록된 스타일이 없습니다</div>
            </div>
            </div>
            
            }
        </>
    );
}

export default ShopMainHome;