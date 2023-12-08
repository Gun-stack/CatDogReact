import { useState } from "react";
import Footer from "../../screens/Footer";
import { useNavigate } from "react-router-dom";



function DesReg() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    function goBack(e){
        e.preventDeafult();
        navigate(-1);
    }


    return (<>
        <div className="web-container">

            <div className="cd-container bg-white bg-dogs">

                <main className="cd-main">

                    <section className="main-logo">
                        <img src="/img/logo/logo_color.png" alt="댕냥꽁냥 로고" />
                        <span className="main-logo-text">디자이너 등록하기</span>
                    </section>

                    {/* <!-- 폼 --> */}
                    <section className="form-section">
                        <form action="#" method="post" className="form-css">
                            <div className="form-container">
                                <div className="input-container">

                                    {/* <!-- 샵 이름 --> */}
                                    <input type="text" id="shopName" name="shopName" placeholder="디자이너 이름"
                                        className="input-text" />

                                    <input type="text" id="shopNumber" name="shopNumber" placeholder="디자이너 직책"
                                        className="input-text" />

                                    {/* <!-- 프로필 사진 사진 올리기 --> */}
                                    <div className="filebox">
                                        <input type="shopImgFile" id="shopImgFileLink" accept="image/*"
                                            className="input-box-style" value="사진을 올려주세요" />
                                        <label for="shopImgFile">프로필 사진 올리기</label>
                                        <input type="file" id="shopImgFile" accept="image/*" />
                                    </div>
                                    <hr className="gray-line" />

                                </div>
                                {/* <!-- submit 버튼 --> */}
                                <div className="button-container">
                                    <button id="submit-btn" type="submit" className="main-btn btn-text magin-t-1">등록하기</button>
                                    <div className="main-btn magin-t-1 btn-gray btn-text" onClick={goBack}>취소</div>
                                </div>

                            </div>
                        </form>
                    </section>

                </main>

                <Footer />
            </div>
        </div>
    </>);
}

export default DesReg;