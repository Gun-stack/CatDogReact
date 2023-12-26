import React, { useRef, useState, useEffect } from "react";
import Footer from "../../screens/Footer";
import { useDaumPostcodePopup } from 'react-daum-postcode';
import Swal from "sweetalert2";
import SwalCustomAlert from "../../Alerts/SwalCustomAlert";

import axios from "axios";
import useKakaoLoader from "../../Around/useKakaoLoader";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import $ from 'jquery';
import { url } from "../../../config";


function ShopRegForm() {
    const imgBoxRef = useRef();
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [address, setAddress] = useState();
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [geocoder, setGeocoder] = useState(null);
    useKakaoLoader();
    const user = useSelector((state) => state.user);
    const [sId, setSId] = useState('');
    const [backsId, setBackSId] = useState('');
    const [authComplete, setAuthComplete] = useState(false); // 인증 완료 여부


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
        console.log(" latitude: " + latitude);
        console.log(" longitude: " + longitude);

        if (!shop.name) {
            Swal.fire({
                html: '<img src="/img/logo/modal_fail_logo.png"/></span>',
                title: '<span class="sweet-modal-title">샵 이름을 입력해주세요!</span>',
                confirmButtonColor: '#F9950F',
                confirmButtonText: '확인',
            });
            return;
        }
        if (!shop.address_road) {
            Swal.fire({
                html: '<img src="/img/logo/modal_fail_logo.png"/></span>',
                title: '<span class="sweet-modal-title">샵 주소를 입력해주세요!</span>',
                confirmButtonColor: '#F9950F',
                confirmButtonText: '확인',
            });
            return;
        }

        // 샵을 등록하시겠습니까?
        Swal.fire({
            html: '<img src="/img/logo/modal_notice_logo.png"/></span>',
            title: '<span class="sweet-modal-title">샵 등록을 하시겠습니까?</span>',
            confirmButtonColor: '#F9950F',
            confirmButtonText: '등록',
            showCancelButton: true,
            cancelButtonText: '취소',
        }).then((result) => {
            const formData = new FormData();
            for (let file of files) {
                formData.append("file", file);
            }

            console.log("address_detail : " + shop.address_detail);

            formData.append("name", shop.name);
            formData.append("sId", sId);
            formData.append("address_road", shop.address_road);
            formData.append("address_detail", shop.address_detail);
            formData.append("latitude", latitude);
            formData.append("longitude", longitude);

            formData.append("userId", user.id);



            axios.post(`${url}/shopreg`, formData)
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                });
            if (result.isConfirmed) {
                Swal.fire({
                    html: '<img src="/img/logo/modal_success_logo.png"/></span>',
                    title: '<span class="sweet-modal-title">샵 등록이 완료되었습니다</span>',
                    confirmButtonColor: '#F9950F',
                    confirmButtonText: '확인'
                });
                navigate('/usermy');
            } else if (result.isDenied) {
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
                } else {
                    console.error('Geocoding error');
                }
            });
        } else {
            console.error('Geocoder not initialized');
        }

    };


    const token = useSelector(state => state.token);
    useEffect(() => {
        console.log("UseEffect!!");

        // console.log("로그인 후 토큰 값 : " + token);
        axios.get(`${url}/user`, {
            headers: {
                Authorization: token,
            }
        })
            .then(res => {
                console.log("Res : " + res.data);
                if (res.data.roles === "ROLE_USER") {
                    SwalCustomAlert(
                        'warning',
                        "접근 권한이 없습니다. 디자이너 신청 해 주세요."
                    ).then(() => {
                        if (res) {
                            navigate('/usermy/desreg');
                            return;
                        }
                    })
                }
            })
            .catch(err => {
                // console.log("Err : " + err);
                SwalCustomAlert(
                    'warning',
                    "로그인 이후 사용 가능합니다."
                );
                navigate('/userlogin');
            })


        // Geocoder 초기화 유무
        let isGeocoderInitialized = false;


        // 초기화가 한번에 되지 않아서 이런식으로 더러워 졌습니다..
        const initializeGeocoder = () => {  // Geocoder 초기화 하는 함수 이게 생성되어야 주소값으로 위도 경도 구해올 수 있다
            if (window.kakao && window.kakao.maps) {
                console.log("Gecoder 초기화 전 !!");
                const newGeocoder = new window.kakao.maps.services.Geocoder();
                console.log('newGeocoder:', newGeocoder);
                console.log("Gecoder 초기화 후 !!");
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

    const callApi = async (value) => {
        console.log("Call API!!!");
        console.log("Value : " + value);
        if (value === "" || value === null) {
            SwalCustomAlert(
                'fail',
                '사업자 번호를 입력해 주세요',
            );
            return;
        }

        var data = {
            "b_no": [value + ""] // 사업자번호 "xxxxxxx" 로 조회 시,
        };

        try {
            const result = await $.ajax({
                url: "https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=43jTbFaB1Bw0bFtBXRHs2WW0Mk%2Bi71oEulvkm9CIAkn2wvwt88c1lJRBA8eYtIjHXXmVMWEEjI0ZPh%2BEMfCTUg%3D%3D",
                type: "POST",
                data: JSON.stringify(data),
                dataType: "JSON",
                contentType: "application/json",
                accept: "application/json",

            }).then((result) => {
                if (result.data[0].b_stt_cd === "01") {
                    SwalCustomAlert(
                        'success',
                        '인증에 성공하였습니다.',
                    );
                    setAuthComplete(true);
                } else if (result.data[0].b_stt_cd === "02") {
                    SwalCustomAlert(
                        'fail',
                        '휴업한 사업자 번호입니다.',
                    );
                } else if (result.data[0].b_stt_cd === "03") {
                    SwalCustomAlert(
                        'fail',
                        '폐업한 사업자 번호입니다.',
                    );
                } else {
                    SwalCustomAlert(
                        'fail',
                        '유효하지 않은 사업자 번호입니다.',
                    );
                }
            })

        } catch (error) {
            console.error(error);
        }

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
                        <span className="main-logo-text">샵 등록하기</span>
                    </section>

                    {/* 폼 */}
                    <section className="form-section">
                        <form action="#" method="post" className="form-css" onSubmit={onSubmit}>
                            <div className="form-container">
                                <div className="input-container">

                                    {/* 샵 사진 올리기 */}
                                    <div className="filebox">
                                        <img src="/img/logo/shop_defult_img.png" accept="image/*" alt='샵 기본이미지'
                                            className="input-img" placeholder='사진을 올려주세요' ref={imgBoxRef} />
                                        <label htmlFor="shopImgFile">샵 프로필 사진  올리기</label>
                                        <input type="file" id="shopImgFile" accept="image/*" onChange={fileChange} />
                                    </div>


                                        <div className='input-for-label'>
                                            <label htmlFor="name" className="label-text magin-t-05">샵 이름</label>
                                            <input type="text" id="name" name="name" placeholder="샵 이름을 입력해주세요"
                                                className="input-text" onChange={change} required />
                                        </div>


                                        {/* 사업자 등록번호 */}
                                        <div className='input-for-label'>
                                            <label htmlFor="sId" className="label-text magin-t-05">사업자 등록번호</label>
                                            <div className="address-container">
                                                <div className="address-btn-container">
                                                    <input type="text" id="SId" name="sId" placeholder="사업자 등록번호를 정확하게 입력 해주세요"
                                                        className="input-text" value={backsId} onChange={idChange} maxLength={12} required
                                                        readOnly={authComplete} />
                                                    <button className="address-btn" type='button' onClick={() => callApi(sId)}>
                                                        사업자 조회
                                                    </button>
                                                </div>
                                            </div>



                                        {/* 주소 검색 */}
                                        <div className='input-for-label'>
                                            <label htmlFor="address_detail" className="label-text magin-t-05">주소</label>
                                            <div className="address-container">
                                                <div className="address-btn-container">
                                                    <input type="text" value={address} placeholder="주소검색 버튼을 눌러주세요" onChange={(e) => setAddress(e.target.value)} className="input-text" required />

                                                    <button className="address-btn" type='button' onClick={handleClick}>
                                                        주소 검색
                                                    </button>
                                                </div>
                                                <input type="text" name="address_detail" placeholder="상세주소를 적어주세요" className="input-box-style input-text" onChange={change} />
                                                <input type="hidden" id="latitude" name="lat" placeholder="위도"></input>
                                                <input type="hidden" id="longitude" name="lon" placeholder="경도"></input>
                                            </div>
                                        </div>


                                    </div>
                                </div>

                                {/* submit 버튼 */}
                                <div className="magin-t-5">
                                    <button id="submit-btn" type="submit" className="main-btn btn-text magin-t-1" onClick={onSubmit}>등록하기</button>
                                    <div className="main-btn magin-t-1 btn-gray btn-text">취소</div>
                                </div>
                            </div>
                        </form>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default ShopRegForm;
