import { useRef, useState } from "react";
import Loding from "../tools/Loding";
import { useNavigate } from "react-router-dom";

function GalleryRegForm() {
    const [image, setImage] = useState(null);
    const imgBoxRef = useRef();
    const [loading, setLoading] = useState(false);
    
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
                            />
                    </div>

                    <div className="review-btns">
                        <button className="main-btn btn-text review-btn btn-gray" onClick={goBack}>취소</button>
                        <button className="main-btn btn-text review-btn">글 올리기</button>
                    </div>

                </section>
            </main>
        }

    </>);
}

export default GalleryRegForm;