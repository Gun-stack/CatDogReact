import { useState, useRef } from "react";
import Footer from "../../screens/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Swal from "sweetalert2";
import axios from "axios";




function DesModi() {
    const imgBoxRef = useRef();
    const [files, setFiles] = useState([]);
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    function goBack(e) {
        e.preventDefault();
        navigate(-1);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("File info : " + files)
        if (!des.shopName) {
            Swal.fire({ icon: 'error', title: 'Oops...', text: '디자이너 이름을 입력해주세요!' });
            return;
        }

        // 디자이너 등록을 하시겠습니까?
        Swal.fire({
            icon: 'question',
            title: '디자이너 등록을 하시겠습니까?',
            showCancelButton: true,
            confirmButtonText: '등록',
            cancelButtonText: '취소',
        }).then((result) => {
            const formData = new FormData();
            for (let file of files) {
                formData.append("file", file);
                console.log(file);
            }

            formData.append("desNickname", des.shopName);
            formData.append("position", des.shopNumber);
            // formData.append("address_detail", shop.address_detail);
            // formData.append("latitude", latitude);
            // formData.append("longitude", longitude);
            formData.append("id", user.id);
            console.log("디자이너 이름 : " + des.shopName);
            console.log("직책 : " + des.shopNumber);



            axios.post('http://localhost:8090/desreg', formData)
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


    const [des, setDes] = useState({
        shopName: '',
        shopNumber: ''
    });

    const change = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setDes({ ...des, [name]: value });
    }

    const fileChange = (e) => {
        if (e.target.files.length > 0) {
            setFiles([e.target.files[0]]);
            console.log(files);
        }

        const imageSrc = URL.createObjectURL(e.target.files[0]);
        imgBoxRef.current.src = imageSrc;
    }

    return (<>
        <div className="web-container">

            <div className="cd-container bg-white bg-dogs">

                <main className="cd-main">

                    <section className="main-logo">
                        <span className="main-logo-text">디자이너 수정하기</span>
                    </section>

                    {/* <!-- 폼 --> */}
                    <section className="form-section">
                        <form action="#" method="post" className="form-css">
                            <div className="form-container">
                                <div className="input-container">

                                    {/* <!-- 디자이너 닉네임 : des_nickname --> */}
                                    <input type="text" id="shopName" name="shopName" placeholder="디자이너 이름" className="input-text"
                                        onChange={change} />

                                    {/* <!-- 디자이너 직책 : position --> */}
                                    <input type="text" id="shopNumber" name="shopNumber" placeholder="디자이너 직책" className="input-text"
                                        onChange={change} />

                                    {/* <!-- 프로필 사진 사진 올리기 --> */}
                                    <div className="filebox">
                                        <img src="/img/logo/shop_defult_img.png" accept="image/*"
                                            className="input-img" value="사진을 올려주세요" ref={imgBoxRef} />
                                        <label htmlFor="shopImgFile">프로필 사진 올리기</label>
                                        <input type="file" id="shopImgFile" accept="image/*" onChange={fileChange} />
                                    </div>
                                    <hr className="gray-line" />

                                </div>
                                {/* <!-- submit 버튼 --> */}
                                <div className="button-container">
                                    <button id="submit-btn" type="submit" className="main-btn btn-text magin-t-1" onClick={onSubmit}>등록하기</button>
                                    <div className="main-btn magin-t-1 btn-gray btn-text" onClick={goBack}>취소</div>
                                </div>

                            </div>
                        </form>
                    </section>

                </main>

            </div>
        </div>
    </>);

}

export default DesModi;