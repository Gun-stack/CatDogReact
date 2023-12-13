import React, { useRef, useState, useEffect } from "react";
import { Helmet } from 'react-helmet';
import Footer from "../../screens/Footer";
import { useDaumPostcodePopup } from 'react-daum-postcode';
import Swal from "sweetalert2";
import axios from "axios";
import useKakaoLoader from "../../Around/useKakaoLoader";
import { useSelector } from 'react-redux';

function ShopRegForm() {
    const imgBoxRef = useRef();
    const [files, setFiles] = useState([]);
    const [address, setAddress] = useState();
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [geocoder, setGeocoder] = useState(null);
    useKakaoLoader();
    const user = useSelector((state) => state.user);
    const [sId, setSId] = useState('');
    const [backsId, setBackSId] = useState('');


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
            Swal.fire({ icon: 'error', title: 'Oops...', text: '샵 이름을 입력해주세요!' });
            return;
        }
        if (!shop.address_road) {
            Swal.fire({ icon: 'error', title: 'Oops...', text: '주소를 검색해주세요!' });
            return;
        }

        // 샵을 등록하시겠습니까?
        Swal.fire({
            icon: 'question',
            title: '샵을 등록하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '등록',
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



            axios.post('http://localhost:8090/shopreg', formData)
                .then((res) => {
                    console.log(res);
                    console.log(res.data);
                });
            if (result.isConfirmed) {
                Swal.fire('등록완료!', '', 'success');
                window.location.href = '/catdog/usermy';
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

    useEffect(() => {
        console.log("UseEffect!!");
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
                                {/* 인풋 모여있는 컨테이너 */}
                                <div className="input-container">

                                    {/* 샵 이름 */}
                                    <input type="text" id="name" name="name" placeholder="샵 이름"
                                        className="input-text" onChange={change} required />

                                    {/* 사업자 등록번호 */}
                                    <input type="text" id="SId" name="sId" placeholder="사업자 등록번호"
                                        className="input-text" value={backsId} onChange={idChange} maxLength={12} required />

                                    {/* 주소 검색 */}
                                    <div className="address-container">

                                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="input-box-style address-input" required />
                                        <div className="address-btn-container">
                                            <input type="text" name="address_detail" placeholder="상세주소를 적어주세요" className="input-box-style address-input" onChange={change} />
                                            <button className="address-btn" type='button' onClick={handleClick}>
                                                주소 검색
                                            </button>
                                            <input type="hidden" id="latitude" name="lat" placeholder="위도"></input>
                                            <input type="hidden" id="longitude" name="lon" placeholder="경도"></input>
                                        </div>
                                    </div>

                                    {/* 샵 사진 올리기 */}
                                    <div className="filebox">
                                        <img src="/img/logo/shop_defult_img.png" accept="image/*" alt='샵 기본이미지'
                                            className="input-img" placeholder='사진을 올려주세요' ref={imgBoxRef} />
                                        <label htmlFor="shopImgFile">샵 사진 올리기</label>
                                        <input type="file" id="shopImgFile" accept="image/*" onChange={fileChange} />
                                    </div>

                                    <hr className="gray-line" />

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
                <Footer />
            </div>

        </div>
    );
}

export default ShopRegForm;
