import { useState } from "react";
import Footer from "../../screens/Footer";
import { useDaumPostcodePopup } from 'react-daum-postcode';

function ShopRegForm() {
    const [address, setAddress] = useState();
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

                {/* 메인 컨텐트  */}
                <main className="cd-main">

                    {/* 로고  */}
                    <section className="main-logo">
                        <img src="/img/logo/logo_color.png" alt="댕냥꽁냥 로고" />
                        <span className="main-logo-text">샵 등록하기</span>
                    </section>

                    {/* 폼  */}
                    <section className="form-section">
                        <form action="#" method="post" className="form-css">
                            <div className="form-container">
                                {/* 인풋 모여있는 컨테이너  */}
                                <div className="input-container">

                                    {/* 샵 이름  */}
                                    <input type="text" id="shopName" name="shopName" placeholder="샵 이름"
                                        className="input-text" />

                                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                                    
                                    <button className="main-btn btn-text" type='button' onClick={handleClick}>
                                        눌러서 주소창 띄우기
                                    </button>

                                    <input type="text" placeholder="상세주소를 적어주세요"/>

                                    {/* 샵 사진 올리기  */}
                                    <div className="filebox">
                                        <input type="shopImgFile" id="shopImgFileLink" accept="image/*"
                                            className="input-box-style" value="사진을 올려주세요" />
                                        <label for="shopImgFile">샵 사진 올리기</label>
                                        <input type="file" id="shopImgFile" accept="image/*" />
                                    </div>

                                    <hr className="gray-line" />

                                </div>

                                {/* submit 버튼  */}
                                <div className="magin-t-5">
                                    <button id="submit-btn" type="submit" className="main-btn btn-text magin-t-1">등록하기</button>
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