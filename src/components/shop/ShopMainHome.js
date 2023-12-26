import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loding from '../tools/Loding';
import { useSelector } from 'react-redux';
import ImageUploading from 'react-images-uploading';
import Server500Err_Alert from '../Alerts/Server500Err_Alert';
import SwalCustomAlert from '../Alerts/SwalCustomAlert';
import { url } from '../../config';


function ShopMainHome() {
    const shopInfo = useSelector((state) => state.shop);
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.user);

    const [images, setImages] = useState([]);

    const maxNumber = 69;

    const onChange = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

    const [galleryList, setGalleryList] = useState([]);

    const token = useSelector(state => state.token);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${url}/user`, {
            headers: {
                Authorization: token,
            }
        })
            .then(res => {
                console.log("Res : " + res.data);
            })
            .catch(err => {
                SwalCustomAlert(
                    'warning',
                    "로그인 이후 사용 가능합니다."
                );
                navigate('/userlogin');
            })


        axios.get(`${url}/desgalleryshop`, {
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
    }, [shopInfo.num]);

    const handleBtnClick = async (e) => {
        e.preventDefault();
        let btnValue = e.target.value;
        try {
            let result;
            switch (btnValue) {

                case 'titleimg':
                    result = await SwalCustomAlert(
                        'agree',
                        '배경 사진을 올리시겠습니까?',
                        '#F9950F',
                        '등록',
                        true,
                        '취소',
                        true,
                    )
                    if (result.isConfirmed) {
                        setLoading(true);
                        try {
                            const formData = new FormData();
                            for (let image of images) {
                                formData.append("file", image.file);
                            }
                            formData.append('shopNum', shopInfo.num);
                            const res = axios.post(`${url}/regshopbgimg`, formData
                            );
                            console.log(res);
                            navigate(`/shop/${shopInfo.num}`);
                        } catch (error) {
                            console.error(error);
                            <Server500Err_Alert />
                        } finally {
                            setLoading(false);
                        }
                        window.location.reload();
                    }
                    break;

                case 'notice':
                    result = await Swal.fire({
                        title: '<span class="sweet-modal-title">공지사항</span>',
                        input: 'textarea', // 텍스트 영역 입력
                        html: '<span class="sweet-modal-title">공지사항 을 작성하세요</span>',
                        inputPlaceholder: '공지 내용 입력',
                        confirmButtonColor: '#F9950F',
                        confirmButtonText: '등록',
                        showCancelButton: true,
                        cancelButtonText: '취소',
                        reverseButtons: true,

                    });

                    if (result.isConfirmed && result.value) {
                        setLoading(true);
                        try {
                            const formData = new FormData();
                            formData.append('shopNum', shopInfo.num);
                            formData.append('notice', result.value);
                            const res = await axios.post(`${url}/regshopnotice`, formData
                            );
                            console.log(res);
                        } catch (error) {
                            console.error(error);
                            <Server500Err_Alert />
                        } finally {
                            setLoading(false);
                            window.location.reload();
                        }
                        console.log('입력한값:', result.value);
                    }
                    break;

                case 'worktime':
                    result = await Swal.fire({
                        title: '<span class="sweet-modal-title">영업시간</span>',
                        input: 'text', // 일반 텍스트 입력
                        html: '<span class="sweet-modal-title">영업시간을 입력하세요</span>',
                        inputPlaceholder: '예: 월-금 9시 - 6시',
                        confirmButtonColor: '#F9950F',
                        confirmButtonText: '등록',
                        showCancelButton: true,
                        cancelButtonText: '취소',
                        reverseButtons: true,
                    });


                    if (result.isConfirmed && result.value) {
                        setLoading(true);
                        try {
                            const formData = new FormData();
                            formData.append('shopNum', shopInfo.num);
                            formData.append('worktime', result.value);
                            const res = await axios.post(`${url}/regshopworktime`, formData);
                            console.log(res);
                        } catch (error) {
                            console.error(error);
                            <Server500Err_Alert />
                        } finally {
                            setLoading(false);
                            window.location.reload();
                        }
                        console.log('입력한값:', result.value);
                    }

                    break;

                case 'shopinfo':
                    result = await Swal.fire({
                        title: '<span class="sweet-modal-title">매장정보</span>',
                        input: 'textarea', // 텍스트 영역 입력
                        html: '<span class="sweet-modal-title">매장에 대한 간단한 소개를 적어주세요.</span>',
                        inputPlaceholder: '스트레스 받지않게 최선을 다하겠습니다!',
                        confirmButtonColor: '#F9950F',
                        confirmButtonText: '등록',
                        showCancelButton: true,
                        cancelButtonText: '취소',
                        reverseButtons: true,
                    });
                    if (result.isConfirmed && result.value) {
                        setLoading(true);
                        try {
                            const formData = new FormData();
                            formData.append('shopNum', shopInfo.num);
                            formData.append('info', result.value);
                            const res = await axios.post(`${url}/regshopinfo`, formData
                            );
                            console.log(res);
                        } catch (error) {
                            console.error(error);
                            <Server500Err_Alert />
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

                <>

                    {shopInfo.id === user.id &&
                        <>
                            <ImageUploading multiple value={images} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
                                {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps, }) => (

                                    <div className="upload__image-wrapper">

                                        <div className="shop-title-text sm-text magin-t-1"> 매장 사진 올리기 <i className="fas fa-photo-video btn-icon"></i></div>
                                        <div className="shop-title-text sm-text magin-t-1 tx-gray f-size-14px"> 높이 260px 이상의 사진은 깨질수있습니다!</div>

                                        <div className="shop-form-container">
                                            <div className="input-img-click sm-input-img">

                                                <button className='info-input-btn' style={isDragging ? { color: 'red' } : undefined} onClick={onImageUpload} {...dragProps} >
                                                    매장사진 추가<i className="far fa-plus-square tx-white"></i>
                                                </button>
                                                <button className='info-input-btn' onClick={onImageRemoveAll}> 매장 사진 지우기
                                                </button>

                                            </div>
                                        </div>
                                        <div className="shop-form-container fl-di-column">
                                            {imageList.map((image, index) => (
                                                <div key={index} className="image-item img-re">
                                                    <img src={image['data_url']} alt="슬라이드에 들어갈 이미지" className='slide-input-img' />
                                                    <div className="image-item__btn-wrapper img-ab-1">
                                                        <button className='img-in-btn' onClick={() => onImageUpdate(index)}>수정</button>
                                                        <button className='img-in-btn' onClick={() => onImageRemove(index)}><i className="fas fa-times tx-white"></i></button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                )}
                            </ImageUploading>

                            <button className='info-input-btn' value='titleimg' onClick={handleBtnClick}>매장그림 올리기<i className="far fa-plus-square tx-white"></i>
                            </button>
                        </>
                    }
                    <div className="shop-title-text sm-text magin-t-1">공지사항 <i className="fas fa-check btn-icon"></i>
                        {shopInfo.id === user.id &&
                            <button className='info-input-btn' value='notice' onClick={handleBtnClick}>공지사항 입력 <i className="far fa-plus-square tx-white"></i></button>
                        }
                    </div>

                    <div className="shop-form-container">
                        <div className="input-img-click sm-input-img">{shopInfo.notice}</div>
                    </div>
                    <div className="shop-title-text sm-text">영업시간<i className="fas fa-clock btn-icon"></i>
                        {shopInfo.id === user.id &&
                            <button className='info-input-btn' value='worktime' onClick={handleBtnClick}>영업시간 입력 <i className="far fa-plus-square tx-white"></i></button>
                        }
                    </div>

                    <div className="shop-form-container">
                        <div className="input-img-click sm-input-img">
                            <span></span>{shopInfo.workTime}</div>
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
                        {shopInfo.id === user.id &&
                            <button className='info-input-btn' value='shopinfo' onClick={handleBtnClick}>매장정보 입력 <i className="far fa-plus-square tx-white"></i></button>
                        }
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
                                        <Link to={"/gallery/des/" + gallery.num}><img src={`${url}/desgalview/${gallery.num}`} alt="" className="hover-img" /></Link>
                                        <div className="img-comment-hover">
                                            <span className="img-hover-icon">
                                                <i className="fas fa-heart hover-icon" ></i>
                                                <span className='hover-text'>{gallery.likeCnt}</span>
                                            </span>
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




                </>

            }
        </>
    );
}

export default ShopMainHome;