import React, { useRef, useState, useEffect } from "react";
import { useDaumPostcodePopup } from 'react-daum-postcode';
import Swal from "sweetalert2";
import axios from "axios";
import useKakaoLoader from "../../Around/useKakaoLoader";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { url } from "../../../config";


function ShopModiForm() {
    const params = useParams();
    const selectShop = useSelector((state) => state.shop)
    const [address, setAddress] = useState();
    const imgBoxRef = useRef();
    const [files, setFiles] = useState([]);
    useKakaoLoader();
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [geocoder, setGeocoder] = useState(null);
    const user = useSelector((state) => state.user);
    const [sId, setSId] = useState('');
    const [backsId, setBackSId] = useState('');
    const navigate = useNavigate();
    const goBack = () => {
        navigate('/usermy/shopreg');
    }



    const dispatch = useDispatch();

    // DB에 들어가는 데이터
    const [shop, setShop] = useState({
        name: '',
        address_road: '',
        address_detail: ''
    });

    const change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setShop({ ...shop, [name]: value });
    }

    const fileChange = (e) => {
        if (e.target.files.length > 0) {
            setFiles([e.target.files[0]]);
            console.log(files);
        }

        const imageSrc = URL.createObjectURL(e.target.files[0]);
        imgBoxRef.current.src = imageSrc;
    }


    const onSubmit = (e) => {
        e.preventDefault();
        console.log("File : " + files);
        console.log("ShopNmae : " + shop.name);
        console.log("SId : " + sId);
        console.log("address : " + address);
        console.log("shop.address_detail : " + shop.address_detail);
        console.log("params.shopnum : " + params.shopnum);
        console.log("selectShop.lat : " + selectShop.lat);
        console.log("selectShop.lon : " + selectShop.lon);
        console.log("latitude : " + latitude);
        console.log("longitude : " + longitude);
        console.log("Files : " + files);

        if (!shop.name) {
            setShop({ ...shop, name: selectShop.name });
        }
        if (!shop.address_detail) {
            setShop({ ...shop, address_detail: selectShop.addressDetail });
        }
        if (!shop.address_road) {
            setShop({ ...shop, address_road: selectShop.addressRoad });
        }

        if (!files[0]) {
            setFiles([selectShop.profImg]);
        }
        if (!sId) {
            setSId(selectShop.sid);
        }
        if (!latitude) {
            setLatitude(selectShop.lat);
        }
        if (!longitude) {
            setLongitude(selectShop.lon);
        }
        // 샵을 등록하시겠습니까?
        Swal.fire({

            title: '<span class="sweet-modal-title">샵 정보 수정</span>',
            html: '<img src="/img/logo/modal_modi_logo.png"/><br/> <span class="sweet-modal-text">샵 정보 수정 하시겠습니까 ?</span>',

            showCancelButton: true,
            confirmButtonText: '등록',
            cancelButtonText: '취소',
            confirmButtonColor: '#F9950F',
        }).then((result) => {
            const formData = new FormData();
            for (let file of files) {
                formData.append("file", file);
            }
            formData.append("name", shop.name);
            formData.append("sId", sId);
            formData.append("address_road", address);
            formData.append("address_detail", shop.address_detail);
            if (latitude === undefined && longitude === undefined) {
                formData.append("latitude", selectShop.lat);
                formData.append("longitude", selectShop.lon);
            } else {
                formData.append("latitude", latitude);
                formData.append("longitude", longitude);
            }
            formData.append("shopnum", params.shopnum);


            if (result.isConfirmed === true) {
                console.log(formData.get("latitude"));
                console.log(formData.get("longitude"));
                axios.post(`${url}/shopmodi`, formData)
                    .then((res) => {
                        console.log(res);
                        console.log("res data : " + res.data);
                    });
                //    if (result.isConfirmed) {
                Swal.fire({
                    html: '<img src="/img/logo/modal_success_logo.png"/></span>',
                    title: '<span class="sweet-modal-title">샵 정보 수정이 완료되었습니다</span>',
                    confirmButtonColor: '#F9950F',
                    confirmButtonText: '확인'
                });
                window.location.href = '/catdog/usermy';
            }
            else if (result.isDenied === false) {
                Swal.fire('취소하였습니다.', '', 'info');

            }
        });
    }



    const formatNumber = (input) => {
        // 숫자만 추출
        const cleaned = ('' + input).replace(/\D/g, '');

        // 3자리-5자리-4자리 형식으로 포맷팅
        const formatted = cleaned.replace(/^(\d{3})(\d{0,2})(\d{0,5})/, (match, p1, p2, p3) => {
            let result = p1;
            if (p2) result += `-${p2}`;
            if (p3) result += `-${p3}`;
            return result;
        });
        setBackSId(formatted.substring(0, 14));
    };


    const idChange = (e) => {
        setSId(e.target.value.replace(/\D/g, ''));
        formatNumber(e.target.value);
    };

    const open = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';
        console.log(data);
        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
        setAddress(fullAddress);
        console.log("FullAddress1 : " + fullAddress);

        setShop({ ...shop, address_road: fullAddress });


        if (geocoder) {
            geocoder.addressSearch(fullAddress, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                    console.log("If In !!!")
                    const newLatitude = result[0].y;
                    const newLongitude = result[0].x;

                    setLatitude(newLatitude);
                    setLongitude(newLongitude);
                    setShop({ ...shop, address_detail: '' });
                } else {
                    console.error('Geocoding error');
                }
            });
        } else {
            console.error('Geocoder not initialized');
        }

    };

    const onDelete = (e) => {
        e.preventDefault();
        Swal.fire({
            title: '<span class="sweet-modal-title">샵 삭제</span>',
            html: '<img src="/img/logo/modal_delete_logo.png"/><br/> <span class="sweet-modal-text">샵을 삭제하시겠습니까 ?</span>',
            showCancelButton: true,
            confirmButtonText: '삭제',
            cancelButtonText: '취소',
            confirmButtonColor: '#F9950F',
        }).then((result) => {
            if (result.isConfirmed === true) {
                axios.get(`${url}/shopdelete?num=${params.shopnum}`)
                    .then((res) => {
                        console.log(res);
                        console.log("res data : " + res.data);
                    });
                //    if (result.isConfirmed) {
                Swal.fire({
                    html: '<img src="/img/logo/modal_success_logo.png"/></span>',
                    title: '<span class="sweet-modal-title">샵 삭제가 완료되었습니다</span>',
                    confirmButtonColor: '#F9950F',
                    confirmButtonText: '확인'
                });
                window.location.href = '/catdog/usermy';
            }
            else if (result.isDenied === false) {
                Swal.fire('취소하였습니다.', '', 'info');
            }
        });
    }





    useEffect(() => {

        axios.get(`${url}/shopinfobynum?num=${params.shopnum}`)

            .then((res) => {
                // console.log(res);
                dispatch({ type: 'SET_SHOP', payload: res.data });
            })
        setShop({
            name: selectShop.name,
            address_road: selectShop.addressRoad, address_detail: selectShop.addressDetail
        });
        setBackSId(selectShop.sid);
        setSId(selectShop.sid);
        setAddress(selectShop.addressRoad);

        // Geocoder 초기화 유무
        let isGeocoderInitialized = false;


        // 초기화가 한번에 되지 않아서 이런식으로 더러워 졌습니다..
        const initializeGeocoder = () => {  // Geocoder 초기화 하는 함수 이게 생성되어야 주소값으로 위도 경도 구해올 수 있다
            if (window.kakao && window.kakao.maps) {
                const newGeocoder = new window.kakao.maps.services.Geocoder();
                setGeocoder(newGeocoder);
                isGeocoderInitialized = true;
            }
        };

        const attemptInitialization = () => {
            initializeGeocoder();  // initializeGeocoder 함수 호출
        };

        const intervalId = setInterval(() => {
            if (isGeocoderInitialized) { // isGeocoderInitialized 가 true일 경우
                clearInterval(intervalId); // 
            } else {  // // isGeocoderInitialized 가 false일 경우
                attemptInitialization();  // attemptInitialization 함수 호출
            }
        }, 100); // Adjust the interval time as needed

        // 
        return () => clearInterval(intervalId);

    }, []);

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    return (
        <div className="web-container">
            {/* 앱 컨테이너 */}
            <div className="cd-container bg-white bg-dogs">

                {/* 메인 컨텐트 */}
                <main className="cd-main">

                    {/* 로고 */}
                    <section className="main-logo">
                        <img src="/img/logo/logo_color.png" alt="댕냥꽁냥 로고" />
                        <span className="main-logo-text">샵 정보 수정하기</span>
                    </section>

                    {/* 폼 */}
                    <section className="form-section">
                        <form action="#" method="post" className="form-css" onSubmit={onSubmit}>
                            <div className="form-container">
                                {/* 인풋 모여있는 컨테이너 */}
                                <div className="input-container">
                                    {/* 샵 사진 올리기 */}
                                    <div className="filebox">
                                        <img src={`${url}/shopimg/${selectShop.profImg}`} accept="image/*" alt='샵 기본이미지'
                                            className="input-img" placeholder='사진을 올려주세요' ref={imgBoxRef} />
                                        <label htmlFor="shopImgFile">샵 사진 올리기</label>
                                        <input type="file" id="shopImgFile" accept="image/*" onChange={fileChange} />
                                    </div>

                                    {/* 샵 이름 */}
                                    <div className='input-for-label'>
                                        <label htmlFor="name" className="label-text">샵 이름</label>

                                        <input type="text" id="name" name="name" placeholder="샵 이름"
                                            className="input-text"
                                            value={shop.name} onChange={change} required />
                                    </div>

                                    {/* 사업자 등록번호 */}
                                    <div className='input-for-label'>
                                        <label htmlFor="sId" className="label-text">사업자 등록번호</label>
                                        <input type="text" id="SId" name="sId" placeholder="사업자 등록번호"
                                            className="input-text" value={backsId} onChange={idChange} maxLength={12} required />
                                    </div>
                                    {/* 주소 검색 */}
                                    <div className='input-for-label'>
                                    <label htmlFor="address_detail" className="label-text">샵 주소</label>

                                    <div className="address-container">
                                        <div className="address-btn-container">

                                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="input-box-style input-text" required />

                                            <button className="address-btn" type='button' onClick={handleClick}>
                                                주소 검색
                                            </button>
                                        </div>
                                        <input type="text" name="address_detail" placeholder="상세주소를 적어주세요" value={shop.address_detail} className="input-box-style input-text" onChange={change} />
                                        <input type="hidden" id="latitude" name="lat" placeholder="위도"></input>
                                        <input type="hidden" id="longitude" name="lon" placeholder="경도"></input>
                                    </div>
                                    </div>



                                </div>

                                {/* submit 버튼 */}
                                <div className="magin-t-5">


                                    <button id="submit-btn" type="submit" className="main-btn btn-text magin-t-1" onClick={onSubmit}>수정하기</button>

                                    <div className="main-btn magin-t-1 btn-gray btn-text" onClick={goBack}>취소</div>

                                    <button id="submit-btn" type="submit" className="main-btn btn-text magin-t-1" onClick={onDelete}> 샵 삭제</button>
                                </div>

                            </div>
                        </form>
                    </section>

                </main>
            </div>

        </div>
    );
}


export default ShopModiForm;
