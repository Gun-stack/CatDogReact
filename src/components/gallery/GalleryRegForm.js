import { useRef, useState } from "react";
import Loding from "../tools/Loding";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import axios from "axios";
import { useSelector } from 'react-redux';


function GalleryRegForm() {
    const [image, setImage] = useState(null);
    const imgBoxRef = useRef();
    const [loading, setLoading] = useState(false);
    const userInfo = useSelector((state) => state.des);
    const [content, setContent] = useState('');

    const changeContent = (e) => {
        setContent(e.target.value);
    }

    
    let navigate = useNavigate();
    function goBack(e) {
        e.preventDefault();
        navigate(-1);
    }

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const onSubmit = (e) => {
        Swal.fire({
            title: '갤러리에 올리시겠습니까?',
            showCancelButton: true,
            confirmButtonText: `예`,
            cancelButtonText: `아니오`,
        }).then((result) => {
            const formData = new FormData();
            formData.append('file', image); // 이미지 파일을 formData에 추가
            formData.append('content', content); // 리뷰 내용 추가
            formData.append('desId', userInfo.id); // 미용사 아이디 추가
            try{
                const res = axios.post('http://localhost:8090/desgalleryreg',formData)
                if (res.data == true) {
                    Swal.fire({
                        title: '겔러리에 등록되었습니다.',
                        confirmButtonText: `확인`,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate(-1);
                        }
                    })
                }
            }catch(err){
                console.log(err);
            }
       }
    )}


    return (<>
        {loading ? <Loding /> :
            <main className="cd-main dis-center">
                <section className="review-write-form">
                    <div className="review-write-title"><i className="fas fa-paw review-icon"></i>갤러리 사진 올리기</div>
                    <hr className="divide-line" />

                    <div className="review-filebox">
                        <img src={image ? URL.createObjectURL(image) : "/img/logo/pet_defult_img.png"} accept="image/*" alt='펫 기본이미지'
                            className="input-box-style input-img-size" placeholder='사진을 올려주세요'  ref={imgBoxRef}/>

                        <label htmlFor="petImgFile">사진 올리기</label>
                        <input type="file" id="petImgFile" name='file' accept="image/*" onChange={handleImageChange} />
                    </div>

                    <div className="review-write-text">
                        <textarea
                            placeholder="갤러리 글을 입력해 주세요"
                            className="text-area-size"
                            onChange={changeContent}
                            />
                    </div>

                    <div className="review-btns">
                        <button className="main-btn btn-text review-btn btn-gray" onClick={goBack}>취소</button>
                        <button className="main-btn btn-text review-btn" onClick={onSubmit}>글 올리기</button>
                    </div>

                </section>
            </main>
        }

    </>);
}

export default GalleryRegForm;