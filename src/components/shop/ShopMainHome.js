import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loding from '../tools/Loding';
import { useSelector } from 'react-redux';

function ShopMainHome() {
    const shopInfo = useSelector((state) => state.shop);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user);

    // 스타일 리스트
    const [galleryList, setGalleryList] = useState([
    ]);

    useEffect(() => {
        axios.get('http://localhost:8090/desgalleryshop', {
            params: {
                num: shopInfo.num,
                offset: 0, // 필요한 페이지 번호
                limit: 6, // 페이지당 아이템 개수
            },
        })
            .then((res) => {
                console.log(res.data);
                setGalleryList([...res.data]);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    const isOwner = () => {
        if (user.id === shopInfo.id) {
            return true;
        } else {
            return false;
        }
    }

    const handleBtnClick = async (e) => {
        e.preventDefault();
        let btnValue = e.target.value;
        try {
            let result;
            switch (btnValue) {

                case 'titleimg':
                    result = await Swal.fire({
                        title: '<span class="sweet-modal-title">타이틀에 들어갈 사진을 올려주세요</span>',
                        input: 'file',
                        inputPlaceholder: '이미지 파일만 가능',
                        confirmButtonColor: '#F9950F',
                        showCancelButton: true,
                        confirmButtonText: '등록',
                        cancelButtonText: '취소',
                        confirmButtonColor: '#F9950F',
                        reverseButtons:'true',
                    });

                    if (result.isConfirmed && result.value) {
                        setLoading(true);
                        try {
                            const formData = new FormData();
                            formData.append('file', result.value); // 이미지 파일을 formData에 추가
                            formData.append('shopNum', shopInfo.num); // 미용실 번호 추가
                            const res = await axios.post('http://localhost:8090/regshopbgimg', formData
                            );
                            console.log(res);
                        } catch (error) {
                            Swal.fire({
                                title: '서버와의 통신이 실패했습니다',
                                confirmButtonColor: '#F9950F'
                            });
                        } finally {
                            setLoading(false);
                            window.location.reload();
                        }
                        console.log('입력한값:', result.value);
                    }

                    break;

                case 'notice':
                    result = await Swal.fire({
                        title: '공지사항',
                        input: 'textarea', // 텍스트 영역 입력
                        inputLabel: '공지사항을 작성하세요',
                        inputPlaceholder: '공지 내용 입력',
                        confirmButtonColor: '#F9950F',

                    });

                    if (result.isConfirmed && result.value) {
                        setLoading(true);
                        try {
                            const formData = new FormData();
                            formData.append('shopNum', shopInfo.num);
                            formData.append('notice', result.value);
                            const res = await axios.post('http://localhost:8090/regshopnotice', formData
                            );
                            console.log(res);
                        } catch (error) {
                            Swal.fire({
                                title: '서버와의 통신이 실패했습니다',
                                confirmButtonColor: '#F9950F'
                            });
                        } finally {
                            setLoading(false);
                            window.location.reload();
                        }
                        console.log('입력한값:', result.value);
                    }

                    break;

                case 'worktime':
                    result = await Swal.fire({
                        title: '영업시간',
                        input: 'text', // 일반 텍스트 입력
                        inputLabel: '영업시간을 입력하세요',
                        inputPlaceholder: '예: 월-금 9시 - 6시',
                        confirmButtonColor: '#F9950F',
                    });


                    if (result.isConfirmed && result.value) {
                        setLoading(true);
                        try {
                            const formData = new FormData();
                            formData.append('shopNum', shopInfo.num);
                            formData.append('worktime', result.value);
                            const res = await axios.post('http://localhost:8090/regshopworktime', formData
                            );
                            console.log(res);
                        } catch (error) {
                            Swal.fire({
                                title: '서버와의 통신이 실패했습니다',
                                confirmButtonColor: '#F9950F'
                            });
                        } finally {
                            setLoading(false);
                            window.location.reload();
                        }
                        console.log('입력한값:', result.value);
                    }

                    break;

                case 'shopinfo':
                    result = await Swal.fire({
                        title: '매장 정보',
                        input: 'text', // 일반 텍스트 입력
                        inputLabel: '영업시간을 입력하세요',
                        inputPlaceholder: '예: 월-금 9시 - 6시',
                        confirmButtonColor: '#F9950F',
                    });
                    if (result.isConfirmed && result.value) {
                        setLoading(true);
                        try {
                            const formData = new FormData();
                            formData.append('shopNum', shopInfo.num);
                            formData.append('info', result.value);
                            const res = await axios.post('http://localhost:8090/regshopinfo', formData
                            );
                            console.log(res);
                        } catch (error) {
                            Swal.fire({
                                title: '서버와의 통신이 실패했습니다',
                                confirmButtonColor: '#F9950F'
                            });
                        } finally {
                            setLoading(false);
                            window.location.reload();
                        }
                        console.log('입력한값:', result.value);
                    }



                    break;

                default:
                    return;
            }

        } catch (error) {
            console.error('에러 발생:', error);
        }
    };



    return (
        <>
            {loading ? <Loding /> :
                <div>
                    <div className="shop-title-text sm-text magin-t-1">공지사항 <i className="fas fa-check btn-icon"></i>

                        <>
                            <button className='info-input-btn' value='titleimg' onClick={handleBtnClick}>매장그림 올리기<i className="far fa-plus-square"></i></button>
                            <button className='info-input-btn' value='notice' onClick={handleBtnClick}>공지사항 입력 <i className="far fa-plus-square"></i></button>
                        </>


                    </div>

                    <div className="shop-form-container">
                        <div className="input-img-click sm-input-img">{shopInfo.notice}</div>
                    </div>
                    <div className="shop-title-text sm-text">영업시간<i className="fas fa-clock btn-icon"></i>

                        <button className='info-input-btn' value='worktime' onClick={handleBtnClick}>영업시간 입력 <i className="far fa-plus-square"></i></button>



                    </div>

                    <div className="shop-form-container">
                        <div className="input-img-click sm-input-img">{shopInfo.workTime}</div>
                    </div>
                    <div className="shop-title-text sm-text">매장위치<i className="fas fa-map-pin btn-icon"></i></div>
                    <div className="shop-address">{shopInfo.addressRoad}</div>
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

                    <div className="shop-title-text sm-text ma-top2rem">매장정보<i className="fas fa-info-circle btn-icon"></i>

                        <button className='info-input-btn' value='shopinfo' onClick={handleBtnClick}>매장정보 입력 <i className="far fa-plus-square"></i></button>


                    </div>
                    <div className="shop-form-container">
                        <p className="input-img-click sm-input-img">{shopInfo.info} </p>
                    </div>

                    <div className="shop-title-text sm-text ma-top2rem">스타일</div>


                    {galleryList.length > 0 ?
                        <div className="shop-form-container">
                            <div className="st-gallery-grid">
                                {galleryList.map((gallery, index) => (
                                    <div className="st-gallery-img" key={index} >
                                        <Link to={"/gallery/des/" + gallery.num}><img src={`http://localhost:8090/desgalview/${gallery.num}`} alt="" className="hover-img" /></Link>
                                        <div className="img-comment-hover">
                                            <span className="img-hover-icon"><i className="fas fa-heart" ></i>{gallery.likeCnt}</span>
                                            {/* <span className="img-hover-icon"><i className="fas fa-comment"></i>{gallery.galComment}</span> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        :
                        <div className="shop-form-container">
                            <div className="input-img-click sm-input-img">등록된 스타일이 없습니다</div>
                        </div>
                    }




                </div>

            }
        </>
    );
}

export default ShopMainHome;