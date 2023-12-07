import { useRef, useState } from "react";
import Footer from "../../screens/Footer";
import { useDaumPostcodePopup } from 'react-daum-postcode';
import Swal from "sweetalert2";
import axios from "axios";

function ShopRegForm() {
    const imgBoxRef = useRef();
    const [files, setFiles] = useState([]);
    const [address, setAddress] = useState();

    // DB에 들어가는 데이터
    const [shop, setShop] = useState({
        name: '',
        address_road: '',
        address_detail: '',
        prof_img: '',
    });

    const change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setShop({ ...shop, [name]: value });
    }

    const fileChange = (e) => {
        if (e.target.files.length > 0) {
            setFiles([...files, e.target.files[0]]);
            console.log(files);
        }

        const imageSrc = URL.createObjectURL(e.target.files[0]);
        imgBoxRef.current.src = imageSrc;
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (!shop.name) {
            Swal.fire({ icon: 'error', title: 'Oops...', text: '샵 이름을 입력해주세요!' });
            return;
        }
        if (!shop.address_road) {
            Swal.fire({ icon: 'error', title: 'Oops...', text: '주소를 검색해주세요!' });
            return;
        }

        // 반려동물을 등록하시겠습니까?
        Swal.fire({
            icon: 'question',
            title: '반려동물을 등록하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '등록',
            cancelButtonText: '취소',
        }).then((result) => {
            if (result.isConfirmed) {
                const formData = new FormData();
                for (let file of files) {
                    formData.append("file", file);
                }
                formData.append("name", shop.name);
                formData.append("address_road", shop.address_road);

                axios.post('http://localhost:8090/petreg', formData)
                    .then((res) => {
                        console.log(res);
                        console.log(res.data);
                    });

                Swal.fire('등록완료!', '', 'success');
                window.location.href = '/catdog/usermy';
            } else if (result.isDenied) {
                Swal.fire('취소하였습니다.', '', 'info');
            }
        });
    }

    const open = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

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
        console.log(fullAddress);
    };

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

                                    {/* 주소 검색 */}
                                    <div className="address-container">

                                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="input-box-style address-input" required />
                                        <div className="address-btn-container">
                                            <input type="text" placeholder="상세주소를 적어주세요" className="input-box-style address-input" onChange={change} />
                                            <button className="address-btn" type='button' onClick={handleClick}>
                                                주소 검색
                                            </button>
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
